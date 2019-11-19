const regexsOfType = {
  id: [
    {
      regex: /^.{5,20}$/,
      msg: '아이디 길이는 5이상 20이하 입니다',
    },
    {
      regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*$/,
      msg: '숫자, 영어, 마침표(.), 붙임표(-), 밑줄(_)만 사용할 수 있습니다.',
    },
  ],
  email: [
    {
      regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}$/,
      msg: '올바르지 않은 이메일 형식입니다.',
    },
  ],
  password: [{ regex: /^.{8,20}$/, msg: '비밀번호 길이는 8이상 20이하 입니다' }],
  name: [
    { regex: /^.{1,10}$/, msg: '이름 길이는 1이상 10이하 입니다' },
    { regex: /[a-zA-Z가-힣 ]/, msg: '영어, 한글만 사용할 수 있습니다.' },
  ],
};

const validate = (type, value) => {
  const regexs = regexsOfType[type];

  for (const { regex } of regexs) {
    if (!regex.test(value)) {
      return false;
    }
  }
  return true;
};

const validateAndGetMsg = (type, value) => {
  const regexs = regexsOfType[type];

  for (const { regex, msg } of regexs) {
    if (!regex.test(value)) {
      return msg;
    }
  }
  return '';
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
export default {
  validate,
  validateAndGetMsg,
  checkUser,
};
