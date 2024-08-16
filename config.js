
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDF3sTUVM2CMr5Ztnk2CbnM6DtTpTvAYcQ",
  authDomain: "mini-hackathon-121.firebaseapp.com",
  projectId: "mini-hackathon-121",
  storageBucket: "mini-hackathon-121.appspot.com",
  messagingSenderId: "940174027840",
  appId: "1:940174027840:web:bfef1352adde164cf4c3a5",
  measurementId: "G-L6TPV3HMKF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);