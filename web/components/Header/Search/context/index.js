export const initialState = {
  subject: '',
  content: '',
  from: '',
  to: '',
  startDate: null,
  endDate: null,
};

export const CHANGE_EVENT = {
  DATE: {
    START_DATE: 'START_DATE',
    END_DATE: 'END_DATE',
  },
  INPUT: {
    SUBJECT: 'SUBJECT',
    CONTENT: 'CONTENT',
    TO: 'TO',
    FROM: 'FROM',
  },
};

export const RESET_CLICK = 'RESET_CLICK';

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_EVENT.INPUT.SUBJECT:
      return { ...state, subject: payload };
    case CHANGE_EVENT.INPUT.CONTENT:
      return { ...state, content: payload };
    case CHANGE_EVENT.INPUT.FROM:
      return { ...state, from: payload };
    case CHANGE_EVENT.INPUT.TO:
      return { ...state, to: payload };
    case CHANGE_EVENT.DATE.START_DATE:
      return { ...state, startDate: payload };
    case CHANGE_EVENT.DATE.END_DATE:
      return { ...state, endDate: payload };
    case RESET_CLICK:
      return { ...initialState };
    default:
      return { ...state };
  }
};
