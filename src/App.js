import "./normalize.css";
import "./index.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Layouts from "./components/layouts/Layouts";
import HomePage from "./pages/Home";
import MilestoneEditor from "./pages/MileStones/MilestoneEditor";
import BuildGroups from "./pages/Groups/BuildGroups";
import MilestonesPage from "./pages/MileStones/MilestonesPage";
import MilestonePage from "./pages/MileStones";
import ProfilePage from "./pages/Profile";
import NotesEditorPage from "./pages/Notes/NotesEditorPage";
import ProfileSetting from "./pages/Profile/ProfileSetting";
import GroupsPage from "./pages/Groups/GroupsPage";
import NotePage from "./pages/Notes";
import NotFound from "./components/NotFound";
import { useEffect } from "react";
import {
  getOptionsName,
  subscribeToUser,
  onUsersData,
  onArticlesData,
  onGroupsData,
} from "./utils/firebase";
import { useDispatch } from "react-redux";

import {
  getGroupsList,
  getUsersList,
  getUserData,
  getCategoryList,
  getArticlesList,
} from "./redux/actions";

import GroupHeader from "./pages/Groups/GroupHeader";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getOptionsName("categories")
        .then((res) => {
          dispatch(getCategoryList(res));
        })
        .catch((err) => console.log(err));

      subscribeToUser((currentUser) => {
        dispatch(getUserData(currentUser));
      });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const userStatusUnsubscribe = onUsersData(dispatch, getUsersList);
    const groupStatusUnsubscribe = onArticlesData(dispatch, getArticlesList);
    const articlesStatusUnsubscribe = onGroupsData(dispatch, getGroupsList);
    return () => {
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
        <Route path="/groups" exact>
          <GroupsPage />
        </Route>
        <Route path="/group/:groupID/new/notes" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/group/:groupID/notes/:postID" exact>
          <NotePage />
        </Route>
        <Route path="/article/:milestoneID" exact>
          <MilestonePage />
        </Route>
        <Route path="/articles" exact>
          <MilestonesPage />
        </Route>
        <Route path="/articles/post" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/groups/post" exact>
          <BuildGroups />
        </Route>
        <Route path="/profile/:userID" exact>
          <ProfilePage />
        </Route>
        <Route path="/article/:milestoneID/edit" exact>
          <MilestoneEditor />
        </Route>
        <Route path="/group/:groupID/notes/:postID/post" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/group/:groupID/notes/:postID/edit" exact>
          <NotesEditorPage />
        </Route>
        <Route path="/profile/:userID/edit" exact>
          <ProfileSetting />
        </Route>
        <Route path="/group/:groupID">
          <GroupHeader />
        </Route>
        <Route path="/404">
          <NotFound />
        </Route>
        <Route path="">
          <NotFound />
        </Route>
      </Switch>
    </Layouts>
  );
}

export default App;
