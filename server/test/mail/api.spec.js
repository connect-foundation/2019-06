import request from 'supertest';
import should from 'should';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('Mail api test...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });
  describe('로그인 하지 않은 상태로..', () => {
    it('메일을 보내면 401에러를 반환한다', done => {
      request(app)
        .post('/v1/mail')
        .send({
          to: ['rooot@daitnu.com'],
          subject: 'title이다',
          text: 'body이다',
          attachments: [],
        })
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
    it('보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
      authenticatedUser
        .post('/v1/mail')
        .send({
          to: ['yyyy@da.c'],
          subject: 'title이sdadweq다',
          text: 'body이czxczx다',
          attachments: [],
        })
        .expect(400, done);
    });
    it('보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
      authenticatedUser
        .post('/v1/mail')
        .send({
          to: ['qwewywq@dassass'],
          subject: 'titeqweqqele이다',
          text: 'body이sdasdqw다',
          attachments: [],
        })
        .expect(400, done);
    });
  });
});
