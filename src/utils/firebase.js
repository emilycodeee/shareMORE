import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyCQHqFcsCHVyuWMorFZvfGukBOpoO_kxcM",
  authDomain: "sharemore-discovermore.firebaseapp.com",
  projectId: "sharemore-discovermore",
  storageBucket: "sharemore-discovermore.appspot.com",
  messagingSenderId: "400237512130",
  appId: "1:400237512130:web:2cc9e5940db2d9ddc2c25b",
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export const socialMediaAuth = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    // checkMembership(result.user);
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    let data;
    querySnapshot.forEach((doc) => {
      if (doc.id !== result.user.email) {
        data = {
          creationTime: result.user.metadata.creationTime,
          displayName: result.user.displayName || "",
          email: result.user.email,
        };
      }
    });
    await setDoc(doc(db, "users", result.user.email), data);
    console.log("我改寫成async", result.user.email);
  } catch (err) {
    console.log(err);
  }
};

export const register = async (email, password) => {
  // createUserWithEmailAndPassword(auth, email, password);
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    const data = {
      creationTime: result.user.metadata.creationTime,
      displayName: result.user.displayName || "",
      email: result.user.email,
    };
    await setDoc(doc(db, "users", result.user.email), data);
  } catch (err) {
    console.log(err);
  }
  // createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in
  //     const user = userCredential.user;
  //     const user = userCredential.user;
  //     const data = {
  //       creationTime: user.metadata.creationTime,
  //       displayName: user.displayName || "",
  //       email: user.email,
  //     };
  //     await setDoc(doc(db, "users", user.email), data);
  //     // ...
  //     console.log(user);
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });
};

export const logIn = (email, password) => {
  // signInWithEmailAndPassword(auth, email, password);

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in

      // ...
      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logOut = () => {
  signOut(auth)
    .then(() => {
      alert("Sign-out successful.");
    })
    .catch((error) => {
      console.log("💔error happened.");
    });
};

export function subscribeToUser(callback) {
  onAuthStateChanged(auth, callback);
}
