const getErrorMessage = err => {
  const {
    response: {
      data: {
        errorCode: { message },
      },
    },
  } = err;

  return message;
};

export { getErrorMessage };
