/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const rootEmail = 'root@daitnu.com';
describe('Mail DB query Test', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
  });

  describe('findAllReceivedMail는...', () => {
    it('배열을 반환한다..', async () => {
      const data = await DB.Mail.findAllReceivedMail(1, rootEmail);
      data.should.an.instanceof(Array);
    });

    it('MailTemplate From에 자기자신이 없다.', async () => {
      const mails = await DB.Mail.findAllReceivedMail(1, rootEmail);

      for (const mail of mails) {
        const { MailTemplate } = mail.get({ plain: true });
        MailTemplate.from.not.euqals(rootEmail);
      }
    });
  });

  describe('create는...', () => {
    it('test', async () => {
      const result = await DB.Mail.create({
        owner: 1,
        mail_template_id: 1,
      });
      const data = result.get({ plain: true });
      data.should.be.properties({
        owner: 1,
        mail_template_id: 1,
        is_important: false,
        is_read: false,
      });
    });
  });
});
