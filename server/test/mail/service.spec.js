/* eslint-disable no-undef */
import should from 'should';
import service from '../../src/v1/mail/service';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';

const root2Email = 'root2@daitnu.com';
describe('Mail Service Test', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
  });

  it('getRawMails는 배열을 반환한다.', async () => {
    const data = await service.getRawMails(1, root2Email);
    data.should.an.instanceof(Array);
  });

  it('getRawMails는 배열을 반환한다.', async () => {
    const data = await service.getRawMails(1, root2Email);
    const plain = data[0].get({ plain: true });
    plain.should.be.properties([
      'no',
      'owner',
      'mail_template_id',
      'is_important',
      'is_read',
      'MailTemplate',
    ]);
  });
});
