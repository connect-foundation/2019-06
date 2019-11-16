/* eslint-disable no-undef */
import DB from '../../src/database';

describe('MailTemplate DB test...', () => {
  before(async () => {
    DB.sequelize.sync();
  });

  it('create test', async () => {
    const body = { from: 'daitnu@daitnu.com', to: 'daitne@daitnu.com', title: 'db test', subject: 'subject', tmp: '그냥 만들어봄 ㅎ.ㅎ' };
    const result = await DB.MailTemplate.create(body);
    console.log(result);
  });
});
