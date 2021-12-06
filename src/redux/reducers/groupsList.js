const groupsListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_GROUPSLIST":
      return action.payload;
    default:
      return state;
  }
};

export default groupsListReducer;
