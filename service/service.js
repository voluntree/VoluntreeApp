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
} from "firebase/firestore";

const actividadesRef = collection(db, "actividades");
const voluntarioRef = collection(db, "voluntarios");

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
  try {
    const participantsActivityRef = doc(
      db,
      `voluntarios/${userID}/actividades`,
      actividad.titulo
    );
    const activityParticipantsRef = doc(
      db,
      `actividades/${activityID}/participantes`,
      "Catalin"
    );
    const actRef = doc(db, "actividades", activityID);
    const participantRef = doc(db, "voluntarios", userID);
    let data1 = { actividad: actRef.path };
    let data2 = { participante: participantRef.path };
    
    setDoc(participantsActivityRef, data1);
    setDoc(activityParticipantsRef, data2);

  } catch (error) {
    console.log(e);
  }
}
