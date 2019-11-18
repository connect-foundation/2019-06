/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';

describe('Address Query test....', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
  });

  describe('findAllByUserId는...', () => {
    it('...', async () => {
      try {
        await DB.Address.findAllByUserNo(1);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
