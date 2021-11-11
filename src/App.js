import "./normalize.css";
import "./index.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import HomePage from "./pages/Home";
import GroupPage from "./pages/Groups";
import MilestoneEditor from "./pages/MileStones/MilestoneEditor";
import BuildGroups from "./pages/Groups/BuildGroups";
import MilestonesPage from "./pages/MileStones/MilestonesPage";
import MilestonePage from "./pages/MileStones";
import NotesPage from "./pages/Notes/NotesPage";
import ProfilePage from "./pages/Profile";
import NotesEditorPage from "./pages/Notes/NotesEditorPage";
import ProfileSetting from "./pages/Profile/ProfileSetting";
import GroupsPage from "./pages/Groups/GroupsPage";
import NotePage from "./pages/Notes";
import GroupMilestone from "./pages/MileStones/GroupMilestone";
import Bookshelf from "./pages/Bookshelf";
import { useEffect } from "react";
import * as firebase from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupsList,
  getUsersList,
  getUserData,
  getCategoryList,
  getBooksList,
  getArticlesList,
} from "./redux/actions";

import {
  query,
  collection,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

function App() {
  const d = useDispatch();

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      firebase
        .getOptionsName("categories")
        .then((res) => {
          //redux
          d(getCategoryList(res));
        })
        .catch((err) => console.log(err));

      firebase.subscribeToUser((currentUser) => {
        if (currentUser) {
          //redux
          d(getUserData(currentUser));
        } else {
          d(getUserData(null));
        }
      });

      //redux
      // firebase
      //   .getTotalDocList("users")
      //   .then((res) => d(getUsersList(res)))
      //   .catch((err) => console.log(err));

      // firebase
      //   .getTotalDocSortList("groups")
      //   .then((res) => d(getGroupsList(res)))
      //   .catch((err) => console.log(err));

      // firebase
      //   .getTotalDocSortList("articles")
      //   .then((res) => d(getArticlesList(res)))
      //   .catch((err) => console.log(err));

      // firebase
      //   .getTotalDocList("books")
      //   .then((res) => d(getBooksList(res)))
      //   .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    //usersList
    const userq = query(
      collection(firebase.db, "users"),
      orderBy("creationTime", "desc")
    );
    const userStatusUnsubscribe = onSnapshot(userq, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      d(getUsersList(data));
    });

    //articles
    const groupq = query(
      collection(firebase.db, "articles"),
      // where("public", "==", true),
      orderBy("creationTime", "desc")
    );
    const groupStatusUnsubscribe = onSnapshot(groupq, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      d(getArticlesList(data));
    });

    //groups
    const articleq = query(
      collection(firebase.db, "groups"),
      orderBy("creationTime", "desc")
    );
    const articlesStatusUnsubscribe = onSnapshot(articleq, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      d(getGroupsList(data));
    });

    // if (isMounted) {
    //   obsUserStatus();
    //   obsGroupStatus();
    //   obsArticlesStatus();
    // }

    return () => {
      // isMounted = false;
      userStatusUnsubscribe();
      groupStatusUnsubscribe();
      articlesStatusUnsubscribe();
    };
  }, []);

  return (
    <Layouts>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/milestones/post" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/milestone/:milestoneID/edit" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/groups" exact>
          <GroupsPage />
        </Route>
        <Route path="/groups/post" exact>
          <BuildGroups />
        </Route>
        <Route path="/group/:groupID" exact>
          <GroupPage />
        </Route>
        <Route path="/group/:groupID/milestones" exact>
          <GroupMilestone />
        </Route>
        <Route path="/group/:groupID/notes" exact>
          <NotesPage />
        </Route>
        <Route path="/group/:groupID/bookshelf" exact>
          <Bookshelf />
        </Route>
        <Route path="/group/:groupID/notes/:postID/post" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/group/:groupID/notes/:postID/edit" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/group/:groupID/notes/post" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/group/:groupID/notes/:postID">
          <NotePage />
        </Route>
        <Route path="/milestones" exact>
          <MilestonesPage />
        </Route>
        <Route path="/milestone/:milestoneID" exact>
          <MilestonePage />
        </Route>
        <Route path="/profile/:userID" exact>
          <ProfilePage />
        </Route>
        {/* <Route path="/profile/:userID" exact>
          <ProfilePage />
        </Route> */}
        <Route path="/profile/:userID/edit" exact>
          <ProfileSetting />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
