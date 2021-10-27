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

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as firebase from "./utils/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  useEffect(() => {
    firebase
      .getOptionsName("categories")
      .then((res) => {
        setCategoriesName(res);
      })
      .catch((err) => console.log(err));
    firebase.subscribeToUser((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    firebase
      .getTotalDocList("users")
      .then((res) => setUserList(res))
      .catch((err) => console.log(err));
    firebase
      .getTotalDocList("groups")
      .then((res) => setGroupList(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layouts user={user}>
      <Switch>
        <Route path="/" exact>
          <HomePage
            user={user}
            categoriesName={categoriesName}
            userList={userList}
            groupList={groupList}
          />
        </Route>
        <Route path="/milestones/post" exact>
          <MilestoneEditor user={user} groupList={groupList} />
        </Route>
        <Route path="/show" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/groups/post" exact>
          <BuildGroups user={user} categoriesName={categoriesName} />
        </Route>
        <Route path="/group/:groupID" exact>
          <GroupPage user={user} userList={userList} />
        </Route>
        <Route path="/group/:groupID/notes" exact>
          <NotesPage user={user} userList={userList} />
        </Route>
        <Route path="/group/:groupID/notes/:postID/post" exact>
          <NotesEditorPage user={user} userList={userList} />
        </Route>
        <Route path="/milestones" exact>
          <MilestonesPage user={user} userList={userList} />
        </Route>
        <Route path="/milestone/:milestoneID" exact>
          <MilestonePage user={user} userList={userList} />
        </Route>
        <Route path="/myprofile" exact>
          <MyProfilePage user={user} userList={userList} />
        </Route>

        <Route path="/messages/:sendTo">
          <ChatRoom user={user} userList={userList} />
        </Route>
        <Route path="/profile/:userID" exact>
          <ProfilePage user={user} userList={userList} />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
