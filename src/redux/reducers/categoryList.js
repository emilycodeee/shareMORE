//selected from Groups
const categoryListReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_CATEGORY":
      return (state = action.payload);
    default:
      return state;
  }
};

export default categoryListReducer;
