export const initialState = {
  subject: '',
  content: '',
  from: '',
  to: '',
  startDate: '',
  endDate: '',
};

export const BLUR_EVENTS = {
  SUBJECT: 'BLUR_SUBJECT',
  CONTENT: 'BLUR_CONTENT',
  FROM: 'BLUR_FROM',
  TO: 'BLUR_TO',
};

export const DATE_CHANGES = {
  START_DATE: 'CHANGE_START_DATE',
  END_DATE: 'CHANGE_END_DATE',
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLUR_EVENTS.SUBJECT:
      return { ...state, subject: payload };
    case BLUR_EVENTS.CONTENT:
      return { ...state, content: payload };
    case BLUR_EVENTS.FROM:
      return { ...state, from: payload };
    case BLUR_EVENTS.TO:
      return { ...state, to: payload };
    case DATE_CHANGES.START_DATE:
      return { ...state, startDate: payload };
    case DATE_CHANGES.END_DATE:
      return { ...state, endDate: payload };
    default:
      return { ...state };
  }
};
