import axios from 'axios';

export const initialState = {
  category: 0,
  page: 1,
  mails: null,
  selected: null,
};

const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const SET_CURRENT_MAIL = 'SET_CURRENT_MAIL';
const SET_MAILS = 'SET_MAILS';

export const handleCategoryClick = async category => {
  const URL = `/v1/mail?category=${category}`;
  const mails = await axios.get(URL);

  return {
    type: CATEGORY_CLICK,
    payload: {
      category,
      mails,
      page: 1,
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

export const setMails = mails => {
  return {
    type: SET_MAILS,
    payload: {
      mails,
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
    case SET_MAILS:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
