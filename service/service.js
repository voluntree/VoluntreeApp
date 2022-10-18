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

export async function getActivityById(id) {
  try {
    const docRef = doc(db, "actividades", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
}
