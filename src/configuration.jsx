// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "saunter-e0d33.firebaseapp.com",
  databaseURL: "https://saunter-e0d33-default-rtdb.firebaseio.com",
  projectId: "saunter-e0d33",
  storageBucket: "saunter-e0d33.appspot.com",
  messagingSenderId: "386781248114",
  appId: "1:386781248114:web:65719d107feab3c9dfa0eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
