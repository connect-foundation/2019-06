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

const checkDate = dateStr => {
  // First check for the pattern
  if (!/^\d{4}:\d{2}:\d{2} \d{2}:\d{2}$/.test(dateStr)) {
    return false;
  }
  // Parse the date parts to integers
  const parts = dateStr.split(' ');
  let [year, month, day] = parts[0].split(':');
  let [hours, minutes] = parts[1].split(':');

  year = +year;
  month = +month;
  day = +day;
  hours = +hours;
  minutes = +minutes;

  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month === 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Adjust for leap years
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) monthLength[1] = 29;

  // Check the range of the day
  return (
    day > 0 &&
    day <= monthLength[month - 1] &&
    hours >= 0 &&
    hours <= 23 &&
    minutes >= 0 &&
    minutes <= 59
  );
};

export { validate, checkUser, checkLoginForm, checkDate };
