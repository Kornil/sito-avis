export const increment = value => (dispatch) => {
  dispatch({ type: 'INCREMENT', payload: value });
};

export default increment;
