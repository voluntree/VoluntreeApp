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
import { connectStorageEmulator } from "firebase/storage";

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

// No usar, tengo que arreglarlo
export async function getActivityByTitle(title) {
  const actRef = query(actividadesRef, where("titulo", "==", title));
  const actSnap = await getDocs(actRef);
  const act = actSnap.docs.map((doc) => doc.data());
  // console.log(act.length);
  return act.length;
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

export async function createActivity(activity) {
  if ((await getActivityByTitle(activity.titulo)) == 0) {
    try {
      const docRef = doc(db, "actividades", activity.titulo);
      await setDoc(docRef, activity);
      console.log("Actividad guardada correctamente");
      Alert.alert("Éxito", "La oferta de actividad se ha creado correctamente");
    } catch (error) {
      Alert.alert(
        "Error",
        "Ha ocurrido un error al guardar la actividad. Inténtelo de nuevo más tarde."
      );
      console.error("Error al guardar la actividad", error);
    }
  } else {
    Alert.alert("Error", "Ya existe una actividad con ese título.");
  }
}

export async function updateActivity(activity) {
  try {
    const docRef = doc(db, "actividades", activity.titulo);
    await updateDoc(docRef, activity);
    console.log("Actividad actualizada correctamente");
    Alert.alert("Éxito", "La oferta de actividad se ha actualizado correctamente");
  } catch (error) {
    Alert.alert('Error', 'Ha ocurrido un error al actualizar la actividad. Inténtelo de nuevo más tarde.')
    console.error("Error al actualizar la actividad", error);
  }
}

export async function getAsociacionByID(id){
  try{
    const docRef = doc(db, "asociaciones", id)
    const asoc = await getDoc(docRef);
    if(asoc.exists()) {
      return asoc.data();
    }
    else{Alert.alert(
      "Error",
      "El perfil de esta asociacion no se encuentra disponible."
    )}

  }catch (erro) {
    Alert.alert("Error", "El perfil de esta asociacion no se encuentra disponible.")
  }
}

//#endregion
