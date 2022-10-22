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
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import { Alert } from "react-native";

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
    }
  } catch (error) {
    console.log(error);
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
      t.update(actRef, {
        num_participantes: increment(-1),
        participantes: arrayRemove(userID),
      });
      t.update(participantRef, {
        actividades: arrayRemove(activityID),
      });
    });
  } catch (e) {
    console.log(e);
  }
}

// Guarda una actividad en la base de datos
export async function saveActivity(activity) {
  try {
    const docRef = doc(db, "actividades", activity.titulo);
    await setDoc(docRef, activity);
    console.log("Actividad guardada");
    Alert.alert("Nueva oferta de actividad creada");
  } catch (error) {
    console.error("Error al guardar la actividad", error);
  }
}

//#endregion
