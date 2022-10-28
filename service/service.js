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
import { Alert } from "react-native";
import { getDownloadURL, ref, connectStorageEmulator } from "firebase/storage";

const actividadesRef = collection(db, "actividades");
const voluntarioRef = collection(db, "voluntarios");

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

export function createActivity(activity) {
  getActivityByTitle(activity.titulo).then(async (result) => {
    if (result == null) {
      try {
        const docRef = doc(db, "actividades", activity.titulo);
        await setDoc(docRef, activity);
        Alert.alert(
          "Éxito",
          "La oferta de actividad se ha creado correctamente"
        );
      } catch (e) {
        console.log(e);
        Alert.alert(
          "Error",
          "Ha ocurrido un error al crear la actividad. Por favor, inténtelo de nuevo más tarde."
        );
      }
    } else {
      Alert.alert("Error", "Ya existe una actividad con ese título");
    }
  });
}

export async function updateActivity(activity) {
  try {
    const docRef = doc(db, "actividades", activity.titulo);
    await updateDoc(docRef, activity);
    console.log("Actividad actualizada correctamente");
    Alert.alert(
      "Éxito",
      "La oferta de actividad se ha actualizado correctamente"
    );
  } catch (error) {
    Alert.alert(
      "Error",
      "Ha ocurrido un error al actualizar la actividad. Inténtelo de nuevo más tarde."
    );
    console.error("Error al actualizar la actividad", error);
  }
}

//#endregion

//#region Asociacion

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


export async function getFotoPerfilAsociacion(nombre){
  try{
    const fotoPerfil = ref(
      storage,
      `gs://voluntreepin.appspot.com/${nombre}/perfil/logo.jpg`
    );
    getDownloadURL(fotoPerfil).then((path) => {console.log(path)
      return path})
  }catch(error){Alert.alert("Error", "El perfil de esta asociacion no se encuentra disponible.")}
}
export async function getFotoBGAsociacion(nombre) {
  try {
    const fotoPerfil = ref(
      storage,
      `gs://voluntreepin.appspot.com/${nombre}/perfil/backgroundPerfil.jpg`
    );
    getDownloadURL(fotoPerfil).then((path) => {
      console.log(path)
      return path;
    });
  } catch (error) {
    Alert.alert(
      "Error",
      "El perfil de esta asociacion no se encuentra disponible."
    );
    
  }
}

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

export async function followAsociation(user, asociationName) {
  const asociationRef = doc(db, "asociaciones", asociationName);
  try {
    await runTransaction(db, async (t) => {
      t.update(asociationRef, {
        seguidores: arrayUnion(user.nombre + " " + user.apellidos),
        num_seguidores: increment(1),
      });
    });
    console.log(
      "El usuario " +
        user.nombre +
        " " +
        user.apellidos +
        " ha seguido a la asociación " +
        asociationName
    );
  } catch (e) {
    console.log(e);
  }
}

//endregion

//region Articulos

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

//endregion

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
