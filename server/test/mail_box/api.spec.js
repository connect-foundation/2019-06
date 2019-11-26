import should from 'should';
import request from 'supertest';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('mailbox api test...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('로그인 안하고...', () => {
    it('메일박스 데이터를 요청한다면 401에러를 반환한다.', done => {
      request(app)
        .get('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 추가를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .post('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 수정를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .patch('/v1/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 삭제를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .delete('/v1/mail/box')
        .send()
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

    describe('메일함 생성을 요청할 때..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send()
          .expect(400, done);
      });

      it('빈 값을 넘기면("") 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send({ name: '' })
          .expect(400, done);
      });

      it('메일함 이름의 길이가 20을 초과하면 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/v1/mail/box')
          .send({ name: 'asdfghjklqwertyuiopzx' })
          .expect(400, done);
      });
    });

    describe('메일함 이름 변경을 요청할 때..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send()
          .expect(400, done);
      });

      it('oldName과 newName 둘중 하나라도 빈 값("")이 넘어오면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ no: 9, oldName: '', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ no: 9, oldName: '하위^^', newName: '' })
          .expect(400, done);
      });

      it('oldName과 newName 둘중 하나라도 undefined가 넘어오면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ no: 9, oldName: undefined, newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ no: 9, oldName: '하위^^', newName: undefined })
          .expect(400, done);
      });

      it('넘겨지는 데이터가 oldName, newName, no중 하나라도 없으면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ newName: '할룽^^', no: 9 })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', no: 9 })
          .expect(400, done);
      });

      it('넘겨지는 데이터중 no가 숫자가 아니라면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: '' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: 'asd' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: undefined })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: 'undefined' })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: null })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: 'null' })
          .expect(400, done);
      });

      it('no 데이터가 1미만이라면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: 0 })
          .expect(400);
        authenticatedUser
          .patch('/v1/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^', no: -1 })
          .expect(400, done);
      });
    });

    describe('메일함 삭제 요청시..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send()
          .expect(400, done);
      });

      it('넘겨지는 데이터가 name, no중 하나라도 없으면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ name: '할룽^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 9 })
          .expect(400, done);
      });

      it('name에 빈값을 넘기면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 9, name: '' })
          .expect(400, done);
      });

      it('name에 undefined나 null을 넘기면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 9, name: undefined })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 9, name: null })
          .expect(400, done);
      });

      it('no 데이터가 숫자가 아니면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: '', name: '하위^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 'ㅁㄴㅇ', name: '하위^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 'asd', name: '하위^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: undefined, name: '하위^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: null, name: '하위^^' })
          .expect(400, done);
      });

      it('no 데이터가 1 미만이라면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: 0, name: '하위^^' })
          .expect(400);
        authenticatedUser
          .delete('/v1/mail/box')
          .send({ no: -1, name: '하위^^' })
          .expect(400, done);
      });
    });
  });
});
