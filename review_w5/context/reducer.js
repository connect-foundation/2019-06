const SET_SNACKBAR_STATE = 'SET_SNACKBAR_STATE';
// ...

export const initialState = {
  // ...
  snackbarOpen: false,
  snackbarVariant: 'error',
  snackbarContent: '',
  snackbarClose: null,
};

export const handleSnackbarState = payload => {
  return {
    type: SET_SNACKBAR_STATE,
    payload,
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_SNACKBAR_STATE:
      return { ...state, ...payload };
    // ...
    default:
      return { ...state };
  }
};
