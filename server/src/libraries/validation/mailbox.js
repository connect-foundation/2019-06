import ERROR_CODE from '../exception/error-code';
import ErrorResponse from '../exception/error-response';
import ErrorField from '../exception/error-field';

const BLANK = '';
const MAILBOX_NAME_LENGTH_LIMIT = 20;

const boxNameValidation = val => {
  return val === BLANK || !val;
};

const boxNameLengthValidation = integer => {
  return integer > MAILBOX_NAME_LENGTH_LIMIT;
};

const boxNoValidation = val => {
  const toNumber = Number(val);
  return val === '' || Number.isNaN(toNumber) || toNumber < 1;
};

const makeMailBoxValidation = name => {
  if (boxNameValidation(name)) {
    const errorField = new ErrorField('mailBoxName', name, '추가할 메일함 이름을 입력해주세요');
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField);
  }

  if (boxNameLengthValidation(name.length)) {
    const errorField = new ErrorField(
      'mailBoxName',
      name,
      '메일함 이름은 최대 20글자로 작성해주세요',
    );
    throw new ErrorResponse(ERROR_CODE.MAILBOX_EXCEED_NAME, errorField);
  }

  return true;
};

const updateMailBoxValidation = integer => {};

const deleteMailBoxValidation = val => {};

export default { makeMailBoxValidation, updateMailBoxValidation, deleteMailBoxValidation };
