/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const rootEmail = 'root@daitnu.com';
describe('User DB query Test', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
  });

  describe('findAllReceiveMail는...', () => {
    it('배열을 반환한다..', async () => {
      const data = await DB.Mail.findAllReceiveMail(1, rootEmail);
      data.should.an.instanceof(Array);
    });

    it('MailTemplate From에 자기자신이 없다.', async () => {
      const mails = await DB.Mail.findAllReceiveMail(1, rootEmail);

      for (const mail of mails) {
        const { MailTemplate } = mail.get({ plain: true });
        MailTemplate.from.not.euqals(rootEmail);
      }
    });
  });
});
