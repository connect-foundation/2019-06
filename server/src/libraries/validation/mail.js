import { isInt } from 'validator';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const { MAX_SAFE_INTEGER } = Number;
const PAGE_NUMBER_RANGE = { min: 1, max: MAX_SAFE_INTEGER };
const CATEGORY_NUMBER_RANGE = { min: 0, max: MAX_SAFE_INTEGER };

const SORTING_CRITERIA = {
  datedesc: true,
  dateasc: true,
  subjectdesc: true,
  subjectasc: true,
  fromdesc: true,
  fromasc: true,
};

const checkQuery = ({ category, page, sort }) => {
  const errorFields = [];

  if (category && !isInt(category, CATEGORY_NUMBER_RANGE)) {
    const errorField = new ErrorField('category', category, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (page && !isInt(page, PAGE_NUMBER_RANGE)) {
    const errorField = new ErrorField('page', page, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (sort && !SORTING_CRITERIA[sort]) {
    const errorField = new ErrorField('sort', sort, '유효하지 않은 정렬기준 입니다.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export default checkQuery;
