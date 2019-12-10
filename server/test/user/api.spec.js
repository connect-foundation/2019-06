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
      .post('/users')
      .send(user1)
      .expect('Content-Type', /json/)
      .expect(201, done);
  });

  it('# 중복된 id가 있을 경우 상태코드는 409이다.', done => {
    request(app)
      .post('/users')
      .send(user1)
      .expect(409, done);
  });

  it('# 성공시 요청한 유저정보를 포함한 내용을 반환한다.', done => {
    request(app)
      .post('/users')
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
      .post('/users')
      .send({
        ...user1,
        password: 'test',
      })
      .expect(400, done);
  });

  it('이름을 공백으로 줄 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/users')
      .send({
        ...user1,
        name: '  ',
      })
      .expect(400, done);
  });

  it('올바르지 않은 필드를 줄 경우 fieldErrors배열의 길이는 0이 아니다.', done => {
    request(app)
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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
      .post('/users')
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

describe('POST /users/search는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
    await DB.User.create(user1);
  });

  it('# 잘못된 id, pw외의 다른 type을 query로 줄 경우 상태코드는 400이다', done => {
    request(app)
      .post('/users/search?type=test')
      .expect(400, done);
  });

  it('# 잘못된 id, pw외의 다른 type을 query로 줄 경우 실패한다', done => {
    request(app)
      .post('/users/search?type=test')
      .send(user1)
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'type' });
        done();
      });
  });

  it('# type이 id이고 body로 email을 주지 않을 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/users/search?type=id')
      .send()
      .expect(400, done);
  });

  it('# type이 id이고 body로 email을 주지 않을 경우 실패한다.', done => {
    request(app)
      .post('/users/search?type=id')
      .send()
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'email' });
        done();
      });
  });

  it('# 아이디를 찾을 때 가입에 사용하지 않은 메일을 넘겨줄 경우 상태코드는 404이다.', done => {
    request(app)
      .post('/users/search?type=id')
      .send({ email: 'daitnu@daitnu22.com' })
      .expect(404, done);
  });

  it('# 비밀번호를 찾을 때 가입에 사용하지 않은 메일을 넘겨줄 경우 상태코드는 404이다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ id: user1.id, email: 'daitnu@daitnu22.com' })
      .expect(404, done);
  });

  it('# 비밀번호를 찾을 때 가입을 하지 않은 아이디를 넘겨줄 경우 상태코드는 404이다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ id: 'hahoho', email: user1.sub_email })
      .expect(404, done);
  });

  it('# type이 pw이고 body로 email을 주지 않을 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ id: 'hihihi' })
      .expect(400, done);
  });

  it('# type이 pw이고 body로 id를 주지 않을 경우 상태코드는 400이다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ email: 'test@test.com' })
      .expect(400, done);
  });

  it('# 비밀번호 찾을 때 body로 email을 주지 않을 경우 실패한다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ id: 'hihihi' })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'email' });
        done();
      });
  });

  it('# 비밀번호 찾을 때 body로 id를 주지 않을 경우 실패한다.', done => {
    request(app)
      .post('/users/search?type=pw')
      .send({ email: 'test@test.com' })
      .end((err, { body }) => {
        const { fieldErrors } = body;
        fieldErrors[0].should.be.properties({ field: 'id' });
        done();
      });
  });
});

describe('PATCH /users/password는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('로그인 하지 않은 상태로..', () => {
    it('비밀번호를 업데이트 하고자 하면 401에러를 반환한다', done => {
      request(app)
        .patch('/users/password')
        .send({
          password: '12345678',
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
        .post('/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    it('유효한 비밀번호가 아니라면 400 에러를 반환한다', done => {
      authenticatedUser
        .patch('/users/password')
        .send({
          password: '1234',
        })
        .expect(400, done);
    });

    it('유효한 비밀번호라면 204를 반환한다', done => {
      authenticatedUser
        .patch('/users/password')
        .send({
          password: '87654321',
        })
        .expect(204, done);
    });
  });

  describe('변경한 비밀번호로 로그인을 할 때..', () => {
    const userCredentials = {
      id: 'rooot',
      password: '12345678',
    };
    const authenticatedUser = request.agent(app);

    before(async () => {
      await authenticatedUser.post('/auth/login').send(userCredentials);

      await authenticatedUser.patch('/users/password').send({
        password: '87654321',
      });
    });

    it('변경한 비밀번호가 아니라면 401 에러를 반환한다', done => {
      request(app)
        .post('/auth/login')
        .send({
          id: 'rooot',
          password: '12345678',
        })
        .expect(401, done);
    });

    it('변경한 비밀번호라면 200을 반환한다', done => {
      request(app)
        .post('/auth/login')
        .send({
          id: 'rooot',
          password: '87654321',
        })
        .expect(200, done);
    });
  });
});

describe('DELETE /users/는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('로그인 하지 않은 상태로..', () => {
    it('탈퇴를 하고자 한다면 하면 401에러를 반환한다', done => {
      request(app)
        .delete('/users')
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
        .post('/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    it('탈퇴를 성공하면 204를 반환하며 다시 로그인 할 수 없다.', async () => {
      await authenticatedUser.delete('/users').expect(204);

      await authenticatedUser
        .post('/auth/login')
        .send(userCredentials)
        .expect(401);
    });
  });
});
