import { createUserWithEmailAndPassword ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth, db } from "../config.js";


let form = document.querySelector('#form');
let email = document.querySelector('#email');
let firstname = document.querySelector('#firstname');
let lastname = document.querySelector('#lastname');
let password = document.querySelector('#password');


// onAuthStateChanged(auth, (user) => {
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         console.log(uid);
//         console.log(`User is login`);
//         window.location = `../dashbord.html`;
//     } else {
//         console.log(`User is not login`);
        
//         // User is signed out
//         // ...
//     }
// });
// Global array to store data
let array = [];


form.addEventListener('submit', async event => {
    event.preventDefault();
    if (email.value === '' || password.value === ''|| firstname.value === ''|| lastname.value === '') {
        alert('Please fill in the input fields');
        return;
    }

    try {
        // Create a new user account with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;

        // Add the user data to Firestore
        const docRef = await addDoc(collection(db, "users"), {
            firstname: firstname.value,
            lastname: lastname.value,
            Uid: user.uid  // Store the user's UID
        });

        console.log("Document written with ID: ", docRef.id);

        // Push to the array
        array.push({
            firstname: firstname.value,
            lastname: lastname.value
        });

        // Clear input fields after successful registration
        firstname.value = '';
        lastname.value = '';
        email.value = '';
        password.value = '';

        alert('You are registered');
        window.location = '../login.html';
    } catch (error) {
        console.error("Error during registration: ", error);
        alert(error.message);
        email.value = '';
        password.value = '';
    }


});