import { app } from "./firebaseConfig.js";
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
  FieldValue,
  Timestamp, serverTimestamp
} from "firebase/firestore"
import { saveUser } from "./store.js";

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
let currentUser;

// Registro con usuario y constraseña
export const registerUser = (email, password, displayName, date) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      const userId = user.uid;
      verification(auth);
      saveUser(userId, displayName, date)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Este correo electrónico ya existe.')
    });
};

//Registro con Google
export const registerGoogle = (callback) => {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    console.log(result);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    console.log(credential);
    const token = credential.accessToken;
    console.log(token);
    console.log(result);
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    console.log(user.metadata.createdAt);
    console.log(user.metadata.lastLoginAt - 10);

    if (user.metadata.createdAt >= (user.metadata.lastLoginAt - 10) ) {
      console.log('guardamos usuario');
      saveUser(user.uid, user.displayName, user.phoneNumber)
    }

    callback(true)
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    callback(false)
  });
}

// Ingreso con usuario y contraseña
export const login = (email, password, callback) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      callback(true)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/user-not-found') {
        alert('Usuario no regristrado');

      } else if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta');
      }
      callback(false)
    });
}

// Correo de verificación de registro
export const verification = (auth) => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      alert('Se ha enviado un mensaje de verificación a tu correo electrónico, por favor revisalo y verifica tu registro. Luego inicia sesión.');
    });
}

// Reestablecer contraseña
export const resetPass = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}

//Estado acutal de usuario conectado
export const currentChange = (navigateTo) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      currentUser = user;
      const uid = user.uid;
      return currentUser;
    } else {
      // User is signed out
      navigateTo('/')
    }
  });
}

// Cerrar sesión
export const closeSesion = (navigateTo) => {
  signOut(auth).then(() => {
    // Sign-out successful.
    navigateTo('/');
  }).catch((error) => {
    // An error happened.
  });
}