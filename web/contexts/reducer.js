const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';
const CHANGE_CATEGORIES_DATA = 'CHANGE_CATEGORIES_DATA';
const MAIL_CLICK = 'MAIL_CLICK';
const SET_VIEW = 'SET_VIEW';
const SORT_SELECT = 'SORT_SELECT';
const SET_MESSAGE = 'SET_MESSAGE';
const MAIL_CHECK = 'MAIL_CHECK';

export const initialState = {
  categories: null,
  category: 0,
  page: 1,
  mails: null,
  paging: null,
  view: null,
  sort: 'datedesc',
  message: '',
  checkInTools: false,
};

export const handleSortSelect = sortType => {
  return {
    type: SORT_SELECT,
    payload: {
      page: 1,
      sort: sortType,
    },
  };
};

export const handleCategoryClick = (no, view) => {
  return {
    type: CATEGORY_CLICK,
    payload: {
      category: no,
      page: 1,
      view,
    },
  };
};

export const handleCategoriesChange = ({ categories }) => {
  return {
    type: CHANGE_CATEGORIES_DATA,
    payload: {
      categories,
    },
  };
};

export const handleMailsChange = ({ mails, paging }) => {
  mails.map(mail => (mail.selected = false));
  return {
    type: CHANGE_MAILS_DATA,
    payload: {
      mails,
      paging,
    },
  };
};

export const handleMailChecked = ({ mails, index }) => {
  mails[index].selected = !mails[index].selected;
  return {
    type: MAIL_CHECK,
    payload: {
      mails,
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
    case MAIL_CHECK:
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
