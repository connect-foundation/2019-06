import request from 'supertest';
import app from '../src/app';
import dbSync from '../src/bin/dbSync';

describe('로그인 API POST /v1/auth/login으로 요청시', () => {
  before(() => dbSync({ force: true }));

  it('성공할 경우 상태코드는 200이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'root',
        password: 'dqwdq',
      })
      .expect(200, done);
  });

  it('실패할 경우 상태코드는 401이다.', done => {
    request(app)
      .post('/v1/auth/login')
      .send({
        id: 'jhl123',
        password: 'test12345',
      })
      .expect(401, done);
  });
});
