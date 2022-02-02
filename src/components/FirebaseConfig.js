// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ6-j7DDPPTsQVVKxLXyP29SO-ibn7MK0",
  authDomain: "soccer-bet-3f55e.firebaseapp.com",
  projectId: "soccer-bet-3f55e",
  storageBucket: "soccer-bet-3f55e.appspot.com",
  messagingSenderId: "878304563110",
  appId: "1:878304563110:web:c9d6324239190ebc5a4967",
  measurementId: "G-YG2FMKVSNY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
export default auth;