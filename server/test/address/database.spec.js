/* eslint-disable no-undef */
import should from 'should';
import app from '../../src/app';
import DB from '../../src/database';

describe('Address Query test....', () => {
  describe('findAllByUserId는...', () => {
    it('...', async () => {
      try {
        await DB.Address.findAllByUserId();
      } catch (error) {
        console.log(error);
      }
    });
  });
});
