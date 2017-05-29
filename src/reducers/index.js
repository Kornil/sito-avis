const initialState = {
  count: 1,
  auth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT': {
      const updatedState = Object.assign({}, state);
      updatedState.count += action.payload;
      return updatedState;
    }
    case 'DECREMENT': {
      const updatedState = Object.assign({}, state);
      updatedState.count -= action.payload;
      return updatedState;
    }
    case 'SAVE_AUTH': {
      const updatedState = Object.assign({}, state);
      updatedState.auth = action.payload;
      return updatedState;
    }
    default: return state;
  }
};

export default reducer;
