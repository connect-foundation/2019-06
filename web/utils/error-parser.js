const isContainedErrorCode = error => {
  const { response } = error;
  return response && response.data && response.data.errorCode;
};

const errorParser = error => {
  if (!isContainedErrorCode(error)) {
    return { status: 500, message: error.message };
  }

  const { errorCode, fieldErrors } = error.response.data;

  let errorMessage = errorCode.message;
  if (!fieldErrors) {
    return errorMessage;
  }

  errorMessage = fieldErrors.reduce(
    (prev, next) => (prev += `\n${next.field} : ${next.reason}`),
    errorMessage,
  );

  return { status: errorCode.status, message: errorMessage };
};

export { errorParser };
