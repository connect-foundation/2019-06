/* eslint-disable no-undef */
import should from 'should';
import { validate, checkUser, checkDate } from '../src/libraries/validator';
import dateValidator from '../src/libraries/validation/date';

describe('validator 모듈의', () => {
  describe('validate(id) 호출시', () => {
    it('아이디는 5~20자의 영문 소문자,숫자, 특수문자 (-) 및 (_) 만 있는 문자를 넘겨줄시 true를 반환한다.', () => {
      validate('id', 'abcde').should.be.equal(true);
      validate('id', '123_1').should.be.equal(true);
      validate('id', 'abcdef').should.be.equal(true);
      validate('id', 'ab_c1').should.be.equal(true);
      validate('id', 'aaaa11').should.be.equal(true);
    });

    it('특수문자 (-) 및 (_)외의 특수문자를 넘겨줄 경우 false를 반환한다.', () => {
      validate('id', 'abcde!@#').should.be.equal(false);
    });

    it('길이가 21이상인 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validate('id', 'abcdeabcdeabcdeabcde1').should.be.equal(false);
    });

    it('길이가 5미만인 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validate('id', 'aaaa').should.be.equal(false);
    });
  });

  describe('validate(email) 호출시', () => {
    it('도메인 명이 없는 이메일을 넘겨줄 경우 false를 반환한다.', () => {
      validate('email', 'abcde').should.be.equal(false);
    });

    it('올바른 이메일 형식을 넘겨줄 경우 true를 반환한다.', () => {
      validate('email', 'abcde@daitne.com').should.be.equal(true);
      validate('email', 'abcde@daitne.co.kr').should.be.equal(true);
      validate('email', 'ab.cde@daitne.co.kr').should.be.equal(true);
    });

    it('도메인 형식이 잘못된 이메일을 넘겨줄 경우 false를 반환한다.', () => {
      validate('email', 'abcde@@daitne.com').should.be.equal(false);
      validate('email', 'abcde@daitne..com').should.be.equal(false);
      validate('email', 'a@a.m').should.be.equal(false);
      validate('email', 'abcdef@abcdef').should.be.equal(false);
      validate('email', 'eoiwjw@aspd').should.be.equal(false);
    });
  });

  describe('validate(name) 호출시', () => {
    it('1~10글자 사이의 영어를 넘겨줄 경우 true를 반환한다.', () => {
      validate('name', 'abc abc').should.be.equal(true);
      validate('name', 'abcd abcd').should.be.equal(true);
      validate('name', 'abcA AA').should.be.equal(true);
    });

    it('1~10글자 사이의 한글을 넘겨줄 경우 true를 반환한다.', () => {
      validate('name', '이정환').should.be.equal(true);
      validate('name', '이정환환환').should.be.equal(true);
      validate('name', '이').should.be.equal(true);
    });

    it('길이가 11이상인 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validate('name', '김아무개아무개아무개아무개').should.be.equal(false);
    });
  });

  describe('validate(password) 호출시', () => {
    it('길이가 8미만 혹은 20초과한 문자열을 넘겨줄 경우 false를 반환한다.', () => {
      validate('password', '1234').should.be.equal(false);
      validate('password', '123!J').should.be.equal(false);
      validate('password', '123!JjABC123abc!111!!!').should.be.equal(false);
      validate('password', 'aaaaaaaaaaaaaaa111aaaa').should.be.equal(false);
    });
    it('길이가 8이상 20이하인 문자열을 넘겨줄 경우 true를 반환한다.', () => {
      validate('password', 'jh123JHL1').should.be.equal(true);
      validate('password', 'jh123!####!!').should.be.equal(true);
      validate('password', '12323ab!c').should.be.equal(true);
      validate('password', '12323ABC!@#@!!').should.be.equal(true);
    });
  });

  describe('checkUser 호출시', () => {
    it('형식에 맞지 않는 필드를 넘겨줄 경우 false를 반환한다.', () => {
      checkUser({
        name: 'jhl',
        id: 'jhl1234',
        mail: 'abc@daitne.com',
        password: '1234',
      }).should.be.equal(false);

      checkUser({
        name: '이정환',
        id: 'jhl@daitne.com',
        subEmail: 'abc@daitne.com',
        password: '1234',
      }).should.be.equal(false);

      checkUser({
        name: '이정환',
        id: 'jhl123@abc',
        subEmail: 'abc@daitne.com',
        password: 'aaaA111!',
      }).should.be.equal(false);

      checkUser({
        id: 'jhl123@abc',
        password: 'aaaA111!',
      }).should.be.equal(false);

      checkUser({
        id: 'jhl123',
        password: 'aaaA111!',
      }).should.be.equal(false);
    });

    it('형식에 맞는 필드를 넘겨줄 경우 true를 반환한다.', () => {
      checkUser({
        name: '이정환',
        id: 'jhl123',
        email: 'abc@daitne.com',
        password: 'aaaA111!',
      }).should.be.equal(true);

      checkUser({
        name: '이정환',
        id: 'jhl123',
        email: 'abc@daitne.co.kr',
        password: 'bbbB111!',
      }).should.be.equal(true);
    });
  });

  describe('checkDate 호출시', () => {
    it('형식에 맞지 않는 날짜를 넘겨줄 경우 false를 반환한다.', () => {
      checkDate('2019:-1:10 10:01').should.be.equal(false);
      checkDate('2019:-1:10 13:00').should.be.equal(false);
      checkDate('2019:12:10 -1:00').should.be.equal(false);
      checkDate('2019:12:32 13:00').should.be.equal(false);
      checkDate('19:12:00 13:00').should.be.equal(false);
      checkDate('2019:12:00').should.be.equal(false);
      checkDate('19:12:99 13:00').should.be.equal(false);
      checkDate('2019:12:30 25:00').should.be.equal(false);
      checkDate('2019:02:29 10:00').should.be.equal(false);
    });

    it('형식에 맞는 날짜를 넘겨줄 경우 true를 반환한다.', () => {
      checkDate('2019:01:10 13:00').should.be.equal(true);
      checkDate('2019:12:31 15:00').should.be.equal(true);
      checkDate('2020:02:29 10:00').should.be.equal(true);
      checkDate('2019:12:31 10:01').should.be.equal(true);
    });
  });

  describe('dateValidator의 validateDate 호출시', () => {
    it('형식에 맞지 않는 날짜를 넘겨줄 경우 에러를 throw 한다.', () => {
      const dateStr = '2019:12:31 10:-1';
      try {
        dateValidator.validateDate(dateStr);
      } catch (err) {
        const { fieldErrors } = err;
        fieldErrors[0].should.be.properties({ field: 'reserveTime' });
        fieldErrors[0].should.be.properties({ value: dateStr });
        fieldErrors[0].should.be.properties({ reason: '날짜 형식은 YYYY:MM:DD hh:mm 입니다' });
      }
    });

    it('형식에 맞지 않는 날짜를 넘겨줄 경우 에러를 throw 한다.', () => {
      const dateStr = '2019:12:40 10:00';
      try {
        dateValidator.validateDate(dateStr);
      } catch (err) {
        const { fieldErrors } = err;
        fieldErrors[0].should.be.properties({ field: 'reserveTime' });
        fieldErrors[0].should.be.properties({ value: dateStr });
        fieldErrors[0].should.be.properties({ reason: '날짜 형식은 YYYY:MM:DD hh:mm 입니다' });
      }
    });

    it('예약 시간이 15분 단위가 아니면 메일을 throw 한다.', () => {
      const dateStr = '2019:12:31 10:13';
      try {
        dateValidator.validateDate(dateStr);
      } catch (err) {
        const { fieldErrors } = err;
        fieldErrors[0].should.be.properties({ field: 'reserveTime' });
        fieldErrors[0].should.be.properties({ value: dateStr });
        fieldErrors[0].should.be.properties({ reason: '예약은 15분 단위로 할 수 있습니다' });
      }
    });

    it('현재 날짜 이전의 날짜를 보낼 경우 에러를 throw 한다.', () => {
      const dateStr = '1019:12:31 10:00';
      try {
        dateValidator.validateDate(dateStr);
      } catch (err) {
        const { fieldErrors } = err;
        fieldErrors[0].should.be.properties({ field: 'reserveTime' });
        fieldErrors[0].should.be.properties({ value: dateStr });
        fieldErrors[0].should.be.properties({ reason: '이미 지난 날짜 입니다' });
      }
    });
  });
});
