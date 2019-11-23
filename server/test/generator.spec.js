/* eslint-disable no-undef */
import should from 'should';
import { createRandStr } from '../src/libraries/generator';

describe('generator 모듈의', () => {
  describe('createRandStr() 호출시', () => {
    it('length를 인자로 넘겨줄 경우 길이가 length인 string을 반환한다.', async () => {
      const length = 12;
      const randStr = await createRandStr(length);
      randStr.should.be.type('string');
      randStr.length.should.be.equal(length);
    });

    it('아무 인자도 넘겨주지 않을 경우 길이가 8인 string을 반환한다.', async () => {
      const randStr = await createRandStr();
      randStr.should.be.type('string');
      randStr.length.should.be.equal(8);
    });

    it('무작위한 값을 만들어낸다.', async () => {
      const length = 12;
      const randStr1 = await createRandStr(length);
      const randStr2 = await createRandStr(length);
      const match = randStr1 !== randStr2;
      match.should.be.equal(true);
    });
  });
});
