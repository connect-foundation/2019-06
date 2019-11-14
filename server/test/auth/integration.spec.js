import request from 'supertest';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('로그인 API POST /v1/auth/login으로 요청시', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  it('로그인 성공할 경우 상태코드는 200이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'rooot',
        password: '12345678',
      })
      .expect(200, done);
  });

  it('잘못된 데이터를 넘겨줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'rot',
        password: '12345678',
      })
      .expect(400, done);
  });

  it('로그인 실패를 할 경우 상태코드는 401이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'jhl123',
        password: 'test12345',
      })
      .expect(401, done);
  });
});