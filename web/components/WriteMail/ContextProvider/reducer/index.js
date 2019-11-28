import { initialState } from './initial-state';
import * as ACTYPE from './action-type';

export const wmReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTYPE.UPDATE_RECEIVERS: {
      return { ...state, ...payload };
    }
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
    case ACTYPE.RESERVATION_MODAL_ON: {
      return { ...state, reservationModalOn: true };
    }
    case ACTYPE.RESERVATION_MODAL_OFF: {
      return { ...state, reservationModalOn: false };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};
