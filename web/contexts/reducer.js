const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';
const CHANGE_CATEGORIES_DATA = 'CHANGE_CATEGORIES_DATA';
const MAIL_CLICK = 'MAIL_CLICK';
const SET_VIEW = 'SET_VIEW';
const SORT_SELECT = 'SORT_SELECT';
const SET_MESSAGE = 'SET_MESSAGE';
const MAIL_CHECK = 'MAIL_CHECK';
const SELECT_ALL_CHANGE = 'SELECT_ALL_CHANGE';
const INIT_CHECKER_IN_TOOLS = 'INIT_CHECKER_IN_TOOLS';
const SET_SNACKBAR_STATE = 'SET_SNACKBAR_STATE';
const SET_MAIL = 'SET_MAIL';
const INIT_STATE = 'INIT_STATE';

export const initialState = {
  categories: null,
  category: 0,
  page: 1,
  mails: null,
  mail: null,
  paging: null,
  view: null,
  sort: 'datedesc',
  message: '',
  allMailCheckInTools: false,
  categoryNoByName: null,
  categoryNameByNo: null,
  snackbarOpen: false,
  snackbarVariant: 'error',
  snackbarContent: '',
  snackbarClose: null,
};

export const handleSnackbarState = payload => {
  return {
    type: SET_SNACKBAR_STATE,
    payload,
  };
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

export const initCheckerInTools = () => {
  return {
    type: INIT_CHECKER_IN_TOOLS,
    payload: {
      allMailCheckInTools: false,
    },
  };
};

export const handleCheckAllMails = (allMailCheckInTools, mails) => {
  mails.map(mail => (mail.selected = !allMailCheckInTools));
  return {
    type: SELECT_ALL_CHANGE,
    payload: { mails, allMailCheckInTools: !allMailCheckInTools },
  };
};

export const handleCategoryClick = no => {
  return {
    type: CATEGORY_CLICK,
    payload: {
      category: no,
      page: 1,
      sort: 'datedesc',
    },
  };
};

export const handleCategoriesChange = ({ categories }) => {
  const categoryNoByName = categories.reduce((total, category) => {
    total[category.name] = category.no;
    return total;
  }, {});

  const categoryNameByNo = categories.reduce((total, category) => {
    total[category.no] = category.name;
    return total;
  }, {});

  return {
    type: CHANGE_CATEGORIES_DATA,
    payload: {
      categories,
      categoryNoByName,
      categoryNameByNo,
    },
  };
};

export const handleMailsChange = ({ mails, paging }) => {
  if (mails) {
    mails.map(mail => (mail.selected = false));
  }
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
  if (mails.every(mail => mail.selected)) {
    return {
      type: MAIL_CHECK,
      payload: {
        mails,
        allMailCheckInTools: true,
      },
    };
  }
  return {
    type: MAIL_CHECK,
    payload: {
      mails,
      allMailCheckInTools: false,
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

export const handleMailClick = mail => {
  return {
    type: MAIL_CLICK,
    payload: {
      mail,
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

export const setMail = mail => {
  return {
    type: SET_MAIL,
    payload: {
      mail,
    },
  };
};

export const initState = () => {
  return {
    type: INIT_STATE,
  };
};

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case INIT_STATE:
      return { ...initialState };
    case SET_SNACKBAR_STATE:
      return { ...state, ...payload };
    case INIT_CHECKER_IN_TOOLS:
      return { ...state, ...payload };
    case CATEGORY_CLICK:
      return { ...state, ...payload };
    case SELECT_ALL_CHANGE:
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
    case SET_MAIL:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
