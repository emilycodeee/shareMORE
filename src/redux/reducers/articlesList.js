const articlesListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ARTICLESLIST":
      return (state = action.payload);
    default:
      return state;
  }
};

export default articlesListReducer;
