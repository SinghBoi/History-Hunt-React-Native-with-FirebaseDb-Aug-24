import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEDyzpgNt0mGvRjr2EQaNuoxxk9duP2mw",
  authDomain: "history-hunt-project.firebaseapp.com",
  databaseURL: "https://history-hunt-project-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "history-hunt-project",
  storageBucket: "history-hunt-project.appspot.com",
  messagingSenderId: "476158827684",
  appId: "1:476158827684:web:b6eb2986ad38e188c25a31",
  measurementId: "G-STWNEMBCG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
