const dataReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_DATA_ASSET":
        return state=action.data
      default:
        return state;
    }
  };
  
  export default dataReducer;
  