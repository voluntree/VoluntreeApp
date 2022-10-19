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
  setDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";
import * as ImagePicker from "expo-image-picker";

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
      return docSnap.data()
    } else {
      console.log("Document does not exist");
    }
  } catch (error) {
    console.log(error);
  }
}

// Guarda una actividad en la base de datos
export async function saveActivity(activity) {
  try {
    const docRef = doc(db, "actividades", activity.titulo);
    await setDoc(docRef, activity);
    storeImage(activity.imagen);
    console.log('Actividad guardada');
  } catch (error) {
    console.error('Error al guardar la actividad', error);
  }
}

//#endregion

export async function pickImage() {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Photo, 
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
    });
    if (!result.cancelled) {
      return result;
    }
  }
  catch (error) {
    console.log(error);
  }
}

async function storeImage(uri) {
}