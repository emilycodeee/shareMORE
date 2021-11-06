const booksListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_BOOKSLIST":
      return (state = action.payload);
    default:
      return state;
  }
};

export default booksListReducer;
