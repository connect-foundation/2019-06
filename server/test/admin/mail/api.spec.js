/* eslint-disable no-undef */
import request from 'supertest';
import DB from '../../../src/database';
import app from '../../../src/app';

const { ADMIN_KEY } = process.env;

describe('예약 메일 보내기 API는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  it('# 잘못된 key 값을 넘겨줄 경우 상태코드는 404이다.', done => {
    request(app)
      .post('/admin/mail')
      .send({ key: 'abcde' })
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('# 올바른 key 값을 넘겨줄 경우 상태코드는 204이다.', done => {
    request(app)
      .post('/admin/mail')
      .send({ key: ADMIN_KEY })
      .expect(204, done);
  });
});
