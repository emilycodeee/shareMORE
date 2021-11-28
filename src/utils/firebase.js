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
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  where,
  onSnapshot,
  orderBy,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  writeBatch,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2/dist/sweetalert2.js";

// require("dotenv").config();

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
export const db = getFirestore();
const storage = getStorage(firebaseApp);

export const facebookProvider = new FacebookAuthProvider();
export const googleProvider = new GoogleAuthProvider();

export const socialMediaAuth = async (provider, setFunction) => {
  try {
    const result = await signInWithPopup(auth, provider);
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", result.user.uid));
    const querySnapshot = await getDocs(q);
    let data;
    if (querySnapshot.docs.length === 0) {
      data = {
        creationTime: result.user.metadata.creationTime,
        displayName: result.user.displayName || "",
        avatar:
          result.user.photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbackgroundUser.png?alt=media&token=c03a9d59-7d7b-47b2-a2bb-aece5bb8537b",
        email: result.user.email,
        uid: result.user.uid,
      };
    }
    await setDoc(doc(db, "users", result.user.uid), data, { merge: true });
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
        "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2FbackgroundUser.png?alt=media&token=c03a9d59-7d7b-47b2-a2bb-aece5bb8537b",
      email: result.user.email,
      uid: result.user.uid,
    };
    await setDoc(doc(db, "users", result.user.uid), data, { merge: true });
  } catch (error) {
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: "成功登出",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      console.log("💔error happened.");
    });
};

export function subscribeToUser(callback) {
  onAuthStateChanged(auth, callback);
}

export const postArticles = async (data, file) => {
  const docRefId = doc(collection(db, "articles")).id;
  let imgURL =
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66";
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(
      storageRef,
      `articles/${docRefId}/cover-images/` + docRefId
    );
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    imgURL = await getDownloadURL(uploadTask.ref);
  }
  const finalData = {
    ...data,
    milestoneID: docRefId,
    coverImage: imgURL,
  };

  await setDoc(doc(db, "articles", docRefId), finalData);
  return docRefId;
};

export const editArticles = async (data, file, milestoneID, imgURL) => {
  let updateImgURL = imgURL;
  if (file) {
    const imgID = uuidv4();
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, `articles/${milestoneID}/` + imgID);
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    updateImgURL = await getDownloadURL(uploadTask.ref);
  }
  const finalData = {
    ...data,

    coverImage: updateImgURL,
  };

  const response = await setDoc(doc(db, "articles", milestoneID), finalData, {
    merge: true,
  });
};

export const deleteMilestone = async (collectionName, docID) => {
  await deleteDoc(doc(db, collectionName, docID));
};

export const deleteDocItem = async (
  collectionName,
  groupID,
  subCollection,
  docID
) => {
  await deleteDoc(doc(db, collectionName, groupID, subCollection, docID));
};

export const deleteMilestoneComment = async (
  collectionName,
  milestoneID,
  docID
) => {
  await deleteDoc(doc(db, collectionName, milestoneID, "posts", docID));
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

export const toggleMilestone = async (collectionName, docID, action) => {
  await updateDoc(doc(db, collectionName, docID), {
    public: action,
  });
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
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66";
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, `groups/${groupID}/notes/` + docRefId);
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
  return docRefId;
};

export const editGroupNotes = async (data, file, groupID, postID, imgURL) => {
  let updateImgURL = imgURL;
  if (file) {
    const imgID = uuidv4();
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, `groups/${groupID}/` + imgID);
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    updateImgURL = await getDownloadURL(uploadTask.ref);
  }
  const finalData = {
    ...data,

    coverImage: updateImgURL,
  };

  const response = await setDoc(
    doc(db, "groups", groupID, "notes", postID),
    finalData,
    {
      merge: true,
    }
  );
};

export const editGroupData = async (data, groupID) => {
  await setDoc(doc(db, "groups", groupID), data, {
    merge: true,
  });
};

export const editGroupImage = async (file, groupID) => {
  const imgID = uuidv4();
  const storageRef = ref(storage);
  const imagesRef = ref(storageRef, `groups/${groupID}/` + imgID);
  const metadata = { contenType: file.type };
  const uploadTask = await uploadBytes(imagesRef, file, metadata);
  const imgURL = await getDownloadURL(uploadTask.ref);

  const data = {
    coverImage: imgURL,
  };

  await setDoc(doc(db, "groups", groupID), data, {
    merge: true,
  });
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
    arr.push(doc.data());
  });
  return arr;
};

export const createGroup = async (data, file) => {
  let imgURL =
    "https://firebasestorage.googleapis.com/v0/b/sharemore-discovermore.appspot.com/o/web-default%2Fdefault.jpg?alt=media&token=da2e2f35-7239-4961-94bb-89af13aaca66";
  const docRefId = doc(collection(db, "groups")).id;
  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, `groups/${docRefId}/` + docRefId);
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
  return docRefId;
};

export const sendGroupsPost = async (groupID, data) => {
  const docRefId = doc(collection(db, "groups", groupID, "posts")).id;
  const finalData = { ...data, postID: docRefId };

  await setDoc(
    doc(collection(db, "groups", groupID, "posts"), docRefId),
    finalData
  );
};

// milestonePost🎉🎈
export const sendMilestoneComment = async (milestoneID, data) => {
  const docRefId = doc(collection(db, "articles", milestoneID, "posts")).id;
  const finalData = { ...data, postID: docRefId };

  await setDoc(
    doc(collection(db, "articles", milestoneID, "posts"), docRefId),
    finalData
  );
};

export const clapsForPost = async (groupID, docID, userID) => {
  const docRef = doc(db, "groups", groupID, "posts", docID);
  const docSnap = await getDoc(docRef);

  if (docSnap.data().clapBy?.includes(userID)) {
    await updateDoc(docRef, {
      clapBy: arrayRemove(userID),
    });
  } else {
    await updateDoc(docRef, {
      clapBy: arrayUnion(userID),
    });
  }
};

//milestone🎐🎏
export const actionForMilestone = async (milestoneID, userID, action) => {
  const docRef = doc(db, "articles", milestoneID);
  const docSnap = await getDoc(docRef);

  if (action === "saveBy") {
    if (docSnap.data().saveBy?.includes(userID)) {
      await updateDoc(docRef, {
        saveBy: arrayRemove(userID),
      });
    } else {
      await updateDoc(docRef, {
        saveBy: arrayUnion(userID),
      });
    }
  } else if (action === "clapBy") {
    if (docSnap.data().clapBy?.includes(userID)) {
      await updateDoc(docRef, {
        clapBy: arrayRemove(userID),
      });
    } else {
      await updateDoc(docRef, {
        clapBy: arrayUnion(userID),
      });
    }
  }
};

export const milestoneListener = (targetName, milestoneID, setFunction) => {
  const unsub = onSnapshot(doc(db, targetName, milestoneID), (doc) => {
    setFunction(doc.data());
  });
  return unsub;
};

export const getMilestone = async (targetName, milestoneID) => {
  const docRef = doc(db, targetName, milestoneID);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const postMilestoneListener = (targetName, milestoneID, setFunction) => {
  const q = query(
    collection(db, targetName, milestoneID, "posts"),
    orderBy("creationTime", "asc")
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setFunction(data);
  });

  return unsubscribe;
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

export const postCommentsListener = (groupID, postID, setFunction) => {
  const q = query(
    collection(db, "groups", groupID, "posts", postID, "comments"),
    orderBy("creationTime", "asc")
  );

  const unsubscribePost = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setFunction(data);
  });

  return unsubscribePost;
};

export const sendApplication = async (groupID, data, docRefId) => {
  const response = await setDoc(
    doc(collection(db, "groups", groupID, "applications"), docRefId),
    data
  );
  return response;
};

export const getTotalApplicationList = (
  groupID,
  setApplicationData,
  userData,
  setAppliedData
) => {
  const applicationRef = collection(db, "groups", groupID, "applications");

  if (applicationRef) {
    const q = query(applicationRef, where("approve", "==", false));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
      }

      const appliedData = data.find(
        (each) => each.applicantID === userData?.uid
      );
      if (appliedData) {
        setAppliedData(appliedData);
      }
      setApplicationData({ count: data.length, data: data });
    });

    return unsubscribe;
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
};

export const sendLeadNotification = async (groupID, userID) => {
  const docRefId = doc(collection(db, "users", userID, "notification")).id;

  const docId = `g-${docRefId}`;
  const data = {
    creationTime: new Date(),
    docId,
    groupID,
    readed: false,
    role: "owner",
  };

  const a = await setDoc(
    doc(collection(db, "users", userID, "notification"), docId),
    data
  );
};

//
export const sendGroupNotification = async (groupID, userID) => {
  const docRefId = doc(collection(db, "users", userID, "notification")).id;
  const docId = `g-${docRefId}`;
  const data = {
    creationTime: new Date(),
    docId,
    groupID,
    readed: false,
    role: "member",
  };

  const a = await setDoc(
    doc(collection(db, "users", userID, "notification"), docId),
    data
  );
};

export const sendMilestoneNotification = async (mileID, toAuthor, fromUser) => {
  const docRefId = doc(collection(db, "users", toAuthor, "notification")).id;
  const docId = `m-${docRefId}`;

  const data = {
    creationTime: new Date(),
    docId,
    milestoneID: mileID,
    sender: fromUser,
    readed: false,
  };

  await setDoc(
    doc(collection(db, "users", toAuthor, "notification"), docId),
    data
  );
};

export const readNotification = async (docID, userID) => {
  const notificationRef = doc(db, "users", userID, "notification", docID);
  if (notificationRef)
    await updateDoc(notificationRef, {
      readed: true,
    });
};

export const rejectApplication = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "applications", docRefId));
};
//postContainer.js🎈
export const editComment = async (groupID, docRefId, textData) => {
  const postDocRef = doc(collection(db, "groups", groupID, "posts"), docRefId);
  await updateDoc(postDocRef, {
    content: textData,
  });
};

export const deleteComment = async (groupID, docRefId) => {
  await deleteDoc(doc(db, "groups", groupID, "posts", docRefId));
};

export const updateProfile = async (userID, data, file) => {
  let finalData = data;

  if (file) {
    const storageRef = ref(storage);
    const imagesRef = ref(storageRef, `users/${userID}/` + uuidv4());
    const metadata = { contenType: file.type };
    const uploadTask = await uploadBytes(imagesRef, file, metadata);
    const imgURL = await getDownloadURL(uploadTask.ref);
    finalData.avatar = imgURL;
  }

  const userProfileRef = doc(db, "users", userID);
  await updateDoc(userProfileRef, finalData);
};

export const getGroupNotes = async (option, groupID, tagName) => {
  const q = query(
    collection(db, option, groupID, tagName),
    orderBy("creationTime", "desc")
  );
  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });

  return arr;
};

export const getGroupsNoteContent = async (option, groupID, tagName, docID) => {
  const docRef = doc(db, option, groupID, tagName, docID);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const setGroupBook = async (data) => {
  const docRef = doc(collection(db, "books")).id;

  const finalData = {
    ...data,
    groupBookID: docRef,
  };

  await setDoc(doc(db, "books", docRef), finalData);
};

export const getGroupBook = (groupID, setFunction) => {
  const q = query(
    collection(db, "books"),
    where("groupID", "==", groupID),
    orderBy("shareDate", "desc")
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      doc.data().applyStatus && data.push(doc.data());
    });
    setFunction(data);
  });

  return unsubscribe;
};

export const getGroupBookShelf = async () => {
  const q = query(collection(db, "books"), where("applyStatus", "==", true));

  const querySnapshot = await getDocs(q);
  const arr = [];
  querySnapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  return arr;
};

export const deleteBook = async (docRefId) => {
  await deleteDoc(doc(db, "books", docRefId));
};

export const onUsersData = (dispatch, getUsersList) => {
  const userq = query(collection(db, "users"), orderBy("creationTime", "desc"));
  const userStatusUnsubscribe = onSnapshot(userq, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    dispatch(getUsersList(data));
  });
  return userStatusUnsubscribe;
};

export const onArticlesData = (dispatch, getArticlesList) => {
  const groupq = query(
    collection(db, "articles"),
    orderBy("creationTime", "desc")
  );
  const groupStatusUnsubscribe = onSnapshot(groupq, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    dispatch(getArticlesList(data));
  });
  return groupStatusUnsubscribe;
};

export const onGroupsData = (dispatch, getGroupsList) => {
  const articleq = query(
    collection(db, "groups"),
    orderBy("creationTime", "desc")
  );
  const articlesStatusUnsubscribe = onSnapshot(articleq, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    dispatch(getGroupsList(data));
  });

  return articlesStatusUnsubscribe;
};

export const onNotification = (userId, setFunction) => {
  const q = query(
    collection(db, "users", userId, "notification"),
    orderBy("creationTime", "desc"),
    limit(10)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().docId.includes("m-")) {
        if (doc.data().sender === userId) return;
      }
      data.push(doc.data());
    });
    setFunction(data);
  });

  return unsubscribe;
};

export const listenOnGroupPost = (groupID, setRenderPost) => {
  const postQ = query(
    collection(db, "groups", groupID, "posts"),
    orderBy("creationTime", "desc")
  );
  const groupPostUnsubscribe = onSnapshot(postQ, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setRenderPost(data);
  });

  return groupPostUnsubscribe;
};

export const listenOnGroupMember = (groupID, setRenderMember) => {
  const memberQ = query(
    collection(db, "groups", groupID, "members"),
    orderBy("joinTime", "desc")
  );
  const memberUnsubscribe = onSnapshot(memberQ, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push(doc.data());
    });
    setRenderMember(data);
  });
  return memberUnsubscribe;
};
