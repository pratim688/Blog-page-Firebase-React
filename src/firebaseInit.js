// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbB_0SKh3OYIMmG0CexJY4vl5VZH7uh94",
  authDomain: "blogging-app-1d499.firebaseapp.com",
  projectId: "blogging-app-1d499",
  storageBucket: "blogging-app-1d499.appspot.com",
  messagingSenderId: "408546483525",
  appId: "1:408546483525:web:d74dc6221890bd6643f22c",
  measurementId: "G-KCNNDSWLDT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);