// date: moment 객체

const transformDateForReservationTimePicker = date => date.format('YYYY. MM. DD.');

const transformDateToReserve = date => date.format('YYYY:MM:DD HH:mm');

const transformDateForReservationDateText = date => date.format('YYYY:MM:DD A hh:mm');

export {
  transformDateForReservationTimePicker,
  transformDateForReservationDateText,
  transformDateToReserve,
};
