import winston from 'winston';
import moment from 'moment';
import 'winston-daily-rotate-file';
import path from 'path';

moment.locale('ko', {
  weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  longDateFormat: {
    LLLL: 'YYYY-MM-DD HH:MM:SS(ddd)',
    LL: 'HH:MM:SS',
  },
});

const error = winston.createLogger({
  level: 'error',
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, '../../../log/error/log'),
      zippedArchive: true,
      format: winston.format.printf(
        info => `${moment().format('LL')} [${info.level.toUpperCase()}] - ${info.message}`,
      ),
    }),

    new winston.transports.Console({
      format: winston.format.printf(
        info => `${moment().format('LL')} [${info.level.toUpperCase()}] - ${info.message}`,
      ),
    }),
  ],
});

const debug = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.DailyRotateFile({
      filename: path.join(__dirname, '../../../log/debug/log'),
      zippedArchive: true,
      format: winston.format.printf(info => `${moment().format('LL')}  ${info.message}`),
    }),

    new winston.transports.Console({
      format: winston.format.printf(
        info => `${moment().format('LL')} [${info.level.toUpperCase()}] - ${info.message}`,
      ),
    }),
  ],
});

export default {
  error(message) {
    error.error(message);
  },
  debug: {
    write(message) {
      debug.info(message);
    },
  },
};
