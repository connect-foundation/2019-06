const BLANK = '';
const MAILBOX_NAME_LENGTH_LIMIT = 20;

export const boxNameValidation = val => {
  return val === BLANK || !val;
};

export const boxNameLengthValidation = integer => {
  return integer > MAILBOX_NAME_LENGTH_LIMIT;
};

export const boxNameNoValidation = val => {
  const toNumber = Number(val);
  return val === '' || Number.isNaN(toNumber) || toNumber < 1;
};
