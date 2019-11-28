// date 형식: 'YYYY:MM:DD HH:mm'
const strToDate = str => {
  const [date, time] = str.split(' ');

  let [year, month, day] = date.split(':');
  let [hours, minutes] = time.split(':');

  year = Number(year);
  month = Number(month) - 1; // month는 0 ~ 11
  day = Number(day); // day는 1 ~

  hours = Number(hours);
  minutes = Number(minutes);

  return new Date(year, month, day, hours, minutes);
};

export { strToDate };
