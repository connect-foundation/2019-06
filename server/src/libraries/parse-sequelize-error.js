import ERROR_CODE from './error-code';

const parseValidationError = error => {
  const { name, errors } = error;

  let returnValue;
  switch (name) {
    case 'SequelizeValidationError':
      returnValue = ERROR_CODE.INVALID_INPUT_VALUE;
      break;
    case 'SequelizeUniqueConstraintError': {
      const { path } = errors[0];
      if (path === 'user_id') {
        returnValue = ERROR_CODE.ID_DUPLICATION;
      }

      if (path === 'sub_email') {
        returnValue = ERROR_CODE.EMAIL_DUPLICATION;
      }

      break;
    }
    default:
      returnValue = ERROR_CODE.INTERNAL_SERVER_ERROR;
  }
  return returnValue;
};
export { parseValidationError };
