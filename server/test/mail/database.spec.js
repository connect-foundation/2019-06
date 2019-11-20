/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const rootEmail = 'root@daitnu.com';
describe('Mail DB query Test', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
  });

  it('test', async () => {
    const result = await DB.Mail.create({
      owner: 1,
      mail_template_id: 1,
    });

    it('MailTemplate From에 자기자신이 없다.', async () => {
      const mails = await DB.Mail.findAndCountAllFilteredMail(1);

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
