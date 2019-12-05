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
        .get('/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 추가를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .post('/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 수정를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .patch('/mail/box')
        .send()
        .expect(401, done);
    });
    it('메일박스 삭제를 요청한다면 401에러를 반환단다.', done => {
      request(app)
        .delete('/mail/box')
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
        .post('/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    describe('메일함 생성을 요청할 때..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 400에러를 반환한다.', done => {
        authenticatedUser
          .post('/mail/box')
          .send()
          .expect(400);

        authenticatedUser
          .post('/mail/box')
          .send()
          .end((err, { body }) => {
            const { fieldErrors } = body;
            fieldErrors[0].should.be.properties({ field: 'mailBoxName' });
            fieldErrors[0].should.be.properties({ value: '' });
            fieldErrors[0].should.be.properties({ reason: '추가할 메일함 이름을 입력해주세요' });
            done();
          });
      });

      it('빈 값을 넘기면("") 400에러를 반환한다.', done => {
        const name = '';
        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .expect(400);

        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .end((err, { body }) => {
            const { fieldErrors } = body;
            fieldErrors[0].should.be.properties({ field: 'mailBoxName' });
            fieldErrors[0].should.be.properties({ value: name });
            fieldErrors[0].should.be.properties({ reason: '추가할 메일함 이름을 입력해주세요' });
            done();
          });
      });

      it('null값을 넘기면 400에러를 반환한다.', done => {
        const name = null;
        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .expect(400);

        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .end((err, { body }) => {
            const { fieldErrors } = body;
            fieldErrors[0].should.be.properties({ field: 'mailBoxName' });
            fieldErrors[0].should.be.properties({ value: name });
            fieldErrors[0].should.be.properties({ reason: '추가할 메일함 이름을 입력해주세요' });
            done();
          });
      });

      it('undefined를 넘기면 400에러를 반환한다.', done => {
        const name = undefined;
        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .expect(400);

        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .end((err, { body }) => {
            const { fieldErrors } = body;
            fieldErrors[0].should.be.properties({ field: 'mailBoxName' });
            fieldErrors[0].should.be.properties({ value: '' });
            fieldErrors[0].should.be.properties({ reason: '추가할 메일함 이름을 입력해주세요' });
            done();
          });
      });

      it('메일함 이름의 길이가 20을 초과하면 400에러를 반환한다.', done => {
        const name = 'asdfghjklqwertyuiopzx';
        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .expect(400);

        authenticatedUser
          .post('/mail/box')
          .send({ name })
          .end((err, { body }) => {
            const { fieldErrors } = body;
            fieldErrors[0].should.be.properties({ field: 'mailBoxName' });
            fieldErrors[0].should.be.properties({ value: name });
            fieldErrors[0].should.be.properties({
              reason: '메일함 이름은 최대 20글자로 작성해주세요',
            });
            done();
          });
      });
    });

    describe('메일함 이름 변경을 요청할 때..', () => {
      it('oldName과 newName 둘중 하나라도 빈 값("")이 넘어오면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: '', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: '하위^^', newName: '' })
          .expect(400, done);
      });

      it('oldName과 newName 둘중 하나라도 undefined가 넘어오면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: undefined, newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: '하위^^', newName: undefined })
          .expect(400, done);
      });

      it('oldName과 newName 둘중 하나라도 null이 넘어오면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: null, newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: '하위^^', newName: null })
          .expect(400, done);
      });

      it('넘겨지는 데이터가 oldName, newName중 하나라도 없으면 400에러를, no가 없으면 404를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(404);
        authenticatedUser
          .patch('/mail/box/9')
          .send({ newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/9')
          .send({ oldName: '하위^^' })
          .expect(400, done);
      });

      it('넘겨지는 데이터중 no가 숫자가 아니라면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box/asd')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/undefined')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/null')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400, done);
      });

      it('no 데이터가 1미만이라면 400에러를 반환한다.', done => {
        authenticatedUser
          .patch('/mail/box/0')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400);
        authenticatedUser
          .patch('/mail/box/-1')
          .send({ oldName: '하위^^', newName: '할룽^^' })
          .expect(400, done);
      });
    });

    describe('메일함 삭제 요청시..', () => {
      it('아무런 값을 넘기지 않으면(undefined) 404에러를 반환한다.', done => {
        authenticatedUser
          .delete('/mail/box')
          .send()
          .expect(404, done);
      });

      it('넘겨지는 데이터가 name이 없으면 400에러를, no가 없으면 404에러를 반환한다.', done => {
        authenticatedUser
          .delete('/mail/box?name=할룽^^')
          .send()
          .expect(404);
        authenticatedUser
          .delete('/mail/box/9')
          .send()
          .expect(400, done);
      });

      it('name에 빈값을 넘기면 400에러를 반환한다.', done => {
        authenticatedUser
          .delete('/mail/box/9?name=')
          .send()
          .expect(400, done);
      });

      it('name에 undefined나 null을 넘기면 404에러를 반환한다.', done => {
        authenticatedUser
          .delete('/mail/box/9?name=undefined')
          .send()
          .expect(404);
        authenticatedUser
          .delete('/mail/box/9?name=null')
          .send()
          .expect(404, done);
      });
    });
  });
});
