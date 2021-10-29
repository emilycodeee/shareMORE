import groupsListReducer from "./groupsList";
import usersListReducer from "./usersList";
import userDataReducer from "./userData";
import categoryListReducer from "./categoryList";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  groupsList: groupsListReducer,
  userData: userDataReducer,
  usersList: usersListReducer,
  categoryList: categoryListReducer,
});

export default rootReducers;
