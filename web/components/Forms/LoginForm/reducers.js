import { RESET, SET_ID_ERROR_MSG, SET_PASSWORD_ERROR_MSG, SET_LOGIN_ERROR_MSG } from './actions';

const initialState = {
  idErrorMsg: '',
  passwordErrorMsg: '',
  loginErrorMsg: '',
};

const errorReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case RESET: {
      return { ...initialState };
    }
    case SET_ID_ERROR_MSG: {
      return { ...state, idErrorMsg: payload };
    }
    case SET_PASSWORD_ERROR_MSG: {
      return { ...state, passwordErrorMsg: payload };
    }
    case SET_LOGIN_ERROR_MSG: {
      return { ...state, loginErrorMsg: payload };
    }
    default: {
      return { ...initialState };
    }
  }
};

export { initialState, errorReducer };
