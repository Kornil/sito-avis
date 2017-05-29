export const increment = value => (dispatch) => {
  dispatch({ type: 'INCREMENT', payload: value });
};

export const decrement = value => (dispatch) => {
  dispatch({ type: 'DECREMENT', payload: value });
};

export const saveAuth = () => (dispatch) => {
  dispatch({ type: 'SAVE_AUTH', payload: true})
};
