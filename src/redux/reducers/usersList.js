const usersListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERSLIST":
      return state.concat(action.payload);
    default:
      return state;
  }
};

export default usersListReducer;
