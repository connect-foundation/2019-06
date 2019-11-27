import DB from '../../database';
import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';
import { checkDate } from '../validator';
import { strToDate } from '../date-parser';

const MINUTES_INTERVAL = 15;

const validateDate = reservationTime => {
  if (!checkDate(reservationTime)) {
    const errorField = new ErrorField(
      'reservationTime',
      reservationTime,
      '날짜 형식은 YYYY:MM:DD hh:mm 입니다',
    );
    throw new ErrorResponse(ERROR_CODE.INVALID_DATE, errorField);
  }

  const date = strToDate(reservationTime);
  if (date.getMinutes() % MINUTES_INTERVAL !== 0) {
    const errorField = new ErrorField(
      'reservationTime',
      reservationTime,
      `예약은 ${MINUTES_INTERVAL}분 단위로 할 수 있습니다`,
    );
    throw new ErrorResponse(ERROR_CODE.INVALID_DATE, errorField);
  }

  if (Date.now() > date.getTime()) {
    const errorField = new ErrorField('reservationTime', reservationTime, '이미 지난 날짜 입니다');
    throw new ErrorResponse(ERROR_CODE.INVALID_DATE, errorField);
  }

  return true;
};

export default {
  validateDate,
};
