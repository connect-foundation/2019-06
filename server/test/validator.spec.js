import should from 'should';
import validator from '../src/utils/validator';

describe.only('validator 모듈의', () => {
  describe('checkMail 호출시', () => {
    it('abcde를 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkMail('abcde').should.be.equal(false);
    });

    it('abcde@daitne.com를 넘겨줄 경우 true를 반환한다.', () => {
      validator.checkMail('abcde@daitne.com').should.be.equal(true);
    });

    it('abcde@daitne.co.kr를 넘겨줄 경우 true를 반환한다.', () => {
      validator.checkMail('abcde@daitne.co.kr').should.be.equal(true);
    });

    it('abcde@@daitne.com를 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkMail('abcde@@daitne.com').should.be.equal(false);
    });

    it('abcde@daitne..com를 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkMail('abcde@daitne..com').should.be.equal(false);
    });
  });

  describe('checkName 호출시', () => {
    it('abcde를 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkName('abcde').should.be.equal(false);
    });
    it('이정환을 넘겨줄 경우 true를 반환한다.', () => {
      validator.checkName('이정환').should.be.equal(true);
    });
    it('길이가 11이상인 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkName('김아무개아무개아무개아무개').should.be.equal(false);
    });
  });

  describe('checkPassword 호출시', () => {
    it('길이가 8미만 혹은 16초과한 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validator.checkPassword('1234').should.be.equal(false);
      validator.checkPassword('123!Jj').should.be.equal(false);
      validator.checkPassword('123!JjABC123abc!!!!').should.be.equal(false);
      validator.checkPassword('aaaaaaaaaaaaaaaaaaa').should.be.equal(false);
    });
    it('소문자, 대문자, 특수문자, 숫자가 하나라도 포함되어 있지 않을 경우 false를 반환한다.', () => {
      validator.checkPassword('jh123JHL').should.be.equal(false);
      validator.checkPassword('jh123!!!').should.be.equal(false);
      validator.checkPassword('12323abc').should.be.equal(false);
      validator.checkPassword('12323ABC!!').should.be.equal(false);
    });
    it('길이가 8이상 16이하, 소문자, 대문자, 특수문자, 숫자가 하나씩 포함되어 있을 경우 true를 반환한다.', () => {
      validator.checkPassword('aaaA111!').should.be.equal(true);
      validator.checkPassword('aaa111!!A').should.be.equal(true);
      validator.checkPassword('AA2211aa!').should.be.equal(true);
      validator.checkPassword('BB1a!@bcd').should.be.equal(true);
    });
  });
});
