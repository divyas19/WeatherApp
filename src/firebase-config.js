import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAoyjMZ26OJ25005BwPCcVehUITrYA7f4",
    authDomain: "weather-app-23a12.firebaseapp.com",
    projectId: "weather-app-23a12",
    storageBucket: "weather-app-23a12.appspot.com",
    messagingSenderId: "297175354412",
    appId: "1:297175354412:web:c4fbecf3704a42083d5589",
    measurementId: "G-9JJGKZYK75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
    .then(() => {
        // Existing and future Auth states are now persisted in the current session only.
        // ...
    })
    .catch((error) => {
        console.error("Error setting persistence:", error);
    });

export { auth };
