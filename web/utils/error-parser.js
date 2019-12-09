import {
  ERROR_ID_AND_SUB_EMAIL_DUPLICATION,
  ERROR_ID_DUPLICATION,
  ERROR_SUB_EMAIL_DUPLICATION,
} from './error-message';

const isContainedErrorCode = error => {
  const { response } = error;
  return response && response.data && response.data.errorCode;
};

const registerErrorMessageParser = errorMsg => {
  const errorMsgs = {};

  if (errorMsg === ERROR_ID_AND_SUB_EMAIL_DUPLICATION) {
    errorMsgs.id = ERROR_ID_DUPLICATION;
    errorMsgs.email = ERROR_SUB_EMAIL_DUPLICATION;
  } else if (errorMsg === ERROR_ID_DUPLICATION) {
    errorMsgs.id = ERROR_ID_DUPLICATION;
  } else if (errorMsg === ERROR_SUB_EMAIL_DUPLICATION) {
    errorMsgs.email = ERROR_SUB_EMAIL_DUPLICATION;
  } else {
    return errorMsg;
  }

  return errorMsgs;
};

const errorParser = error => {
  if (!isContainedErrorCode(error)) {
    return { status: 500, message: error.message };
  }

  const { errorCode, fieldErrors } = error.response.data;

  const { status, message } = errorCode;
  if (status !== 400) {
    return { status, message };
  }

  const errorMessage = fieldErrors.reduce((prev, next) => {
    const line = `${next.field} : ${next.reason}\n`;
    return prev + line;
  }, '');

  return { status: 400, message: errorMessage };
};

export { isContainedErrorCode, errorParser, registerErrorMessageParser };
