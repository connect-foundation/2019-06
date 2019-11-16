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

  it('잘못된 비밀번호를 넘겨줄 경우 400이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'rooot',
        password: '123456789',
      })
      .expect(400, done);
  });

  it('형식에 맞지 않은 데이터를 넘겨줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'rot',
        password: '12345678',
      })
      .expect(400, done);
  });

  it('가입되어 있지 않은 회원일 경우 상태코드는 404이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'rooot123',
        password: 'test12345',
      })
      .expect(404, done);
  });
});
