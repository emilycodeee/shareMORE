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

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as firebase from "./utils/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [categoriesName, setCategoriesName] = useState([]);
  useEffect(() => {
    firebase.getOptionsName("categories", setCategoriesName);
    firebase.subscribeToUser((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    firebase.getTotalDocList(setUserList, "users");
    firebase.getTotalDocList(setGroupList, "groups");
  }, []);
  console.log("❣", userList);
  console.log("❣user", user);
  console.log("❣user.email", user && user.email);

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
        <Route path="/milestones" exact>
          <MilestonesPage user={user} userList={userList} />
        </Route>
        <Route path="/milestone/:milestoneID" exact>
          <MilestonePage user={user} userList={userList} />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
