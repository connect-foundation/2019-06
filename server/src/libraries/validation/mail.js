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

const validateNos = nos => {
  if (!nos) {
    const errorField = new ErrorField('nos', nos, 'nos는 반드시 있어야 하는 값입니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }

  if (!Array.isArray(nos)) {
    const errorField = new ErrorField('nos', nos, 'nos는 배열이어야합니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }

  if (nos.some(no => typeof no !== 'number' || no < 1 || no > MAX_SAFE_INTEGER)) {
    const errorField = new ErrorField('no', nos, 'nos에 유효하지 않는 값이 포함되어 있습니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }
};

const validateProps = props => {
  if (!props) {
    const errorField = new ErrorField('props', props, '올바르지 않는 값입니다.');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }
  const { category_no, is_important, is_read } = props;
  const errorFields = [];

  if (category_no && typeof category_no !== 'number') {
    const errorField = new ErrorField('category_no', category_no, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (is_important && typeof is_important !== 'boolean') {
    const errorField = new ErrorField('is_important', is_important, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (is_read && typeof is_read !== 'boolean') {
    const errorField = new ErrorField('is_read', is_read, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

const checkPageAndSortAndPerPageNum = ({ page, sort, perPageNum }, errorFields) => {
  if (page && !isInt(page, PAGE_NUMBER_RANGE)) {
    const errorField = new ErrorField('page', page, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (perPageNum && !isInt(perPageNum, PAGE_NUMBER_RANGE)) {
    const errorField = new ErrorField('perPageNum', perPageNum, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  if (sort && !SORTING_CRITERIA[sort]) {
    const errorField = new ErrorField('sort', sort, '유효하지 않은 정렬기준 입니다.');
    errorFields.push(errorField);
  }
  return errorFields;
};

const checkQuery = ({ category, page, perPageNum, sort }) => {
  const errorFields = [];

  if (category && !isInt(category, CATEGORY_NUMBER_RANGE)) {
    const errorField = new ErrorField('category', category, '유효하지 않은 값입니다.');
    errorFields.push(errorField);
  }

  checkPageAndSortAndPerPageNum({ page, sort, perPageNum }, errorFields);

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

const isValidYYYYMMDDFormat = format => {
  const splitedDate = format.split('/');

  if (splitedDate.length !== 3) {
    return false;
  }
  const [year, month, date] = [...splitedDate];

  if (!isInt(year, { min: 1000, max: 9999 })) {
    return false;
  }

  if (!isInt(month, { min: 1, max: 12 })) {
    return false;
  }

  if (!isInt(date, { min: 1, max: 31 })) {
    return false;
  }

  return true;
};

const checkAdvancedSearchQuery = ({
  page,
  sort,
  from,
  to,
  content,
  subject,
  startDate,
  endDate,
  perPageNum,
}) => {
  const errorFields = [];
  checkPageAndSortAndPerPageNum({ page, sort, perPageNum }, errorFields);

  const lengthCheckTargets = {
    from,
    to,
    content,
    subject,
  };

  for (const [key, value] of Object.entries(lengthCheckTargets)) {
    if (value && value.length > 100) {
      const errorField = new ErrorField(key, value, `${key}의 길이는 100이상일수 없습니다.`);
      errorFields.push(errorField);
    }
  }

  const dateCheckTargets = {
    startDate,
    endDate,
  };

  for (const [key, value] of Object.entries(dateCheckTargets)) {
    if (value && !isValidYYYYMMDDFormat(value)) {
      const errorField = new ErrorField(key, value, '유효하지 않은 날짜입니다.');
      errorFields.push(errorField);
    }
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }
  return true;
};

const checkGeneralSearchQuery = ({ page, sort, perPageNum, searchWord }) => {
  const errorFields = [];

  checkPageAndSortAndPerPageNum({ page, sort, perPageNum }, errorFields);

  if (!searchWord || !searchWord.trim()) {
    const errorField = new ErrorField('searchWord', searchWord, 'searchWord를 입력해주세요.');
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }
  return true;
};

export {
  validateNos,
  validateProps,
  checkQuery,
  checkAdvancedSearchQuery,
  checkGeneralSearchQuery,
  isValidYYYYMMDDFormat,
};
