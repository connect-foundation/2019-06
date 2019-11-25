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

    it('메일함 데이터를 요청하면 기본 메일함인 5개가 온다', () => {
      authenticatedUser
        .get('/v1/mail/box')
        .send()
        .end((_, { body }) => {
          const { createdBox } = body;
          createdBox.should.have.length(5);
        });
    });

    it('메일함 추가 요청에 성공하면 201코드를 리턴한다', () => {
      authenticatedUser
        .post('/v1/mail/box')
        .send({ name: '하위^^' })
        .expect(201, done);
    });
  });
});
