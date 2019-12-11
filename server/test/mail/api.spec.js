import request from 'supertest';
import should from 'should';
import app from '../../src/app';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

describe('Mail api test...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('메일전송시...', () => {
    describe('로그인 하지 않은 상태로..', () => {
      it('메일을 보내면 401에러를 반환한다', done => {
        request(app)
          .post('/mail')
          .send({
            to: ['rooot@daitnu.com'],
            subject: 'title이다',
            text: 'body이다',
            attachments: [],
          })
          .expect(401, done);
      });
    });
    describe('로그인 한 상태로..', () => {
      const user = {
        id: 'userid',
        name: '이름이뭐니',
        password: 'pasword12',
        sub_email: 'daitnu@daitnu.com',
      };

      const authenticatedUser = request.agent(app);

      before(async () => {
        await request(app)
          .post('/users')
          .send(user);

        await authenticatedUser.post('/auth/login').send(user);
      });

      it('보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['yyyy@da.c'],
            subject: 'title이sdadweq다',
            text: 'body이czxczx다',
            attachments: [],
          })
          .expect(400, done);
      });

      it('보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['qwewywq@dassass'],
            subject: 'titeqweqqele이다',
            text: 'body이sdasdqw다',
            attachments: [],
          })
          .expect(400, done);
      });

      it('예약 메일함 전송시 보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['yyyy@da.c'],
            subject: 'title이sdadweq다',
            text: 'body이czxczx다',
            reservationTime: '2019:11:09 12:30',
            attachments: [],
          })
          .expect(400, done);
      });

      it('예약 메일함 전송시 예약시간이 유효하지 않다면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['yyyy@daf.cdd'],
            subject: 'title이sdadweq다',
            text: 'body이czxczx다',
            reservationTime: '2000:11:09 12:30',
            attachments: [],
          })
          .expect(400, done);
      });

      it('예약 메일함 전송시 예약시간이 유효하지 않다면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['yyyy@dada.cas'],
            subject: 'hihihi',
            text: 'body이czxczx다',
            reservationTime: '2019:1-:09 --에오:30',
            attachments: [],
          })
          .expect(400, done);
      });

      it('예약 메일함 전송시 예약시간이 유효하다면 상태코드는 201이다.', done => {
        authenticatedUser
          .post('/mail')
          .send({
            to: ['yyyy@dada.cas'],
            subject: 'hihihi',
            text: 'body이czxczx다',
            reservationTime: '2020:01:20 12:00',
            attachments: [],
          })
          .expect(201, done);
      });
    });
  });

  describe('메일 리스트 요청시..', () => {
    describe('로그인 하지 않은 상태로..', () => {
      it('메일을 보내면 401에러를 반환한다', done => {
        request(app)
          .get('/mail')
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

      it('# category를 0으로 요청시 status는 200이다', done => {
        authenticatedUser.get('/mail?category=0').expect(200, done);
      });

      it('# 메일리스트 요청시 status코드는 200이다', done => {
        authenticatedUser.get('/mail').expect(200, done);
      });

      it('# category를 음수로 요청시 status는 400이다', done => {
        authenticatedUser.get('/mail?category=-1').expect(400, done);
      });

      it('# page를 0으로 요청시 status는 400이다', done => {
        authenticatedUser.get('/mail?page=0').expect(400, done);
      });

      it('# page를 음수로 요청시 status는 400이다', done => {
        authenticatedUser.get('/mail?page=0').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다. ', done => {
        authenticatedUser.get('/mail?sort=asd').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다2. ', done => {
        authenticatedUser.get('/mail?sort=dwqdwqd').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다3. ', done => {
        authenticatedUser.get('/mail?sort=%$#gf').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 INVALID INPUT VALUE을 반환한다. ', done => {
        authenticatedUser.get('/mail?sort=%$#gf').end((err, { body }) => {
          const { errorCode, fieldErrors } = body;
          errorCode.status.should.be.equals(400);
          errorCode.message.should.be.equals('INVALID INPUT VALUE');
          fieldErrors[0].field.should.be.equals('sort');
          fieldErrors[0].value.should.be.equals('%$');
          fieldErrors[0].reason.should.be.equals('유효하지 않은 정렬기준 입니다.');
          done();
        });
      });

      it('# sort가 datedesc면 받은 시간 역순으로 출력한다. ', done => {
        authenticatedUser.get('/mail?sort=datedesc').end((err, { body }) => {
          const { mails } = body;
          const mail0 = new Date(mails[0].MailTemplate.createdAt).getTime();
          const mail1 = new Date(mails[1].MailTemplate.createdAt).getTime();
          mail0.should.be.aboveOrEqual(mail1);
          done();
        });
      });

      it('# sort가 dateasc면 받은 시간순으로 출력한다. ', done => {
        authenticatedUser.get('/mail?sort=dateasc').end((err, { body }) => {
          const { mails } = body;
          const mail0 = new Date(mails[0].MailTemplate.createdAt).getTime();
          const mail1 = new Date(mails[1].MailTemplate.createdAt).getTime();
          mail0.should.be.belowOrEqual(mail1);
          done();
        });
      });
    });
  });

  describe('카테고리 요청시...', () => {
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

    it('로그인한 상태라면 200을 반환한다', done => {
      authenticatedUser.get('/mail/categories').expect(200, done);
    });

    it('로그인하지 않은 상태로 접근하고자 하면 401 에러를 반환한다', done => {
      request(app)
        .get('/mail/categories')
        .expect(401, done);
    });
  });

  describe('메일 속성 변경 요청 시...', () => {
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

    it('# 메일 1번의 category_no를 4번으로 변경하면 200', done => {
      authenticatedUser
        .patch('/mail/1')
        .send({ props: { category_no: 4 } })
        .expect(200, done);
    });

    it('# 메일 1번의 category_no를 가지고 있지 않은 5번으로 변경하면 404', done => {
      authenticatedUser
        .patch('/mail/1')
        .send({ props: { category_no: 5 } })
        .expect(404, done);
    });

    it('# 메일 1번을 중요 메일로 변경하면 200', done => {
      authenticatedUser
        .patch('/mail/1')
        .send({ props: { is_important: true } })
        .expect(200, done);
    });

    it('# 메일 1번을 읽은 메일로 변경하면 200', done => {
      authenticatedUser
        .patch('/mail/1')
        .send({ props: { is_read: true } })
        .expect(200, done);
    });

    it('# 메일 1번을 is_read가 string이면 400', done => {
      authenticatedUser
        .patch('/mail/1')
        .send({ props: { is_read: 'is_read' } })
        .expect(400, done);
    });
  });

  describe('메일 영구삭제 요청 시...', () => {
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

    it('# 메일 1번 삭제 시 200', done => {
      authenticatedUser.delete('/mail/1').expect(200, done);
    });

    it('# 이미 삭제한 메일 1번 삭제 시 400', done => {
      authenticatedUser.delete('/mail/1').expect(200, done);
    });

    it('# 잘못된 번호의 메일 삭제 시 400', done => {
      authenticatedUser.delete('/mail/-1').expect(400, done);
    });

    it('# 잘못된 값이 들어오면 400', done => {
      authenticatedUser.delete('/mail/asd').expect(400, done);
    });
  });

  describe('여러 메일 속성 변경 요청 시...', () => {
    const userCredentials = {
      id: 'rooot',
      password: '12345678',
    };
    const authenticatedUser = request.agent(app);

    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    before(done => {
      authenticatedUser
        .post('/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    it('# 메일 1,4,7,10번의 category_no를 4번으로 변경하면 200', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: [1, 4, 7, 10], props: { category_no: 4 } })
        .expect(200, done);
    });

    it('# 메일 1,4,8,10번의 category_no를 4번으로 변경하면 404', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: [1, 4, 8, 10], props: { category_no: 4 } })
        .expect(404, done);
    });

    it('# 메일 1,4,-1,10번의 category_no를 4번으로 변경하면 400', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: [1, 4, -1, 10], props: { category_no: 4 } })
        .expect(400, done);
    });

    it('# 메일 1,1,1,1번의 category_no를 4번으로 변경하면 200', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: [1, 1, 1, 1], props: { category_no: 4 } })
        .expect(200, done);
    });

    it('# 메일 asd, sd, b번의 category_no를 4번으로 변경하면 400', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: ['asd', 'sd', 'b'], props: { category_no: 4 } })
        .expect(400, done);
    });

    it('# nos값을 주지 않았을 때 400', done => {
      authenticatedUser
        .patch('/mail')
        .send({ props: { category_no: 4 } })
        .expect(400, done);
    });

    it('# nos값이 배열이 아닐 때 주지 않았을 때 400', done => {
      authenticatedUser
        .patch('/mail')
        .send({ nos: 1, props: { category_no: 4 } })
        .expect(400, done);
    });
  });

  describe('여러 메일 영구삭제 요청 시...', () => {
    const userCredentials = {
      id: 'rooot',
      password: '12345678',
    };
    const authenticatedUser = request.agent(app);

    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    before(done => {
      authenticatedUser
        .post('/auth/login')
        .send(userCredentials)
        .expect(200, done);
    });

    it('# 메일 1,4,7 번을 영구 삭제하면 200', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: [1, 4, 7] })
        .expect(200, done);
    });

    it('# 이미 삭제한 메일 1,4 번을 영구 삭제하면 404', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: [1, 4] })
        .expect(404, done);
    });

    it('# 다른 유저의 2번을 영구 삭제하면 404', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: [2] })
        .expect(404, done);
    });

    it('# 메일 -1번을 영구 삭제하면 400', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: [-1] })
        .expect(400, done);
    });

    it('# nos가 배열이 아닌 경우 400', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: 10 })
        .expect(400, done);
    });

    it('# nos에 숫자가 아닌 값이 포함된 경우 400', done => {
      authenticatedUser
        .delete('/mail')
        .send({ nos: [10, 'asd'] })
        .expect(400, done);
    });
  });
});
