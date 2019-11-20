import { isInt } from 'validator';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const { MAX_SAFE_INTEGER } = Number;
const NUMBER_RAGE = { min: 1, max: MAX_SAFE_INTEGER };

const checkQuery = ({ category, page }) => {
  const errorFields = [];

  if (!isInt(category, NUMBER_RAGE)) {
    const errorField = new ErrorField('category', category, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (!isInt(page, NUMBER_RAGE)) {
    const errorField = new ErrorField('page', page, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export default checkQuery;
