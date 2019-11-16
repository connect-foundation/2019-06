/* eslint-disable camelcase */
/* eslint-disable no-undef */
import should from 'should';
import Sequelize from 'sequelize';

import DB from '../../src/database';

describe('user DB test..', () => {
  let user_no = 1;
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    await DB.Domain.create({ name: 'daitnu.com' });

    const body = {
      name: '이정환',
      user_id: 'jhl12',
      sub_email: 'ljhw3377@gmail.com',
      password: 'test1234',
    };
    const result = await DB.User.create({ ...body });
    const data = result.get({ plain: true });
    user_no = data.no;
  });

  it('findOne test...', async () => {
    const user = await DB.User.findOne({ where: { no: user_no } });
    user.should.an.instanceof(Sequelize.Model);
  });

  it('validate test...', async () => {
    await should(
      DB.User.create({
        name: 'abc',
        user_id: 'jhl1234',
        email: 'ljh33@gmail.com',
        sub_email: 'abcde@gmail.com',
        password: 'testtest',
      }),
    ).be.rejected();

    await should(
      DB.User.create({
        name: '이정환',
        user_id: '가나다',
        email: 'abcde@abcde.com',
        sub_email: 'abcde@gmail.com',
        password: 'testtest',
      }),
    ).be.rejected();

    await should(
      DB.User.create({
        name: '이정환',
        user_id: 'ljhw33',
        email: 'abcde@abcde',
        sub_email: 'abcde@gmail.com',
        password: 'testtest',
      }),
    ).be.rejected();
  });
});
