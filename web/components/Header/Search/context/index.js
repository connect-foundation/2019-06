export const initialState = {
  title: '',
  content: '',
  from: '',
  to: '',
  startDate: '',
  endDate: Date.now(),
};

export const BLUR_EVENTS = {
  TITLE: 'BLUR_TITLE',
  CONTENT: 'BLUR_CONTENT',
  FROM: 'BLUR_FROM',
  TO: 'BLUR_TO',
  START_DATE: 'BLUR_START_DATE',
  END_DATE: 'BLUR_END_DATE',
};

export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case BLUR_EVENTS.TITLE:
      return { ...state, title: payload };
    case BLUR_EVENTS.CONTENT:
      return { ...state, content: payload };
    case BLUR_EVENTS.FROM:
      return { ...state, from: payload };
    case BLUR_EVENTS.TO:
      return { ...state, to: payload };
    case BLUR_EVENTS.START_DATE:
      return { ...state, startDate: payload };
    case BLUR_EVENTS.END_DATE:
      return { ...state, endDate: payload };
    default:
      return { ...state };
  }
};
