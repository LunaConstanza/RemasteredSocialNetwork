// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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
} from "firebase/auth";
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
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
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