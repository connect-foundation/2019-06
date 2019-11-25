import request from 'supertest';
import should from 'should';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('mailbox api test...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('로그인 안하고 메일박스 데이터를 요청한다면...', () => {
    it('401에러를 반환한다.', done => {
      request(app)
        .get('/v1/mail/box')
        .send()
        .expect(401, done);
    });
  });
});
