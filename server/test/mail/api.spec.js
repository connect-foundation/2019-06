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
          .post('/v1/mail')
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
          .post('/v1/users')
          .send(user);

        await authenticatedUser.post('/v1/auth/login').send(user);
      });

      it('보낼 사람의 이메일이 유효한 이메일이 아니라면 400 에러를 반환한다', done => {
        authenticatedUser
          .post('/v1/mail')
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
          .post('/v1/mail')
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
          .post('/v1/mail')
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
          .post('/v1/mail')
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
          .post('/v1/mail')
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
          .post('/v1/mail')
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
          .get('/v1/mail')
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

      it('# category를 0으로 요청시 status는 200이다', done => {
        authenticatedUser.get('/v1/mail?category=0').expect(200, done);
      });

      it('# 메일리스트 요청시 status코드는 200이다', done => {
        authenticatedUser.get('/v1/mail').expect(200, done);
      });

      it('# category를 음수로 요청시 status는 400이다', done => {
        authenticatedUser.get('/v1/mail?category=-1').expect(400, done);
      });

      it('# page를 0으로 요청시 status는 400이다', done => {
        authenticatedUser.get('/v1/mail?page=0').expect(400, done);
      });

      it('# page를 음수로 요청시 status는 400이다', done => {
        authenticatedUser.get('/v1/mail?page=0').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다. ', done => {
        authenticatedUser.get('/v1/mail?sort=asd').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다2. ', done => {
        authenticatedUser.get('/v1/mail?sort=dwqdwqd').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 status 400이다3. ', done => {
        authenticatedUser.get('/v1/mail?sort=%$#gf').expect(400, done);
      });

      it('# 유효하지 않은 sort가 들어갈경우 INVALID INPUT VALUE을 반환한다. ', done => {
        authenticatedUser.get('/v1/mail?sort=%$#gf').end((err, { body }) => {
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
        authenticatedUser.get('/v1/mail?sort=datedesc').end((err, { body }) => {
          const { mails } = body;
          mails[0].no.should.be.above(mails[1].no);
          done();
        });
      });

      it('# sort가 dateasc면 받은 시간순으로 출력한다. ', done => {
        authenticatedUser.get('/v1/mail?sort=dateasc').end((err, { body }) => {
          const { mails } = body;
          mails[0].no.should.be.below(mails[1].no);
          done();
        });
      });
    });
  });
});
