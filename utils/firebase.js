// Import the functions you need from the SDKs you need
import { firebase } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCtcIyLmDS6DNqN129FWGm1n7dRJc6rAmc",
  authDomain: "voluntreepin.firebaseapp.com",
  projectId: "voluntreepin",
  storageBucket: "voluntreepin.appspot.com",
  messagingSenderId: "703871649919",
  appId: "1:703871649919:web:4c6e1656614d08f25a174a",
  measurementId: "G-Q7KQY4E2Y8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();
const provider = new GoogleAuthProvider();

export {firebase, app, db, auth, storage, provider, ref, uploadBytes};

