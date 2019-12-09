import should from 'should';
import { strToDate } from '../src/libraries/date-parser';

describe('date-parser는.....', () => {
  describe('strToDate 함수는..', () => {
    it('# "YYYY:MM:DD HH:mm" 형태의 문자열을 넘겨줄 경우 Date 형식으로 넘겨준다.', () => {
      const str = '2000:12:01 03:00';

      const date = strToDate(str);
      date.should.eql(new Date(2000, 11, 1, 3, 0));
    });
  });
});
