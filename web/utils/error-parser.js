const errorParser = error => {
  const { errorCode, fieldErrors } = error.response.data;
  let errorMessage = errorCode.message;
  if (!fieldErrors) {
    return errorMessage;
  }

  errorMessage = fieldErrors.reduce(
    (prev, next) => (prev += `\n${error.field} : ${error.reason}`),
    errorMessage,
  );

  return errorMessage;
};

export { errorParser };
