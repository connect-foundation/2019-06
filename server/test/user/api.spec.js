/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const user = {
  name: '이정환',
  user_id: 'jhl12',
  sub_email: 'ljhw3377@gmail.com',
  password: 'test1234',
};

describe('회원등록시 POST /users가', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  it('성공할 경우 상태코드는 201이며 json을 리턴한다.', done => {
    request(app)
      .post('/v1/users')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('중복된 id가 있을 경우 상태코드는 409이다.', done => {
    request(app)
      .post('/v1/users')
      .send(user)
      .expect('Content-Type', /json/)
      .expect(409, done);
  });

  it('올바르지 않은 필드를 줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        ...user,
        password: 'test',
      })
      .expect(400, done);
  });
});
