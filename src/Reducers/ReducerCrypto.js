const dataReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_DATA_SYMBOL":
      return state.concat([action.data]);
    case "SET_DATA_TRADE":
      return state.map((data) => {
        if (data.symbol === action.data.symbol) {
          return action.data;
        } else {
          return data;
        }
      });
    case "DELETE_ALL":
      return state = action.data
    default:
      return state;
  }
};

export default dataReducer;
