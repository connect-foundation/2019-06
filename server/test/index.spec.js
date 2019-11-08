const should = require('should');
const qq = require('../src/qq');

describe('성공할것이다...', () => {
  it('성공해야지만 commit 가능', () => {
    qq().should.be.equal('q');
  });
});
