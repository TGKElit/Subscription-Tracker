import { initializeApp } from "firebase/app";

// Initialize Firebase
const firebaseApp = {
  apiKey: "AIzaSyDqEnnr80Kkus5lzHkGSfSRMCQHyHC3Tbk",
  authDomain: "subscriptiontracker-b0f27.firebaseapp.com",
  databaseURL:
    "https://subscriptiontracker-b0f27-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "subscriptiontracker-b0f27",
  storageBucket: "subscriptiontracker-b0f27.appspot.com",
  messagingSenderId: "224186763641",
  appId: "1:224186763641:web:bd67d8f5053b3565c1c7a8",
  measurementId: "G-FQR3KH7G08",
  databaseURL:
    "https://subscriptiontracker-b0f27-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const startFirebaseApp = () => {
  const app = initializeApp(firebaseApp);
  app;
};
