const isContainedErrorCode = error => {
  const { response } = error;
  return response && response.data && response.data.errorCode;
};

const fieldErrorsParser = fieldErrors => {
  const errorMsgs = {};

  fieldErrors.forEach(error => {
    errorMsgs[error.field] = error.reason;
  });

  return errorMsgs;
};

const errorParser = error => {
  if (!isContainedErrorCode(error)) {
    return { status: 500, message: error.message };
  }

  const { errorCode, fieldErrors } = error.response.data;

  const { status, message } = errorCode;
  if (status === 409) {
    return { status, message, fieldErrors: fieldErrorsParser(fieldErrors) };
  }

  if (status !== 400) {
    return { status, message };
  }

  const errorMessage = fieldErrors.reduce((prev, next) => {
    const line = `${next.field} : ${next.reason}\n`;
    return prev + line;
  }, '');

  return { status: 400, message: errorMessage };
};

export { isContainedErrorCode, errorParser };
