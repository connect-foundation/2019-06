const CATEGORY_CLICK = 'CATEGORY_CLICK';
const PAGE_NUMBER_CLICK = 'PAGE_NUMBER_CLICK';
const CHANGE_MAILS_DATA = 'CHANGE_MAILS_DATA';
const CHANGE_CATEGORIES_DATA = 'CHANGE_CATEGORIES_DATA';
const SORT_SELECT = 'SORT_SELECT';
const SET_MESSAGE = 'SET_MESSAGE';
const MAIL_CHECK = 'MAIL_CHECK';
const SELECT_ALL_CHANGE = 'SELECT_ALL_CHANGE';
const INIT_CHECKER_IN_TOOLS = 'INIT_CHECKER_IN_TOOLS';
const SET_SNACKBAR_STATE = 'SET_SNACKBAR_STATE';
const SET_MAIL_TO_REPLY = 'SET_MAIL_TO_REPLY';
const INIT_STATE = 'INIT_STATE';

export const initialState = {
  categories: null,
  category: 0,
  page: 1,
  mails: null,
  mailToReply: null,
  paging: null,
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
  mails.forEach(mail => (mail.selected = !allMailCheckInTools));
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
    mails.forEach((mail, i) => {
      mail.selected = false;
      mail.index = i;
    });
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

export const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: {
      message,
    },
  };
};

export const setMailToReply = mailToReply => {
  return {
    type: SET_MAIL_TO_REPLY,
    payload: {
      mailToReply,
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
    case CHANGE_MAILS_DATA:
      return { ...state, ...payload };
    case SORT_SELECT:
      return { ...state, ...payload };
    case SET_MESSAGE:
      return { ...state, ...payload };
    case CHANGE_CATEGORIES_DATA:
      return { ...state, ...payload };
    case SET_MAIL_TO_REPLY:
      return { ...state, ...payload };
    default:
      return { ...state };
  }
};
