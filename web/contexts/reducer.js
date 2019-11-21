import axios from 'axios';

export const initialState = {
  category: 0,
  page: 1,
  mails: null,
};

const CLICK_CATEGORY = 'CLICK_CATEGORY';
const CLICK_PAGE = 'CLICK_PAGE';

export const handleClickCategory = async category => {
  const URL = `/v1/mail?category=${category}`;
  const mails = await axios.get(URL);

  return {
    type: CLICK_CATEGORY,
    payload: {
      category,
      mails,
      page: 1,
    },
  };
};

export const handleClickPage = page => {
  return {
    type: CLICK_PAGE,
    payload: {
      page,
    },
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CLICK_CATEGORY:
      return { ...state, ...payload };
    case CLICK_PAGE:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
