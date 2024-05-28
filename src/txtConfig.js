// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5-lUpXpksP1lgBbGQUhlpXaRsUyRe7zs",
  authDomain: "ciel-s-stats.firebaseapp.com",
  projectId: "ciel-s-stats",
  storageBucket: "ciel-s-stats.appspot.com",
  messagingSenderId: "325452880503",
  appId: "1:325452880503:web:ef0a35511dbbd986020472",
  measurementId: "G-C7EVSPB3XB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const txtDB = getFirestore(app)
export{
    txtDB
}