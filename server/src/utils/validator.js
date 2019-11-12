const regexOfType = {
  id: /^[a-z0-9-_]{5,20}$/,
  email: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
  password: /^.{8,20}$/,
  name: /^[가-힣]{1,10}$/,
};

const validate = (type, value) => {
  const regex = regexOfType[type];
  if (!regex.test(value)) return false;
  return true;
};

// userInfo: {id, name, password, email}
const checkUser = userInfo => Object.keys(userInfo).every(key => validate(key, userInfo[key]));

export default {
  validate,
  checkUser,
};
