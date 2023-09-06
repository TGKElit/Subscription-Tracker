import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDqEnnr80Kkus5lzHkGSfSRMCQHyHC3Tbk",
  authDomain: "subscriptiontracker-b0f27.firebaseapp.com",
  databaseURL:
    "https://subscriptiontracker-b0f27-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "subscriptiontracker-b0f27",
  storageBucket: "subscriptiontracker-b0f27.appspot.com",
  messagingSenderId: "224186763641",
  appId: "1:224186763641:web:bd67d8f5053b3565c1c7a8",
  measurementId: "G-FQR3KH7G08",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
