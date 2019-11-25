const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';
const MAIL_CLICK = 'MAIL_CLICK';
const SET_VIEW = 'SET_VIEW';

export const initialState = {
  category: 0,
  page: 1,
  mails: null,
  paging: null,
  view: null,
};

export const handleCategoryClick = (category, view) => {
  return {
    type: CATEGORY_CLICK,
    payload: {
      category: category.no,
      page: 1,
      view,
    },
  };
};

export const handleMailsChange = ({ mails, paging }) => {
  return {
    type: CHANGE_MAILS_DATA,
    payload: {
      mails,
      paging,
    },
  };
};

export const handlePageNumberClick = page => {
  return {
    type: PAGE_NUMBER_CLICK,
    payload: {
      page,
    },
  };
};

export const handleMailClick = (mail, view) => {
  return {
    type: MAIL_CLICK,
    payload: {
      mail,
      view,
    },
  };
};

export const setView = view => {
  return {
    type: SET_VIEW,
    payload: {
      view,
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
    default:
      return { ...state };
  }
};
