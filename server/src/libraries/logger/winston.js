import winston from 'winston';
import moment from 'moment';
import 'winston-daily-rotate-file';

moment.locale('ko', {
  weekdays: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
  longDateFormat: {
    LLLL: 'YYYY-MM-DD HH:MM:SS(ddd)',
  },
});

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'log/error',
      zippedArchive: true,
      format: winston.format.printf(
        info => `${moment().format('LLLL')} [${info.level.toUpperCase()}] - ${info.message}`,
      ),
    }),

    new winston.transports.Console({
      format: winston.format.printf(
        info => `${moment().format('LLLL')} [${info.level.toUpperCase()}] - ${info.message}`,
      ),
    }),
  ],
});

export default logger;
