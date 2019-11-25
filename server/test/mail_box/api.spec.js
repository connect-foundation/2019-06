import should from 'should';
import request from 'supertest';
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
  describe('로그인 한 상태로...', () => {
    const userCredentials = {
      id: 'rooot',
      password: '12345678',
    };
    const authenticatedUser = request.agent(app);
    before(done => {
      authenticatedUser
        .post('/v1/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    it('메일함 데이터를 요청하면 200코드를 리턴온다', done => {
      authenticatedUser
        .get('/v1/mail/box')
        .send()
        .expect(200, done);
    });

    it('메일함 추가 요청에 성공하면 201코드를 리턴한다', done => {
      authenticatedUser
        .post('/v1/mail/box')
        .send({ name: '하위^^' })
        .expect(201, done);
    });

    it('메일함 이름 업데이트에 성공하면 200을 리턴한다', done => {
      authenticatedUser
        .patch('/v1/mail/box')
        .send({ name: '하', no: 6 })
        .expect(200, done);
    });
  });
});
