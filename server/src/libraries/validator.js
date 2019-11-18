const regexsOfType = {
  id: [/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/, /^.{5,20}$/],
  email: [/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/],
  password: [/^.{8,20}$/],
  name: [/^[a-zA-Z가-힣 ]{1,10}$/],
};

const validate = (type, value) => {
  const regexs = regexsOfType[type];

  for (const regex of regexs) {
    if (!regex.test(value)) return false;
  }
  return true;
};

// userInfo: {id, name, password, email}
const checkUser = ({ id, name, password, email }) => {
  const user = {
    id,
    name,
    password,
    email,
  };

  return Object.keys(user).every(key => validate(key, user[key]));
};

const checkLoginForm = ({ id, password }) => {
  const user = { id, password };

  return Object.keys(user).every(key => validate(key, user[key]));
};

export { validate, checkUser, checkLoginForm };
