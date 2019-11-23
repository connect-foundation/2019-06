/* eslint-disable no-undef */
import should from 'should';
import { createSalt, encrypt } from '../src/libraries/crypto';

describe('crypto 모듈의', () => {
  describe('createSalt() 호출시', () => {
    it('string을 반환한다.', async () => {
      const salt = await createSalt();
      salt.should.be.type('string');
    });

    it('무작위한 값을 만들어낸다.', async () => {
      const salt1 = await createSalt();
      const salt2 = await createSalt();
      const match = salt1 !== salt2;
      match.should.be.equal(true);
    });
  });

  describe('encrypt() 호출시', () => {
    it('string을 반환한다.', async () => {
      const encryption = await encrypt('hihi', 'hihi2');
      encryption.should.be.type('string');
    });

    it('동일한 인자를 줄 경우 동일한 값을 반환한다.', async () => {
      const encryption1 = await encrypt('hihi', 'hihi2');
      const encryption2 = await encrypt('hihi', 'hihi2');
      const match = encryption1 === encryption2;
      match.should.be.equal(true);
    });
  });
});
