import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "Uzupelnic_API_KEY",
  authDomain: "Uzupelnic.firebaseapp.com",
  projectId: "Uzupelnic_ID",
  storageBucket: "Uzupelnic.appspot.com",
  messagingSenderId: "Uzupelnic",
  appId: "Uzupelnic_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
