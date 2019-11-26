const BLANK = '';
const { MAILBOX_NAME_LENGTH_LIMIT } = process.env;

export const MUST_NOT_BE_EMPTY_STRING = val => {
  return val === BLANK || !val;
};

export const IS_MORE_THAN_MAX_LENGTH = integer => {
  return integer > MAILBOX_NAME_LENGTH_LIMIT;
};

export const MAILBOX_NUMBER_CHECK = val => {
  const toNumber = Number(val);
  return val === '' || Number.isNaN(toNumber) || toNumber < 1;
};
