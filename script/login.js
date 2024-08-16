import {onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "../config.js";
const provider = new GoogleAuthProvider();


let form = document.querySelector('#form');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let googleBtn = document.querySelector('.googlelogin');




form.addEventListener('submit', event => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('You are logged in');
            console.log(user);
            window.location = `../dashbord.html`;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
            email.value = '';
            password.value = '';
        });
});
