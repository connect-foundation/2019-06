import should from 'should';
import validator from '../src/utils/validator';

describe.only('validator 모듈의', () => {
  describe('validate(id) 호출시', () => {
    it('abcde를 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('id', 'abcde').should.be.equal(true);
    });

    it('abcde!@#를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('id', 'abcde!@#').should.be.equal(false);
    });

    // 길이 20초과
    it('abcdeabcdeabcdeabcde1를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('id', 'abcdeabcdeabcdeabcde1').should.be.equal(false);
    });

    // 길이 5미만
    it('aaaa를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('id', 'aaaa').should.be.equal(false);
    });

    it('aaaa11를 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('id', 'aaaa11').should.be.equal(true);
    });
  });

  describe('validate(email) 호출시', () => {
    it('abcde를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('email', 'abcde').should.be.equal(false);
    });

    it('abcde@daitne.com를 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('email', 'abcde@daitne.com').should.be.equal(true);
    });

    it('abcde@daitne.co.kr를 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('email', 'abcde@daitne.co.kr').should.be.equal(true);
    });

    it('abcde@@daitne.com를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('email', 'abcde@@daitne.com').should.be.equal(false);
    });

    it('abcde@daitne..com를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('email', 'abcde@daitne..com').should.be.equal(false);
    });

    it('abcd333333333333333333333abcd33333333333333333@daitne.com를 넘겨줄 경우 false를 반환한다.', () => {
      validator
        .validate('email', 'abcd333333333333333333333abcd33333333333333333@daitne.com')
        .should.be.equal(false);
    });

    it('a@a.m를 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('email', 'a@a.m').should.be.equal(false);
    });
  });

  describe('validate(name) 호출시', () => {
    it('abcde를 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('name', 'abcde').should.be.equal(false);
    });
    it('이정환을 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('name', '이정환').should.be.equal(true);
    });
    it('길이가 11이상인 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('name', '김아무개아무개아무개아무개').should.be.equal(false);
    });
  });

  describe('validate(password) 호출시', () => {
    it('길이가 8미만 혹은 20초과한 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validator.validate('password', '1234').should.be.equal(false);
      validator.validate('password', '123!J').should.be.equal(false);
      validator.validate('password', '123!JjABC123abc!111!!!').should.be.equal(false);
      validator.validate('password', 'aaaaaaaaaaaaaaa111aaaa').should.be.equal(false);
    });
    it('길이가 8이상 20이하인 문자열을 넘겨줄 경우 true를 반환한다.', () => {
      validator.validate('password', 'jh123JHL1').should.be.equal(true);
      validator.validate('password', 'jh123!####!!').should.be.equal(true);
      validator.validate('password', '12323ab!c').should.be.equal(true);
      validator.validate('password', '12323ABC!@#@!!').should.be.equal(true);
    });
  });

  describe('checkUser 호출시', () => {
    it('형식에 맞지 않는 필드를 넘겨줄 경우 false를 반환한다.', () => {
      validator
        .checkUser({
          name: 'jhl',
          id: 'jhl1234',
          mail: 'abc@daitne.com',
          password: '1234',
        })
        .should.be.equal(false);

      validator
        .checkUser({
          name: '이정환',
          id: 'jhl@daitne.com',
          subEmail: 'abc@daitne.com',
          password: '1234',
        })
        .should.be.equal(false);

      validator
        .checkUser({
          name: '이정환',
          id: 'jhl123@abc',
          subEmail: 'abc@daitne.com',
          password: 'aaaA111!',
        })
        .should.be.equal(false);
    });

    it('형식에 맞는 필드를 넘겨줄 경우 true를 반환한다.', () => {
      validator
        .checkUser({
          name: '이정환',
          id: 'jhl123',
          email: 'abc@daitne.com',
          password: 'aaaA111!',
        })
        .should.be.equal(true);

      validator
        .checkUser({
          name: '이정환',
          id: 'jhl123',
          email: 'abc@daitne.co.kr',
          password: 'bbbB111!',
        })
        .should.be.equal(true);
    });
  });
});
