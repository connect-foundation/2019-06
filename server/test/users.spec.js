import request from 'supertest';
import app from '../src/app';
import DB from '../src/database';
import mock from '../mock/create-dummy-data';

describe('회원등록시 POST /users가', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
  });

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

  it('중복된 메일로 가입할 경우 상태코드는 409이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        name: '이정환',
        id: 'jhl123',
        email: 'ljhw3377@gmail.com',
        password: 'test1234',
      })
      .expect(409, done);
  });

  it('올바르지 않은 필드를 줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        name: '이정환',
        id: 'jhl12',
        email: 'ljhw3377@gmail.com',
        password: 'test',
      })
      .expect(400, done);
  });
});
