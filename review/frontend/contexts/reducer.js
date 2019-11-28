const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';
const CHANGE_CATEGORIES_DATA = 'CHANGE_CATEGORIES_DATA';
const MAIL_CLICK = 'MAIL_CLICK';
const SET_VIEW = 'SET_VIEW';
const SORT_SELECT = 'SORT_SELECT';
const SET_MESSAGE = 'SET_MESSAGE';

export const initialState = {
  categories: null,
  category: 0,
  page: 1,
  mails: null,
  paging: null,
  view: null,
  sort: 'datedesc',
  message: '',
};

// ...

export const setView = view => {
  return {
    type: SET_VIEW,
    payload: {
      view,
    },
  };
};

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: {
      message,
    },
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CATEGORY_CLICK:
      return { ...state, ...payload };
    case PAGE_NUMBER_CLICK:
      return { ...state, ...payload };
    case MAIL_CLICK:
      return { ...state, ...payload };
    case CHANGE_MAILS_DATA:
      return { ...state, ...payload };
    case SET_VIEW:
      return { ...state, ...payload };
    case SORT_SELECT:
      return { ...state, ...payload };
    case SET_MESSAGE:
      return { ...state, ...payload };
    case CHANGE_CATEGORIES_DATA:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
