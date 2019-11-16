/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';

describe('Address Query test....', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
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
