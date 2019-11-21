/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const user1 = {
  id: 'userid',
  name: '이름이뭐니',
  password: 'pasword12',
  sub_email: 'daitnu@daitnu.com',
};

const user2 = {
  id: 'userid2',
  name: '이름이뭐니',
  password: 'pasword12',
  sub_email: 'daitnu2@daitnu.com',
};

describe('회원등록 POST /users는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  it('# 성공할 경우 상태코드는 201이며 json을 리턴한다.', done => {
    request(app)
      .post('/v1/users')
      .send(user1)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('# 중복된 id가 있을 경우 상태코드는 409이다.', done => {
    request(app)
      .post('/v1/users')
      .send(user1)
      .expect(409, done);
  });

  it('# 성공시 요청한 유저정보를 포함한 내용을 반환한다.', done => {
    request(app)
      .post('/v1/users')
      .send(user2)
      .end((err, { body: { newUser } }) => {
        newUser.should.be.have
          .properties({ id: user2.id })
          .and.have.properties({ name: user2.name })
          .and.have.properties({ sub_email: user2.sub_email })
          .and.not.have.property('password');
        done();
      });
  });

  it('올바르지 않은 필드를 줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        password: 'test',
      })
      .expect(400, done);
  });

  it('이름을 공백으로 줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        name: '  ',
      })
      .expect(400, done);
  });

  it('올바르지 않은 필드를 줄 경우 fieldErrors배열의 길이는 0이 아니다.', done => {
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        password: 'test',
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors.should.not.have.length(0);
        done();
      });
  });

  it('password의 필드가 올바르지 않는경우 fieldErrors를 통해 상세히 알린다.', done => {
    const invalidPassword = 'test';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        password: invalidPassword,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'password' });
        fieldErrors[0].should.be.properties({ value: invalidPassword });
        fieldErrors[0].should.be.properties({
          reason: 'password의 길이는 8이상 20이하 이어야 합니다.',
        });
        done();
      });
  });

  it('# id 필드의 길이가 5이하인 경우 실패한다.', done => {
    const id = 'test';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        id,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'id' });
        fieldErrors[0].should.be.properties({ value: id });
        fieldErrors[0].should.be.properties({
          reason: '아이디의 길이는 5이상 20이하 이어야 합니다.',
        });
        done();
      });
  });

  it('# id 필드의 길이가 20초과 경우 실패한다. ', done => {
    const id = 'a'.repeat(21);
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        id,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'id' });
        fieldErrors[0].should.be.properties({ value: id });
        fieldErrors[0].should.be.properties({
          reason: '아이디의 길이는 5이상 20이하 이어야 합니다.',
        });
        done();
      });
  });

  it('# id 필드에 특수문자가 있는경우 실패한다.', done => {
    const id = 'ㄴㅁㅇㄴㅁ@ㄴㅇㅁㄴ';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        id,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'id' });
        fieldErrors[0].should.be.properties({ value: id });
        fieldErrors[0].should.be.properties({ reason: '아이디의 형식이 올바르지 않습니다.' });
        done();
      });
  });

  it('# sub_email 필드의 형식이 올바르지 않은경우 실패한다.', done => {
    const sub_email = '@daitnu.com';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        sub_email,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'sub_email' });
        fieldErrors[0].should.be.properties({ value: sub_email });
        fieldErrors[0].should.be.properties({ reason: 'sub email의 형식이 올바르지 않습니다.' });
        done();
      });
  });

  it('# sub_email 필드의 형식이 올바르지 않은경우 실패한다. 2', done => {
    const sub_email = 'a@addsada.a';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        sub_email,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'sub_email' });
        fieldErrors[0].should.be.properties({ value: sub_email });
        fieldErrors[0].should.be.properties({ reason: 'sub email의 형식이 올바르지 않습니다.' });
        done();
      });
  });

  it('# sub_email 필드의 형식이 올바르지 않은경우 실패한다. 3', done => {
    const sub_email = 'a@.a';
    request(app)
      .post('/v1/users')
      .send({
        ...user1,
        sub_email,
      })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'sub_email' });
        fieldErrors[0].should.be.properties({ value: sub_email });
        fieldErrors[0].should.be.properties({ reason: 'sub email의 형식이 올바르지 않습니다.' });
        done();
      });
  });
});
