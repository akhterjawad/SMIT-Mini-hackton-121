
import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    updateDoc,
    Timestamp,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { auth, db } from "../config.js";

let uid;
let div = document.querySelector('#ForInnerHtml');
let name = document.querySelector('.name');
let form = document.querySelector('#form');
let heading = document.querySelector('#heading');
let description = document.querySelector('#description');

onAuthStateChanged(auth, (user) => {
    if (user) {
        uid = user.uid;
        console.log(uid);
        GetDataFromFirestore();
    } else {
        console.log(`User is signed out`);
        window.location = `../login.html`;
    }
});

async function GetDataFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            if (doc.data().Uid === uid) {
                console.log(doc.data());
                name.innerHTML = `${doc.data().firstname} ${doc.data().lastname}`;
            }
        });
    } catch (error) {
        console.log("Error getting documents: ", error);
    }
}

let button = document.querySelector('.button');
button.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log(`Sign-out successful.`);
        window.location = `../login.html`;
    }).catch((error) => {
        console.log(error);
    });
});


let array=[];
form.addEventListener('submit',async event => {
    event.preventDefault();
    // array = [];
    try {
        div.innerHTML = ``; 
        const docRef = await addDoc(collection(db, "post"), {
            heading: heading.value,
            description: description.value,
            time: Timestamp.fromDate(new Date()),
            Uid: auth.currentUser.uid  
        });
        console.log("Document written with ID: ", docRef.id);  
        // GetDataFromFirestore();
        array.push({
            heading: heading.value,
            description: description.value,
            id: docRef.id
        });
        renderscreen();  
        heading.value = ``; 
        description.value = ``; 
    } catch (e) {
        console.error("Error adding document: ", e);  
    }
    console.log(array);
    renderscreen()
});

function renderscreen() {
    div.innerHTML = ""; // Clear existing content
    array.map((item, index) => {
        div.innerHTML += `
            <div class="card bg-base-100 w-96 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">${item.heading}</h2>
                    <p>${item.description}</p>
                    <div class="card-actions justify-end">
                        <button type="button" class="btn btn-danger delete-btn" data-index="${index}">delete</button>
                        <button type="button" class="btn btn-primary edit-btn" data-index="${index}">edit</button>
                    </div>
                </div>
            </div>
        `;
    });

    // Select all delete and edit buttons again after rendering the HTML
    let deleteButton = document.querySelectorAll('.delete-btn');
    let editButton = document.querySelectorAll('.edit-btn');

    deleteButton.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const index = event.target.getAttribute('data-index');
            console.log(array[index]); 
            await deleteDoc(doc(db, "post", array[index].id));  
            console.log("Data deleted"); 
            array.splice(index, 1);
            renderscreen();  
        });
    });

    editButton.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
            const index = event.target.getAttribute('data-index');
            console.log(array[index]); 
            const updatedNewheading = prompt("enter new heading", array[index].heading);  
            const updatedNewDescription = prompt("enter new description", array[index].description);  
            const dataUpdate = doc(db, "post", array[index].id);
            await updateDoc(dataUpdate, {
                heading: updatedNewheading, // Use "heading" instead of "title"
                description: updatedNewDescription
            });
            if (updatedNewheading !== ``) {
                array[index].heading = updatedNewheading;
            };
            if (updatedNewDescription !== ``) {
                array[index].description = updatedNewDescription;
            };
            renderscreen();
            console.log("Data updated");  
        });
    });
}

async function GetDataFromFirestoreMain() {
    array = [];  
    const querySnapshot = await getDocs(collection(db, "post"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data()); 
        array.push({ ...doc.data(), id: doc.id });
    });
    renderscreen(); 
    console.log(array); 
};
GetDataFromFirestoreMain(); 


  

