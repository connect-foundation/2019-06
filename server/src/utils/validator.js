const joinRegex = {
  id: [
    {
      // '아이디는 5~20자의 영문 소문자,숫자와 특수기호(_)(-)만 사용 가능합니다.',
      regex: /^[a-z0-9-_]{5,20}$/,
    },
  ],
  email: [
    {
      // '이메일은 5~50자의 영문 소문자,숫자와 특수기호(_)(-)만 사용 가능합니다.',
      regex: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
    },
  ],
  password: [
    {
      // '비밀번호는 8자 이상 20자 이하로 입력해주세요.'
      regex: /^.{8,20}$/,
    },
  ],
  name: [
    {
      // '이름을 정확하게 입력하세요.'
      regex: /^[가-힣]{1,10}$/,
    },
  ],
};

const checkLength = (value, min, max) => {
  return min <= value && value <= max;
};

const validate = (type, str) => {
  const list = joinRegex[type];

  for (const { regex, range } of list) {
    if (regex && !regex.test(str)) {
      return false;
    }
    const [MIN, MAX] = [0, 1];
    if (range && !checkLength(str.length, range[MIN], range[MAX])) {
      return false;
    }
  }

  return true;
};

// userInfo: {id, name, password, email}
const checkUser = userInfo => Object.keys(userInfo).every(key => validate(key, userInfo[key]));

export default {
  validate,
  checkUser,
};
