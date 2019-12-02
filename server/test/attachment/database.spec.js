/* eslint-disable camelcase */
/* eslint-disable no-undef */
import DB from '../../src/database';

describe('attachment DB test..', () => {
  let mail_template_id = 1;
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    const body = {
      from: 'daitnu@daitnu.com',
      to: 'daitne@daitnu.com',
      title: 'db test',
      subject: 'subject',
      tmp: '그냥 만들어봄 ㅎ.ㅎ',
      text: '바디입니다.',
    };
    const result = await DB.MailTemplate.create({ ...body });
    const data = result.get({ plain: true });
    mail_template_id = data.no;
  });

  it('bulk create test...', async () => {
    const dummy = [
      {
        mail_template_id,
        type: 'image',
        name: 'tile_name1',
        url: 'file url',
      },
      {
        mail_template_id,
        type: 'image',
        name: 'tile_name2',
        url: 'file url',
      },
      {
        mail_template_id,
        type: 'image',
        name: 'tile_name3',
        url: 'file url',
      },
      {
        mail_template_id,
        type: 'image',
        name: 'tile_name4',
        url: 'file url',
      },
    ];

    const attachments = await DB.Attachment.bulkCreate(dummy);
    for (const [index, attachment] of attachments.entries()) {
      attachment.get({ plain: true }).should.be.properties({
        no: index + 1,
        mail_template_id: 1,
        type: 'image',
        name: `tile_name${index + 1}`,
        url: 'file url',
      });
    }
  });
});
