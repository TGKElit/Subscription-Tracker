import * as firebase from "firebase/app";

// Optionally import the services that you want to use

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

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
export { auth };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
