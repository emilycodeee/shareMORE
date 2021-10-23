import "./normalize.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import HomePage from "./pages/Home";
import GroupPage from "./pages/Groups";
import MilestoneEditor from "./pages/MileStone/MilestoneEditor";
import BuildGroups from "./pages/Groups/BuildGroups";

import { useEffect, useState } from "react";
import styled from "styled-components";
import * as firebase from "./utils/firebase";

function App() {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState([]);
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
    firebase.getTotalUserList(setUserList, "users");
  }, []);
  console.log("❣", userList);
  console.log("❣user", user);
  console.log("❣user.email", user && user.email);

  return (
    <Layouts user={user}>
      <Switch>
        <Route path="/" exact>
          <HomePage user={user} categoriesName={categoriesName} />
        </Route>
        <Route path="/milestone/post" exact>
          <MilestoneEditor />
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
      </Switch>
    </Layouts>
  );
}

export default App;
