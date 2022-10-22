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
  if (await getActivityByTitle(activity.titulo) == 0) {
    try {
      const docRef = doc(db, "actividades", activity.titulo);
      await setDoc(docRef, activity);
      console.log('Actividad guardada correctamente');
      Alert.alert('Éxito', 'La oferta de actividad se ha creado correctamente');
    } catch (error) {
      Alert.alert("Error", 'Ha ocurrido un error al guardar la actividad. Inténtelo de nuevo más tarde.');
      console.error('Error al guardar la actividad', error);
    }
  } else {
    Alert.alert("Error", 'Ya existe una actividad con ese título.');
  }
}

//#endregion
