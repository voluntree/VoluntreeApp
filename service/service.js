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

export async function inscribirUsuarioEnActividad(activity, userID) {
  activityID = activity.titulo;
  try {
    if (activity.num_participantes + 1 <= activity.max_participantes) {
      const participantsActivityRef = doc(
        db,
        `voluntarios/${userID}/actividades`,
        activityID
      );
      const activityParticipantsRef = doc(
        db,
        `actividades/${activityID}/participantes`,
        userID
      );
      const actRef = doc(db, "actividades", activityID);
      const participantRef = doc(db, "voluntarios", userID);
      let data1 = { actividad: actRef.path };
      let data2 = { participante: participantRef.path };

      await setDoc(participantsActivityRef, data1);
      await setDoc(activityParticipantsRef, data2);
      await updateDoc(doc(db, "actividades", activityID), {
        "num_participantes": increment(1),
      });
    } else throw Error("Ya no quedan plazas para esta actividad.")
  } catch (error) {
    console.log(error);
  }
}

export async function desapuntarseDeActividad(activityID, userID) {
  try {
    await deleteDoc(
      doc(db, `actividades/${activityID}/participantes/${userID}`)
    );
    await deleteDoc(doc(db, `voluntarios/${userID}/actividades/${activityID}`));
    await updateDoc(doc(db, "actividades", activityID), {
      "num_participantes": increment(-1),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function estaInscrito(userID, activityID){
  const actRef = doc(db, `voluntarios/${userID}/actividades/${activityID}`)
  const act = await getDoc(actRef)
  if (act.exists ) return true;
  else return false;
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