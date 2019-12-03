import { initialState } from './initial-state';
import * as ACTYPE from '../../../WriteMail/ContextProvider/reducer/action-type';

export const writeMailToMeReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTYPE.UPDATE_SUBJECT: {
      return { ...state, ...payload };
    }
    case ACTYPE.UPDATE_TEXT: {
      return { ...state, ...payload };
    }
    case ACTYPE.UPDATE_FILES: {
      return { ...state, ...payload };
    }
    case ACTYPE.UPDATE_INIT: {
      return { ...initialState };
    }
    case ACTYPE.UPDATE_DATE: {
      return { ...state, ...payload };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};
