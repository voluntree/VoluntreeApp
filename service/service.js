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

const actividadesRef = collection(db, "actividades");
const voluntarioRef = collection(db, "voluntarios");

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
