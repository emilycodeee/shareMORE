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
  writeBatch,
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

export const socialMediaAuth = async (provider, setFunction) => {
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
  } catch (error) {
    switch (error.code) {
      case "auth/user-not-found":
        setFunction("信箱不存在，請重試");
        break;
      case "auth/invalid-email":
        setFunction("信箱格式不正確，請重試");
        break;
      case "auth/wrong-password":
        setFunction("密碼錯誤，請重試");
        break;
      default:
    }
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
        setFunction("信箱已存在，請重試");
        break;
      case "auth/invalid-email":
        setFunction("密碼格式不正確，請重試");
        break;
      case "auth/weak-password":
        setFunction("密碼強度不足，請重試");
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
        setFunction("信箱不存在，請重試");
        break;
      case "auth/invalid-email":
        setFunction("信箱格式不正確，請重試");
        break;
      case "auth/wrong-password":
        setFunction("密碼錯誤，請重試");
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
  let imgURL =
    "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, "cover-images/" + docRefId);
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    imgURL = await getDownloadURL(uploadTask.ref);
  }
  const finalData = {
    ...data,
    milestoneID: docRefId,
    coverImage: imgURL,
  };

  const response = await setDoc(doc(db, "articles", docRefId), finalData);
};

export const getRawGroupNotes = async (groupID, postID) => {
  const data = {};
  const docRef = doc(db, "groups", groupID, "posts", postID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    data.mainPost = docSnap.data();
  } else {
    console.log("No such document!");
  }

  const q = query(
    collection(db, "groups", groupID, "posts", postID, "comments")
  );
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  data.comments = arr;

  return data;
};

export const postGroupNotes = async (groupID, data, file) => {
  const docRefId = doc(collection(db, "groups", groupID, "notes")).id;

  let imgURL =
    "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, "cover-images/" + docRefId);
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    imgURL = await getDownloadURL(uploadTask.ref);
  }
  const finalData = {
    ...data,
    noteID: docRefId,
    coverImage: imgURL,
  };

  const response = await setDoc(
    doc(db, "groups", groupID, "notes", docRefId),
    finalData
  );
  return response;
};

export const removeTopLevelPost = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "posts", docRefId));
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

// 😎
export const getMyGroupsName = async (userID) => {
  const memberQ = query(
    collection(db, "groups"),
    where("membersList", "array-contains", userID)
  );

  const memberQuerySnapshot = await getDocs(memberQ);
  const arr = [];
  memberQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    arr.push({ value: doc.data().groupID, label: doc.data().name });
    // console.log(doc.id, " => ", doc.data());
  });

  const creatorQ = query(
    collection(db, "groups"),
    where("creatorID", "==", userID)
  );

  const creatorQuerySnapshot = await getDocs(creatorQ);
  // const arr = [];
  creatorQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    arr.push({ value: doc.data().groupID, label: doc.data().name });
    // console.log(doc.id, " => ", doc.data());
  });

  console.log("🍕🍕🍕🍕", arr);
  return arr;
};
//
export const getMyGroupsObj = async (userID) => {
  const memberQ = query(
    collection(db, "groups"),
    where("membersList", "array-contains", userID)
  );

  const memberQuerySnapshot = await getDocs(memberQ);
  const memberArr = [];
  memberQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    memberArr.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  const creatorQ = query(
    collection(db, "groups"),
    where("creatorID", "==", userID)
  );

  const creatorQuerySnapshot = await getDocs(creatorQ);
  const creatorArr = [];
  creatorQuerySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    creatorArr.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  // console.log("🍕🍕🍕🍕", arr);
  return { participate: memberArr, owner: creatorArr };
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

export const getMyMilestones = async (userID) => {
  const q = query(
    collection(db, "articles"),
    where("creatorID", "==", userID),
    where("public", "==", true)
  );

  const qSnapshot = await getDocs(q);
  const arr = [];
  qSnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    arr.push(doc.data());
    // console.log(doc.id, " => ", doc.data());
  });

  // console.log("🍕🍕🍕🍕", arr);
  return arr;
};

// let imgURL =
//   "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
// if (file) {
//   const storageRef = ref(storage);
//   const imagesRef = ref(storageRef, "cover-images/" + docRefId);
//   const metadata = { contenType: file.type };
//   const uploadTask = await uploadBytes(imagesRef, file, metadata);
//   imgURL = await getDownloadURL(uploadTask.ref);
// }

export const createGroup = async (data, file) => {
  let imgURL =
    "https://www.leadershipmartialartsct.com/wp-content/uploads/2017/04/default-image.jpg";
  const docRefId = doc(collection(db, "groups")).id;
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, "cover-images/" + docRefId);
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    imgURL = await getDownloadURL(uploadTask.ref);
  }

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

export const getMembersList = async (groupID, setFunction) => {
  const q = query(
    collection(db, "groups", groupID, "members"),
    orderBy("joinTime", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    console.log(data);
    setFunction(data);
  });
};

export const sendGroupsPost = async (groupID, data) => {
  const docRefId = doc(collection(db, "groups", groupID, "posts")).id;
  const finalData = { ...data, postID: docRefId };

  await setDoc(
    doc(collection(db, "groups", groupID, "posts"), docRefId),
    finalData
  );
};

export const clapsForPost = async (groupID, docID, userID) => {
  console.log(docID, userID);
  const docRef = doc(db, "groups", groupID, "posts", docID);
  const docSnap = await getDoc(docRef);
  console.log("sssssss", docSnap.data());

  if (docSnap.data().clapBy?.includes(userID)) {
    await updateDoc(docRef, {
      // regions: arrayRemove("east_coast"),
      clapBy: arrayRemove(userID),
    });
    // setFunction(false);
  } else {
    await updateDoc(docRef, {
      clapBy: arrayUnion(userID),
    });
    // setFunction(true);
  }
};

// export const getClaps =

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

export const getTotalApplicationList = async (groupID, setApplicationData) => {
  const applicationRef = collection(db, "groups", groupID, "applications");
  console.log(applicationRef);
  if (applicationRef) {
    const q = query(applicationRef, where("approve", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
      }
      setApplicationData({ count: data.length, data: data });
    });
  }
};

export const confirmApplication = async (memberID, groupID, data) => {
  const batch = writeBatch(db);

  const applicationRef = doc(
    collection(db, "groups", groupID, "applications"),
    memberID
  );
  batch.update(applicationRef, {
    approve: true,
  });

  const sfRef = doc(collection(db, "groups", groupID, "members"), memberID);
  batch.set(sfRef, data);

  const memberListRef = doc(collection(db, "groups"), groupID);
  await updateDoc(memberListRef, {
    membersList: arrayUnion(memberID),
  });

  await batch.commit();
  // const response = await setDoc(
  //   doc(collection(db, "groups", groupID, "members"), docRefId),
  //   data
  // );
  // return response;

  // 🥱🥱
  // const applicationRef = doc(db, "groups", groupID, "applications", docRefId);
  // await updateDoc(applicationRef, {
  //   approve: true,
  // });
  // const response = await setDoc(
  //   doc(collection(db, "groups", groupID, "members"), docRefId),
  //   data
  // );
  // return response;
};

export const rejectApplication = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "applications", docRefId));
};

export const deleteComment = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "posts", docRefId));
};

// export const sendMessage = async (data) => {
//   const docRefId = doc(collection(db, "messages")).id;
//   const d = { ...data, docID: docRefId };
// await setDoc(doc(collection(db, "messages"), docRefId), d);
// };

export const sendMessage = async (data, meID, youID) => {
  // const batch = writeBatch(db);

  const meChatRef = doc(db, "users", meID);
  await updateDoc(meChatRef, {
    chatWith: arrayUnion(youID),
  });
  // batch.update(meChatRef, {
  //   chatWith: arrayUnion(youID),
  // });

  const youChatRef = doc(db, "users", youID);
  // batch.update(youChatRef, {
  //   chatWith: arrayUnion(meID),
  // });

  await updateDoc(youChatRef, {
    chatWith: arrayUnion(meID),
  });

  // await updateDoc(meChatRef, {
  //   chatWith: arrayUnion(youID),
  // });

  const docRefId = doc(collection(db, "messages")).id;
  const d = { ...data, docID: docRefId };
  await setDoc(doc(collection(db, "messages"), docRefId), d);
  // batch.set(docRefId, d);
};

export const getMessagesData = async (me, you, setFunction) => {
  const t = [you, me];
  console.log("😍😍😎😍😍😍😍", [me, you]);
  const messagesRef = collection(db, "messages");

  // const q = query(messagesRef);
  // const q = query(collection(db, "cities"), where("state", "==", "CA"));
  const q = query(
    collection(db, "messages"),
    where("usersID", "in", [t]),
    orderBy("creationTime", "asc")
    // where("usersID", "in", [t])
    // orderBy("creationTime", "desc")
  );
  console.log(q);
  // const q = query(
  //   citiesRef,
  //   where("regions", "in", [["west_coast", "east_coast"]])
  // );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setFunction(data);
    console.log("😍😍😎", data);
    return data;
  });
};
