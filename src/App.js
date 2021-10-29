import "./normalize.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import HomePage from "./pages/Home";
import GroupPage from "./pages/Groups";
import MilestoneEditor from "./pages/MileStones/MilestoneEditor";
import BuildGroups from "./pages/Groups/BuildGroups";
import MilestonesPage from "./pages/MileStones/MilestonesPage";
import MilestonePage from "./pages/MileStones";
import NotesPage from "./pages/Groups/NotesPage";
import MyProfilePage from "./pages/Profile/MyProfile";
import ProfilePage from "./pages/Profile";
import NotesEditorPage from "./pages/Groups/NotesEditorPage";
import ChatRoom from "./pages/ChatRoom";

import { useEffect } from "react";
import * as firebase from "./utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getGroupsList,
  getUsersList,
  getUserData,
  getCategoryList,
} from "./redux/actions";

function App() {
  const d = useDispatch();
  const userData = useSelector((state) => state.userData);

  useEffect(() => {
    // if (userData) return;
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
    firebase
      .getTotalDocList("users")
      .then((res) => d(getUsersList(res)))
      .catch((err) => console.log(err));

    firebase
      .getTotalDocList("groups")
      .then((res) => d(getGroupsList(res)))
      .catch((err) => console.log(err));
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

        <Route path="/groups/post" exact>
          <BuildGroups />
        </Route>
        <Route path="/group/:groupID" exact>
          <GroupPage />
        </Route>
        <Route path="/group/:groupID/notes" exact>
          <NotesPage />
        </Route>
        <Route path="/group/:groupID/notes/:postID/post" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/milestones" exact>
          <MilestonesPage />
        </Route>
        <Route path="/milestone/:milestoneID" exact>
          <MilestonePage />
        </Route>
        <Route path="/myprofile" exact>
          <MyProfilePage />
        </Route>
        <Route path="/messages/:sendTo" exact>
          <ChatRoom />
        </Route>
        <Route path="/profile/:userID" exact>
          <ProfilePage />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
