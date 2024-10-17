import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const api = process.env.REACT_APP_API_KEY;
const firebaseConfig = {
  apiKey: api,
  authDomain: "ciel-s-stats.firebaseapp.com",
  projectId: "ciel-s-stats",
  storageBucket: "ciel-s-stats.appspot.com",
  messagingSenderId: "325452880503",
  appId: "1:325452880503:web:ef0a35511dbbd986020472",
  measurementId: "G-C7EVSPB3XB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const txtDB = getFirestore(app);
const auth = getAuth();

export { txtDB, auth };
