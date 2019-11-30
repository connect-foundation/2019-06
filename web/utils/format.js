import moment from 'moment';

const formatDateForReservationTimePicker = date => date.format('YYYY. MM. DD.');

const formatDateForReservationDateText = date => {
  return moment(date).format('YYYY:MM:DD A hh:mm');
};

export { formatDateForReservationTimePicker, formatDateForReservationDateText };
