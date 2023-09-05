import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  // old project - change to new project data
  // apiKey: "AIzaSyCEWbHfebB2L9xnTWLtNfUTcyipLS7UaIQ",
  // authDomain: "subscription-tracker-edbd5.firebaseapp.com",
  // projectId: "subscription-tracker-edbd5",
  // storageBucket: "subscription-tracker-edbd5.appspot.com",
  // messagingSenderId: "373117593569",
  // appId: "1:373117593569:web:baadbfa84c1bc40422d4a0",
  // measurementId: "G-FHLL86J4RB",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
