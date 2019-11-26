const isContainErrorCode = error => {
  const { response } = error;
  return response && response.data && response.data.errorCode;
};

const errorParser = error => {
  if (!isContainErrorCode(error)) {
    return { status: 500, message: error.message };
  }

  const { errorCode, fieldErrors } = error.response.data;

  let errorMessage = errorCode.message;
  if (!fieldErrors) {
    return errorMessage;
  }

  errorMessage = fieldErrors.reduce(
    (prev, next) => (prev += `\n${error.field} : ${error.reason}`),
    errorMessage,
  );

  return { status: errorCode.status, message: errorMessage };
};

export { errorParser };
