import moment from 'moment';

const transformDateForReservationTimePicker = date => date.format('YYYY. MM. DD.');

const transformDateToReserve = date => {
  return moment(date).format('YYYY:MM:DD HH:mm');
};

const transformDateForReservationDateText = date => {
  return moment(date).format('YYYY:MM:DD A hh:mm');
};

export {
  transformDateForReservationTimePicker,
  transformDateForReservationDateText,
  transformDateToReserve,
};
