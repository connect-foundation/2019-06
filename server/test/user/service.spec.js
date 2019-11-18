/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import service from '../../src/v1/users/service';
import mock from '../../mock/create-dummy-data';
import ErrorResponse from '../../src/libraries/error-response';
import ERROR_CODE from '../../src/libraries/error-code';

const user = {
  user_id: 'userid',
  name: '이름이뭐니',
  password: 'pasword12',
  sub_email: 'daitnu@daitnu.com',
};

const user2 = {
  user_id: 'userid2',
  name: '이름이뭐니',
  password: 'pasword12',
  sub_email: 'daitnu2@daitnu.com',
};

describe('user service는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await mock();
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  describe('register 함수는...', () => {
    it('# 성공시 newUser를 반환한다.', async () => {
      const newUser = await service.register(user);
      newUser.should.be.properties('domain_no', 'no', 'user_id', 'name', 'sub_email', 'email');
    });

    it('# 성공시 password는 반환하지 않는다.', async () => {
      const newUser = await service.register(user2);
      newUser.should.not.be.properties('password');
    });

    it('# 중복된 아이디인 경우 ErrorResponse instance를 반환한다. ', async () => {
      try {
        newUser = await service.register(user2);
      } catch (error) {
        error.should.be.instanceOf(ErrorResponse);
      }
    });

    it('# 중복된 아이디인 경우 ERROR_CODE는 ID_DUPLICATION 이다', async () => {
      try {
        newUser = await service.register(user2);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.ID_DUPLICATION);
      }
    });

    it('# 중복된 아이디인 경우 ErrorFields의 length는 0이다.', async () => {
      try {
        newUser = await service.register(user2);
      } catch (error) {
        const { fieldErrors } = error;
        fieldErrors.should.have.length(0);
      }
    });
  });
});
