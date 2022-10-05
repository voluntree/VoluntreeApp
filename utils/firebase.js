import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyC7PFdISQmK8pmiqhCTrn_-VCYYNuHtET8",
  authDomain: "voluntree-ba18c.firebaseapp.com",
  databaseURL: "https://voluntree-ba18c-default-rtdb.firebaseio.com",
  projectId: "voluntree-ba18c",
  storageBucket: "voluntree-ba18c.appspot.com",
  messagingSenderId: "609827239947",
  appId: "1:609827239947:web:30bc25bd51583d701f6f0e",
  measurementId: "G-9GEJ31G9R8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;
