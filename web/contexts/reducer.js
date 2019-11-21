import axios from 'axios';

export const initialState = {
  category: 0,
  page: 1,
  mails: null,
};

const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';

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

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CATEGORY_CLICK:
      return { ...state, ...payload };
    case PAGE_NUMBER_CLICK:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
