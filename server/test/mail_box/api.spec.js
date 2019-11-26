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

  describe('로그인 안하고...', () => {
    it('메일박스 데이터를 요청한다면 401에러를 반환한다.', done => {
      request(app)
        .get('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 추가를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .post('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 수정를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .patch('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 삭제를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .delete('/v1/mail/box')
        .send()
        .expect(401, done);
    });
  });

  describe('로그인 한 상태로..', () => {
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

    describe('메일함 생성을 요청할 때..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send()
          .expect(400, done);
      });

      it('빈 값을 넘기면("") 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send({ name: '' })
          .expect(400, done);
      });

      it('메일함 이름의 길이가 20을 초과하면 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send({ name: 'asdfghjklqwertyuiopzx' })
          .expect(400, done);
      });
    });

    describe('메일함 이름 변경을 요청할 때..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send()
          .expect(400, done);
      });
    });
  });
});
