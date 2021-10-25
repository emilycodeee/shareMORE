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
  deleteDoc,
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
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);

    let data;

    if (querySnapshot.docs) {
      querySnapshot.forEach((doc) => {
        if (doc.id !== result.user.uid) {
          data = {
            creationTime: result.user.metadata.creationTime,
            displayName: result.user.displayName || "",
            avatar:
              result.user.photoURL ||
              "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FkilakilaAvatar.png?alt=media&token=1a597182-f899-4ae1-8c47-486b3e2d5add",
            email: result.user.email,
            userID: result.user.uid,
          };
        }
      });
    }
    await setDoc(doc(db, "users", result.user.uid), data);
  } catch (err) {
    console.log(err);
  }
};

export const register = async (name, email, password, setFunction) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const data = {
      creationTime: result.user.metadata.creationTime,
      displayName: name,
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FkilakilaAvatar.png?alt=media&token=1a597182-f899-4ae1-8c47-486b3e2d5add",
      email: result.user.email,
      userID: result.user.uid,
    };
    await setDoc(doc(db, "users", result.user.uid), data);
  } catch (error) {
    console.log("🎆", error.code);
    switch (error.code) {
      case "auth/email-already-in-use":
        alert("信箱已存在");
        break;
      case "auth/invalid-email":
        alert("密碼格式不正確");
        break;
      case "auth/weak-password":
        alert("密碼強度不足");
        break;
      default:
    }
  }
};
export const logIn = async (email, password, setFunction) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        alert("信箱不存在");
        break;
      case "auth/invalid-email":
        alert("信箱格式不正確");
        break;
      case "auth/wrong-password":
        alert("密碼錯誤");
        break;
      default:
    }
  }
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
  const docRefId = doc(collection(db, "articles")).id;
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "cover-images/" + docRefId);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);

  const finalData = {
    ...data,
    milestoneID: docRefId,
    coverImage: imgURL,
  };

  const response = await setDoc(doc(db, "articles", docRefId), finalData);
  alert("建立成功");
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

export const getOptionsName = async (optionName) => {
  const q = query(collection(db, optionName));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push({ value: doc.data().name, label: doc.data().name });
  });
  return arr;
};

export const getQueryFilter = async (collectionName, fieldName, queryName) => {
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
  });
  return arr;
};

export const createGroup = async (data, file) => {
  const docRefId = doc(collection(db, "groups")).id;
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, "cover-images/" + docRefId);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);

  const finalData = {
    ...data,
    groupID: docRefId,
    coverImage: imgURL,
  };
  const response = await setDoc(doc(db, "groups", docRefId), finalData);
};

export const getContentsList = async (topic, setFonction) => {
  const q = query(collection(db, topic));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  setFonction(data);
};

export const getTopLevelContent = async (topic, docID) => {
  const docRef = doc(db, topic, docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getMembersData = async (topic, docID) => {
  const docRef = doc(db, topic, docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
};

export const getMembersList = async (groupID) => {
  const querySnapshot = await getDocs(
    collection(db, "groups", groupID, "members")
  );
  const data = [];
  if (querySnapshot.docs) {
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
  }
  console.log(data);
  return data;
};

export const sendGroupsPost = async (groupID, data) => {
  const docRefId = doc(collection(db, "groups", groupID, "posts")).id;
  const finalData = { ...data, postID: docRefId };

  await setDoc(
    doc(collection(db, "groups", groupID, "posts"), docRefId),
    finalData
  );
};

export const postsListener = async (groupID, setRenderPost) => {
  const q = query(
    collection(db, "groups", groupID, "posts"),
    orderBy("creationTime", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setRenderPost(data);
  });
};

export const getTotalDocList = async (optionName) => {
  const q = query(collection(db, optionName));
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

export const sendPostComment = async (groupID, postID, data) => {
  const docRefId = doc(
    collection(db, "groups", groupID, "posts", postID, "comments")
  ).id;
  const finalData = { ...data, commentID: docRefId };

  await setDoc(
    doc(
      collection(db, "groups", groupID, "posts", postID, "comments"),
      docRefId
    ),
    finalData
  );
};

export const postCommentsListener = async (groupID, postID, setFunction) => {
  const q = query(
    collection(db, "groups", groupID, "posts", postID, "comments"),
    orderBy("creationTime", "asc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setFunction(data);
  });
};

export const SendApplication = async (groupID, data, docRefId) => {
  const response = await setDoc(
    doc(collection(db, "groups", groupID, "applications"), docRefId),
    data
  );
  return response;
};

export const getTotalApplicationList = async (groupID) => {
  const applicationRef = collection(db, "groups", groupID, "applications");

  if (applicationRef) {
    const q = query(applicationRef, where("approve", "==", false));
    const querySnapshot = await getDocs(q);

    const data = [];
    if (querySnapshot.docs) {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
    }
    return data;
  }
};

export const confirmApplication = async (groupID, docRefId, data) => {
  const applicationRef = doc(db, "groups", groupID, "applications", docRefId);
  await updateDoc(applicationRef, {
    approve: true,
  });

  const response = await setDoc(
    doc(collection(db, "groups", groupID, "members"), docRefId),
    data
  );
  return response;
};

export const rejectApplication = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "applications", docRefId));
};
