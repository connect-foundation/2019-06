import { isInt } from 'validator';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const { MAX_SAFE_INTEGER } = Number;
const MAIL_TEMPLATE_NO_RANGE = { min: 1, max: MAX_SAFE_INTEGER };

const validateNo = no => {
  if (!no) {
    const errorField = new ErrorField('no', no, 'no는 반드시 있어야 하는 값입니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }

  if (!isInt(no, MAIL_TEMPLATE_NO_RANGE)) {
    const errorField = new ErrorField('no', no, '올바르지 않는 값입니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }
};

export default validateNo;
