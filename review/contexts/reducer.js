export const initialState = {
  category: 0,
  page: 1,
  mails: null,
  selected: { mail: null, no: 0 },
  paging: null,
};

const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const SET_CURRENT_MAIL = 'SET_CURRENT_MAIL';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';

export const handleCategoryClick = category => {
  return {
    type: CATEGORY_CLICK,
    payload: {
      category,
      page: 1,
      selected: { mail: null, no: 0 },
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

export const setSelected = (mail, no) => {
  return {
    type: SET_CURRENT_MAIL,
    payload: {
      selected: { mail, no },
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
    case SET_CURRENT_MAIL:
      return { ...state, ...payload };
    case CHANGE_MAILS_DATA:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
