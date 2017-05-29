export const saveAuth = () => (dispatch) => {
  dispatch({ type: 'SAVE_AUTH', payload: true });
};
