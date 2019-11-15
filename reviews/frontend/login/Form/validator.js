const regexOfType = {
  id: /^[a-z0-9-_]{5,20}$/,
  password: /^.{8,20}$/,
};

const validate = (type, value) => {
  const regex = regexOfType[type];
  if (!regex.test(value)) return false;
  return true;
};

export default {
  validate,
};
