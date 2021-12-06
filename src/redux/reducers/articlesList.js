const articlesListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ARTICLESLIST":
      return action.payload;
    default:
      return state;
  }
};

export default articlesListReducer;
