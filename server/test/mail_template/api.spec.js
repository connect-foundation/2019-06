/* eslint-disable no-undef */
import should from 'should';
import request from 'supertest';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';
import dummyMock from '../../mock/create-large-amount-data';
import app from '../../src/app';

describe('mail template service는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
    await dummyMock();
  });

  describe('getAttachmentsByTemplateNo는....', () => {
    it('로그인 하지 않은 상태로 요청을 보내면', done => {
      request(app)
        .get('/mail/template/4/attachments')
        .expect(401, done);
    });

    describe('로그인 한 상태로..', () => {
      const user = {
        id: 'rooot',
        password: '12345678',
      };
      const authenticatedUser = request.agent(app);
      before(async () => {
        await authenticatedUser.post('/auth/login').send(user);
      });

      it('유효하지 않은 no를 보내면 400을 반환한다.', done => {
        authenticatedUser.get('/mail/template/-1/attachments').expect(400, done);
      });
      it('유효하지 않은 no를 보내면 400을 반환한다.', done => {
        authenticatedUser.get('/mail/template/0/attachments').expect(400, done);
      });
      it('유효하지 않은 no를 보내면 400을 반환한다.', done => {
        authenticatedUser.get('/mail/template/a/attachments').expect(400, done);
      });
      it('유효하지 않은 no를 보내면 400을 반환한다.', done => {
        authenticatedUser.get('/mail/template/&/attachments').expect(400, done);
      });

      it('유효하지 않은 no를 보내면 올바르지 않는 값입니다를 반환한다..', done => {
        authenticatedUser.get('/mail/template/&/attachments').end((err, { body }) => {
          const { errorCode, fieldErrors } = body;
          errorCode.status.should.be.equals(400);
          errorCode.message.should.be.equals('INVALID INPUT VALUE');
          fieldErrors[0].field.should.be.equals('no');
          fieldErrors[0].value.should.be.equals('&');
          fieldErrors[0].reason.should.be.equals('올바르지 않는 값입니다.');
          done();
        });
      });
    });
  });
});
