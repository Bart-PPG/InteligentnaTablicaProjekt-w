import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyClLh9U0OyeXEPle9EaHXsUMCKA3RwPuKk",
    authDomain: "inteligentnatablicaprojektow.firebaseapp.com",
    projectId: "inteligentnatablicaprojektow",
    storageBucket: "inteligentnatablicaprojektow.firebasestorage.app",
    messagingSenderId: "356478848730",
    appId: "1:356478848730:web:9ef8f0c835c9891c239fe3",
    measurementId: "G-0ZVM8S5LL8"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
