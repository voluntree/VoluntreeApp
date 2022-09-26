import { firebase } from "@react-native-firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALDD33NJxV-MqRzoYau5nZMOoz6GFwvzo",
  authDomain: "voluntree-503c8.firebaseapp.com",
  projectId: "voluntree-503c8",
  storageBucket: "voluntree-503c8.appspot.com",
  messagingSenderId: "514763455345",
  appId: "1:514763455345:web:962f883366f4672c2e94d0",
  measurementId: "G-YWG788N2PT",
};

const app = initializeApp(firebaseConfig);
const db = firebase.firestore()
//const analytics = getAnalytics(app);

export default {
    app,
    db,
}