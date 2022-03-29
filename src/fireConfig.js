// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT91czl4a37C-qelNH69eYiqogWK7zglA",
  authDomain: "ecommerce-280bc.firebaseapp.com",
  projectId: "ecommerce-280bc",
  storageBucket: "ecommerce-280bc.appspot.com",
  messagingSenderId: "72627427939",
  appId: "1:72627427939:web:707f8873a98b8de1983656",
  measurementId: "G-6LB62B8F67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
