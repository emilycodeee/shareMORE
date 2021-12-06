const usersListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERSLIST":
      return action.payload;
    default:
      return state;
  }
};

export default usersListReducer;
