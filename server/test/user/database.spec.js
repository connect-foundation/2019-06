/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';

const userEmail = 'rooot@daitnu.com';

describe('유저의 email을 통해 정보를 얻는다', () => {
  before(async () => {
    DB.sequelize.sync({ force: true });
  });

  it('이메일을 @를 기준으로 앞의 string이 해당 이메일의 id가 된다', async () => {
    const result = await DB.User.findOneById(userEmail.split('@')[0]);
    result.user_id.should.be.equal(userEmail.split('@')[0]);
    result.email.should.be.equal(userEmail);
  });
});
