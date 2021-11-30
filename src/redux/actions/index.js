export const getGroupsList = (groupsList) => {
  return {
    type: "GET_GROUPSLIST",
    payload: groupsList,
  };
};

export const getUsersList = (usersList) => {
  return {
    type: "GET_USERSLIST",
    payload: usersList,
  };
};

export const getUserData = (userData) => {
  return {
    type: "GET_USER_DATA",
    payload: userData,
  };
};

export const getCategoryList = (categoryList) => {
  return {
    type: "GET_CATEGORY",
    payload: categoryList,
  };
};

export const getArticlesList = (articlesList) => {
  return {
    type: "GET_ARTICLESLIST",
    payload: articlesList,
  };
};
