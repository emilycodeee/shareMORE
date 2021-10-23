import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
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
  Timestamp,
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  addDoc,
  where,
  onSnapshot,
  orderBy,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

//init firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage(firebaseApp);

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
          avatar:
            result.user.photoURL ||
            "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FkilakilaAvatar.png?alt=media&token=1a597182-f899-4ae1-8c47-486b3e2d5add",
          email: result.user.email,
          userID: result.user.email,
        };
      }
    });
    await setDoc(doc(db, "users", result.user.email), data);
    console.log("我改寫成async", result.user);
  } catch (err) {
    console.log(err);
  }
};

export const register = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log(result);
    const data = {
      creationTime: result.user.metadata.creationTime,
      displayName: result.user.displayName || "",
      avatar:
        result.user.photoURL ||
        "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FkilakilaAvatar.png?alt=media&token=1a597182-f899-4ae1-8c47-486b3e2d5add",
      email: result.user.email,
      userID: result.user.email,
    };
    await setDoc(doc(db, "users", result.user.email), data);
  } catch (err) {
    console.log(err);
  }
};

export const logIn = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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

/* */
export const postArticles = async (data, file) => {
  console.log("file", file);
  const docRef = await addDoc(collection(db, "articles"), {
    name: "Tokyo",
    country: "Japan",
    hello: data,
  });
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "cover-images/" + docRef.id);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);
  console.log(docRef.id);
  console.log("imgURL", imgURL);
  // console.log(uploadTask);
};

//for uploadReactQuillImage
export const uploadReactQuillImage = async (file, quillRef) => {
  const idName = uuidv4();
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "post-images/" + idName);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);
  let quill = quillRef.getEditor();
  const range = quill.getSelection(true);
  quill.insertEmbed(range.index, "image", imgURL);
};

export const getOptionsName = async (optionName, setFunction) => {
  const q = query(collection(db, optionName));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    arr.push({ value: doc.data().name, label: doc.data().name });
  });
  setFunction(arr);
};

export const getQueryFilter = async (
  collectionName,
  fieldName,
  queryName,
  setFunction
) => {
  const q = query(
    collection(db, collectionName),
    where(fieldName, "==", queryName)
  );
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    doc.data().subClasses.forEach((each) => {
      arr.push({ value: each, label: each });
    });
    // arr.push();
    // console.log(doc.id, " => ", doc.data());
  });
  // console.log(arr);
  setFunction(arr);
};

export const createGroup = async (data, file) => {
  const docRefId = doc(collection(db, "groups")).id;
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "cover-images/" + docRefId);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);

  console.log("file", file);
  const finalData = {
    ...data,
    groupID: docRefId,
    coverImage: imgURL,
  };
  const response = await setDoc(doc(db, "groups", docRefId), finalData);
  console.log(response);
};

export const getGroupsList = async (setFonction) => {
  const q = query(collection(db, "groups"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    data.push(doc.data());
    console.log(data);
  });
  setFonction(data);
};

export const getGroupContent = async (groupID, setFonction) => {
  const docRef = doc(db, "groups", groupID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return setFonction(docSnap.data());

    // console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const sendGroupsPost = async (groupID, data) => {
  const docRefId = doc(collection(db, "groups", groupID, "posts")).id;
  const finalData = { ...data, postID: docRefId };

  await setDoc(
    doc(collection(db, "groups", groupID, "posts"), docRefId),
    finalData
  );
};

export const postsListener = async (groupID, setFunction) => {
  console.log("hiiiiiiiiiiiiiiii");
  const q = query(
    collection(db, "groups", groupID, "posts"),
    orderBy("creationTime", "desc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      data.push(doc.data());
    });
    setFunction(data);
    // console.log("data", data);
  });
};

export const getTotalUserList = async (setFunction, optionName) => {
  const q = query(collection(db, optionName));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    arr.push(doc.data());
  });
  setFunction(arr);
};
