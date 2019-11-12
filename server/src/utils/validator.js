const checkMail = mail => {
  const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regExp.test(mail);
};

const checkName = name => {
  if (name.length > 10) return false;

  const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return regExp.test(name);
};

const checkPassword = password => {
  if (password.length < 8 || password.length > 16) return false;

  let reg = /[a-z]/;
  if (!reg.test(password)) return false;

  reg = /[A-Z]/;
  if (!reg.test(password)) return false;

  reg = /[0-9]/;
  if (!reg.test(password)) return false;

  reg = /[~!@#$%^&*()_+|<>?:{}]/;
  if (!reg.test(password)) return false;

  return true;
};

export default {
  checkMail,
  checkName,
  checkPassword,
};
