import ERROR_CODE from './error-code';

const parseValidationError = error => {
  const { name, errors } = error;

  switch (name) {
    case 'SequelizeValidationError':
      return ERROR_CODE.INVALID_INPUT_VALUE;
    case 'SequelizeUniqueConstraintError': {
      const { path } = errors[0];
      if (path === 'user_id') return ERROR_CODE.ID_DUPLICATION;
      if (path === 'sub_email') return ERROR_CODE.SUBEMAIL_DUPLICATION;
      break;
    }
    default:
      return ERROR_CODE.INTERNAL_SERVER_ERROR;
  }
};

export { parseValidationError };
