// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { firebaseConfig } from "./firebaseConfig.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    signOut 
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { 
    getFirestore,
    addDoc,
    collection,
    Timestamp,
    getDocs,
    getDoc,
    query,
    orderBy,
    doc,
    deleteDoc,
    updateDoc,
    arrayRemove,
    arrayUnion
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app)

export {
    auth,
    provider,
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    db,
    addDoc,
    collection,
    Timestamp,
    getDocs,
    getDoc,
    query,
    orderBy,
    doc,
    deleteDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
    storage,
    ref,
    uploadBytes,
    uploadBytesResumable
}