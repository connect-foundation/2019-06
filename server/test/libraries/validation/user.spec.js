/* eslint-disable no-undef */
import should from 'should';
import validate from '../../../src/libraries/validation/user';
import ErrorResponse from '../../../src/libraries/error-response';
import ERROR_CODE from '../../../src/libraries/error-code';

const user = {
  user_id: 'userid',
  name: '이름이뭐니',
  password: 'pasword12',
  sub_email: 'daitnu@daitnu.com',
};

describe('', () => {
  describe('join함수는....', () => {
    it('# 성공시 true를 반환한다.', async () => {
      const data = await validate.join(user);
      data.should.be.true();
    });

    it('# 실패시 rejected가 반환된다.', async () => {
      await validate.join({ ...user, user_id: 'asd' }).should.be.rejected();
    });

    it('# 실패시 error는 ErrorResponse의 인스턴스이다.', async () => {
      const userId = 'asd';
      try {
        await validate.join({ ...user, user_id: userId });
      } catch (error) {
        error.should.be.instanceOf(ErrorResponse);
      }
    });

    it('# 실패시 filedErrors에 상세한 내용을 알린다. ', async () => {
      const userId = 'asd';
      try {
        await validate.join({ ...user, user_id: userId });
      } catch (error) {
        const { fieldErrors } = error;
        fieldErrors[0].field.should.be.eql('user_id');
        fieldErrors[0].value.should.be.eql(userId);
        fieldErrors[0].reason.should.be.eql('아이디의 길이는 5이상 20이하 이어야 합니다.');
      }
    });

    it('# 실패시 문제가되는 필드를 전부 배열에 담는다. ', async () => {
      const userId = 'asd';
      const password = 'asd';
      try {
        await validate.join({ ...user, user_id: userId, password });
      } catch (error) {
        error.fieldErrors.length.should.be.eql(2);
      }
    });

    it('# 실패시 ERROR_CODE는 INVALIDE_INPUT_VALUE이다.', async () => {
      const userId = 'asd';
      const password = 'asd';
      try {
        await validate.join({ ...user, user_id: userId, password });
      } catch (error) {
        error.errorCode.should.be.equals(ERROR_CODE.INVALID_INPUT_VALUE);
      }
    });
  });
});
