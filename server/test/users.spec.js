import request from 'supertest';
import app from '../src/app';
import dbSync from '../src/bin/dbSync';

describe.only('POST /users가', () => {
  before(() => dbSync({ force: true }));

  it('성공할 경우 상태코드는 201이며 json을 리턴한다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        name: '이정환',
        id: 'jhl12',
        email: 'ljhw3377@gmail.com',
        password: 'test1234',
      })
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('중복된 id가 있을 경우 상태코드는 409이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        name: '이정환',
        id: 'jhl12',
        email: 'ljhw3377@gmail.com',
        password: 'test1234',
      })
      .expect(409, done);
  });

  it('올바르지 않은 필드를 줄 경우 상태코드는 422이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        name: '이정환',
        id: 'jhl12',
        email: 'ljhw3377@gmail.com',
        password: 'test',
      })
      .expect(422, done);
  });
});
