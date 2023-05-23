import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3lRhUlLN3m8BWyEKSlOpWZpwFKIDWaXY",
  authDomain: "capstone-2cb1c.firebaseapp.com",
  projectId: "capstone-2cb1c",
  storageBucket: "capstone-2cb1c.appspot.com",
  messagingSenderId: "795875689152",
  appId: "1:795875689152:web:2d3e77789b4ffc2aa6a325",
  measurementId: "G-5MZVQQH4SB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
