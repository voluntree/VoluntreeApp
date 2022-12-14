import { db, storage } from "../utils/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  firestore,
  deleteDoc,
  setDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  runTransaction,
  addDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { deleteUser } from "firebase/auth";
import { Alert } from "react-native";
import { getDownloadURL, ref, connectStorageEmulator } from "firebase/storage";
import { stringToHash } from "./functions";

const actividadesRef = collection(db, "actividades");
const voluntarioRef = collection(db, "voluntarios");
const asociacionesRef = collection(db, "asociaciones");

//#region Actividades
export async function getAllActivities() {
  const activities = [];
  try {
    const actvs = await getDocs(actividadesRef);
    actvs.forEach((act) => {
      activities.push(act.data());
    });
  } catch (e) {
    console.log(e);
  } finally {
    return activities;
  }
}

export async function getActivityById(id) {
  try {
    const docRef = doc(db, "actividades", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getActivityByTitle(title) {
  const q = query(actividadesRef, where("titulo", "==", title));
  const docSnap = await getDocs(q);
  if (docSnap.empty) {
    console.log("No matching documents.");
    return null;
  } else {
    return docSnap.docs[0].data();
  }
}

export async function inscribirUsuarioEnActividad(activityID, userID) {
  const actRef = doc(db, "actividades", activityID);
  const participantRef = doc(db, "voluntarios", userID);
  try {
    await runTransaction(db, async (t) => {
      const activity = (await t.get(actRef)).data();
      if (activity.num_participantes + 1 <= activity.max_participantes) {
        t.update(actRef, {
          num_participantes: increment(1),
          participantes: arrayUnion(userID),
        });
        t.update(participantRef, {
          actividades: arrayUnion(activityID),
        });
      } else throw Error("Ya no quedan plazas para esta actividad.");
    });
  } catch (e) {
    console.log(e);
  }
}

export async function desapuntarseDeActividad(activityID, userID) {
  const actRef = doc(db, "actividades", activityID);
  const participantRef = doc(db, "voluntarios", userID);
  try {
    await runTransaction(db, async (t) => {
      const act = (await t.get(actRef)).data();
      if (act.num_participantes > 0 && act.participantes.includes(userID)) {
        t.update(actRef, {
          num_participantes: increment(-1),
          participantes: arrayRemove(userID),
          confirmados: arrayRemove(userID),
        });
        t.update(participantRef, {
          actividades: arrayRemove(activityID),
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
}

export async function deleteActivity(activityID) {
  try {
    const actRef = doc(db, "actividades", activityID);
    let actDoc = await getDoc(actRef);
    if (actDoc.exists()) {
      await runTransaction(db, async (t) => {
        const activity = actDoc.data();
        if (activity.participantes.length > 0)
          await activity.participantes.forEach(async (participante) => {
            t.update(doc(db, "voluntarios", participante), {
              actividades: arrayRemove(activityID),
            });
          });
        t.delete(actRef);
      });
    } else {
      Error("Actividad ya eliminada");
    }
  } catch (error) {}
}

export async function createActivity(activity) {
  getActivityByTitle(activity.titulo).then(async (result) => {
    if (result == null) {
      try {
        const docRef = doc(db, "actividades", activity.titulo);
        await setDoc(docRef, activity);
        /*Alert.alert(
          "??xito",
          "La oferta de actividad se ha creado correctamente"
        );*/
      } catch (e) {
        console.log(e);
        /*Alert.alert(
          "Error",
          "Ha ocurrido un error al crear la actividad. Por favor, int??ntelo de nuevo m??s tarde."
        );*/
      }
    } else {
      //Alert.alert("Error", "Ya existe una actividad con ese t??tulo");
    }
  });
}

export async function updateActivity(activity) {
  try {
    const docRef = doc(db, "actividades", activity.titulo);
    await updateDoc(docRef, activity);
  } catch (error) {
    console.error("Error al actualizar la actividad", error);
  }
}

//#endregion

//#region Asociacion

export async function deleteAssocData(asociacion) {
  try {
    const ref = doc(db, "asociaciones", asociacion.nombre);
    await deleteDoc(ref);
    console.log("La asociacion " + asociacion.nombre + " ha sido eliminado");
  } catch (e) {
    console.error(e);
  }
}

export async function updateAssocProfile(newProfile, userID) {
  try {
    const userRef = doc(db, "asociaciones", userID);
    await updateDoc(userRef, newProfile);
  } catch (e) {
    console.error(e);
  }
}

export async function getAsociationByID(id) {
  try {
    const docRef = doc(db, "asociaciones", id);
    const asoc = await getDoc(docRef);
    if (asoc.exists()) {
      return asoc.data();
    } else {
      Alert.alert(
        "Error",
        "El perfil de esta asociacion no se encuentra disponible."
      );
    }
  } catch (e) {
    Alert.alert(
      "Error",
      "El perfil de esta asociacion no se encuentra disponible."
    );
  }
}

export async function getAssocDocSnap(assocName) {
  const q = query(asociacionesRef, where("nombre", "==", assocName));
  const docSnap = await getDocs(q);
  if (docSnap.empty) {
    return null;
  } else {
    return docSnap.docs[0];
  }
}

export async function getAssociationByName(assocName) {
  const docSnap = await getAssocDocSnap(assocName);
  if (docSnap == null) {
    return null;
  } else {
    return docSnap.data();
  }
}

export async function getAssocID(assocName) {
  const docSnap = await getAssocDocSnap(assocName);
  if (docSnap == null) {
    return null;
  } else {
    return docSnap.id;
  }
}

export async function getAsociacionByEmail(email) {
  const collecRef = collection(db, "asociaciones");
  let asoc = await getDocs(query(collecRef, where("correo", "==", email)));
  asoc.docs.length > 0 ? (asoc = asoc.docs[0].data()) : (asoc = null);
  return asoc;
}

// export async function getFotoPerfilAsociacion(nombre) {
//   try {
//     const fotoPerfil = ref(
//       storage,
//       `gs://voluntreepin.appspot.com/${nombre}/perfil/logo.jpg`
//     );
//     await getDownloadURL(fotoPerfil)
//       .then((path) => {
//         return path;
//       })
//       .catch((error) => console.log(error));
//   } catch (error) {
//     Alert.alert(
//       "Error",
//       "El perfil de esta asociacion no se encuentra disponible."
//     );
//   }
// }
// export async function getFotoBGAsociacion(nombre) {
//   try {
//     const fotoPerfil = ref(
//       storage,
//       `gs://voluntreepin.appspot.com/${nombre}/perfil/backgroundPerfil.jpg`
//     );
//     await getDownloadURL(fotoPerfil)
//       .then((path) => {
//         return path;
//       })
//       .catch((error) => console.log(error));
//   } catch (error) {
//     Alert.alert(
//       "Error",
//       "El perfil de esta asociacion no se encuentra disponible."
//     );
//   }
// }

export async function addLike(activityID, userID) {
  const actRef = doc(db, "actividades", activityID);
  try {
    updateDoc(actRef, {
      favoritos: arrayUnion(userID),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function removeLike(activityID, userID) {
  const actRef = doc(db, "actividades", activityID);
  try {
    updateDoc(actRef, {
      favoritos: arrayRemove(userID),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function followAsociation(userID, association) {
  const associationID = await getAssocID(association);
  const asociationRef = doc(db, "asociaciones", associationID);
  const userRef = doc(db, "voluntarios", userID);
  try {
    await runTransaction(db, async (t) => {
      t.update(asociationRef, {
        seguidores: arrayUnion(userID),
        num_seguidores: increment(1),
      });
      t.update(userRef, {
        siguiendo: arrayUnion(associationID),
      });
    });
  } catch (e) {
    console.log(e);
  }
}

export async function unfollowAsociation(userID, association) {
  const associationID = await getAssocID(association);
  const asociationRef = doc(db, "asociaciones", associationID);
  const userRef = doc(db, "voluntarios", userID);
  try {
    await runTransaction(db, async (t) => {
      t.update(asociationRef, {
        seguidores: arrayRemove(userID),
        num_seguidores: increment(-1),
      });
      t.update(userRef, {
        siguiendo: arrayRemove(associationID),
      });
    });
  } catch (e) {
    console.log(e);
  }
}

//#endregion

//#region Articulos

export async function getArticuloById(articuloID) {
  try {
    const docRef = doc(db, "articulos", articuloID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("Document does not exist");
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllArticulos() {
  const articulos = [];
  try {
    const artcs = await getDocs(collection(db, "articulos"));
    artcs.forEach((artc) => {
      articulos.push(artc.data());
    });
  } catch (e) {
    console.log(e);
  } finally {
    return articulos;
  }
}

export async function publishArticle(articulo) {
  const ref = doc(db, "articulos", articulo.titulo);
  let existeArticulo = (await getDoc(ref)).exists();
  if (existeArticulo) {
    throw Error("Ya existe un articulo con este titulo");
  } else {
    setDoc(ref, articulo);
  }
}

export async function deleteArticle(articulo) {
  const ref = doc(db, "articulos", articulo.titulo);
  try {
    await runTransaction(db, async (t) => {
      t.delete(ref, articulo);
    });
  } catch (error) {
    throw Error("Borrado fallido.");
  }
}

export async function updateArticle(articulo, articuloViejo) {
  const ref = doc(db, "articulos", articuloViejo.titulo);
  try {
    await runTransaction(db, async (t) => {
        t.delete(ref); 
        t.set(doc(db, "articulos", articulo.titulo), articulo);      
    });
  } catch (error) {
    throw Error("Modificaci??n fallida.");
  }
}

//#endregion

//#region Voluntarios

export async function getVoluntarioByID(id) {
  try {
    const docRef = doc(db, "voluntarios", id);
    const vol = await getDoc(docRef);
    if (vol.exists()) {
      return vol.data();
    } else {
      
      return null;
    }
  } catch (e) {
  }
}

export async function getAssocByEmail(email) {
  const q = query(asociacionesRef, where("correo", "==", email));
  const docSnap = await getDocs(q);
  if (docSnap.empty) {
    return null;
  } else {
    return docSnap.docs[0];
  }
}

export async function getPoints(user, activity) {
  const userRef = doc(db, "voluntarios", user);
  const activityRef = doc(db, "actividades", activity.titulo);
  try {
    await runTransaction(db, async (t) => {
      t.update(userRef, {
        puntos: increment(activity.puntos),
      });
      t.update(activityRef, {
        reclamados: arrayUnion(user.nombre),
      });
    });
    console.log(
      "El usuario " +
        user.nombre +
        " ha reclamado " +
        activity.puntos +
        " puntos"
    );
  } catch (e) {
    console.log(e);
  }
}

export async function confirmAssistence(userID, activityID) {
  const actRef = doc(db, "actividades", activityID);
  try {
    await runTransaction(db, async (t) => {
      t.update(actRef, {
        confirmados: arrayUnion(userID),
      });
    });
  } catch (error) {
    console.log(e);
  }
}

export async function unconfirmAssistence(userID, activityID) {
  const actRef = doc(db, "actividades", activityID);
  try {
    await runTransaction(db, async (t) => {
      t.update(actRef, {
        confirmados: arrayRemove(userID),
      });
    });
  } catch (error) {
    console.log(e);
  }
}

export async function confirmAssistenceViaQR(userID, activityID, QRvalue) {
  const actRef = doc(db, "actividades", activityID);
  if (QRvalue == stringToHash(activityID)) {
    confirmAssistence(userID, activityID);
  } else throw Error("Codigo QR incorrecto, escanee de nuevo.");
}

export async function confirmAssistenceViaCode(userID, activityID, codeValue) {
  const actRef = doc(db, "actividades", activityID);
  if (codeValue == stringToHash(activityID)) {
    confirmAssistence(userID, activityID);
  } else
    throw Error(
      "C??digo incorrecto, compruebe que ha introducido el c??digo correctamente"
    );
}

export async function updateProfile(user, userID) {
  try {
    const userRef = doc(db, "voluntarios", userID);
    await updateDoc(userRef, user);
  } catch (e) {
    console.error(e);
  }
}

export async function deleteUserData(userID) {
  try {
    const userRef = doc(db, "voluntarios", userID);
    await deleteDoc(userRef);
    console.log("El usuario con id" + userID + " ha sido eliminado");
  } catch (e) {
    console.error(e);
  }
}

//#endregion

//#region chat
export async function getUsersChatsList(user) {
  const acts = await getDocs(
    query(
      collection(db, "actividades"),
      where("participantes", "array-contains", user)
    )
  );
  const data = [];
  acts.forEach((doc) => data.push(doc.data()));
  return data;
}
export async function sendUserMessage(user, messageContent, fecha, activity) {
  const ref = doc(db, `chats/${activity}/messages/${fecha}`);
  try {
    await runTransaction(db, async (t) => {
      t.set(ref, { user: { ...user }, message: messageContent, date: fecha });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function retrieveChatLastMessage(activity) {
  const ref = collection(db, `chats/${activity}/messages`);
  let resp = [];
  try {
    const data = await getDocs(ref);
    data.forEach((doc) => resp.push(doc.data()));
    return resp[resp.length - 1];
  } catch (error) {}
  return resp;
}
//#endregion

//#region Tienda

export async function redeemPoints(user, productID) {
  const userRef = doc(db, "voluntarios", user);
  const productRef = doc(db, "productos", productID);
  try {
    if (user.puntos >= productID.puntos) {
      await runTransaction(db, async (t) => {
        t.update(userRef, {
          puntos: increment(-productID.precio),
        });
        // t.update(productRef, {
        //   stock: increment(-1),
        // });
      });
      console.log(
        "El usuario " +
          user.nombre +
          " ha canjeado " +
          productID.puntos +
          " puntos por el producto " +
          productID.nombre
      );
    } else {
      console.log(
        "El usuario " +
          user.nombre +
          " no tiene suficientes puntos para canjear el producto " +
          productID.nombre
      );
    }
  } catch (e) {
    console.log(e);
  }
}

//#endregion

//miscelanea
export async function getImageDownloadURL(url) {
  let resp = null;
  try {
    const reference = ref(storage, `${url}`);
    await getDownloadURL(reference).then((path) => {
      resp = path;
    });
  } catch (error) {
    console.log(error);
  } finally {
    return resp;
  }
}
