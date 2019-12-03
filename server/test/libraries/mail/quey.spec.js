/* eslint-disable no-undef */
import should from 'should';
import ERROR_CODE from '../../../src/libraries/exception/error-code';
import ErrorResponse from '../../../src/libraries/exception/error-response';
import { checkQuery } from '../../../src/libraries/validation/mail';

const data = {
  category: '1',
  page: '1',
};

describe('checkQuery....', () => {
  it('# category가 정수가 아니면 ErrorResponse를 던진다.', () => {
    try {
      checkQuery({ ...data, category: 'das' });
    } catch (err) {
      err.should.be.an.instanceOf(ErrorResponse);
    }
  });

  it('# category가 정수가 아니면 ErrorCode는 INVALID_INPUT_VALUE 이다.', () => {
    try {
      checkQuery({ ...data, category: 'das' });
    } catch (err) {
      const { errorCode } = err;
      err.errorCode.should.be.eql(ERROR_CODE.INVALID_INPUT_VALUE);
    }
  });

  it("# category가 정수가 아니면 errorField reason은 '유효하지 않은 값입니다.' 이다.", () => {
    try {
      checkQuery({ ...data, category: 'das' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors[0].reason.should.be.equals('유효하지 않은 값입니다.');
    }
  });

  it("# category가 음수이면 errorField reason은 '유효하지 않은 값입니다.' 이다.", () => {
    try {
      checkQuery({ ...data, category: '-1' });
    } catch (err) {
      const { fieldErrors } = err;
      err.should.be.an.instanceOf(ErrorResponse);
    }
  });

  it('# page가 정수가 아니면 ErrorResponse를 던진다.', () => {
    try {
      checkQuery({ ...data, page: 'das' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors[0].reason.should.be.equals('유효하지 않은 값입니다.');
    }
  });

  it('# page가 정수가 아니면 ErrorCode는 INVALID_INPUT_VALUE 이다.', () => {
    try {
      checkQuery({ ...data, page: 'das' });
    } catch (err) {
      const { errorCode } = err;
      err.errorCode.should.be.eql(ERROR_CODE.INVALID_INPUT_VALUE);
    }
  });

  it("# page가 정수가 아니면 errorField reason은 '유효하지 않은 값입니다.' 이다.", () => {
    try {
      checkQuery({ ...data, page: 'das' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors[0].reason.should.be.equals('유효하지 않은 값입니다.');
    }
  });

  it("# page가 0이면 errorField reason은 '유효하지 않은 값입니다.' 이다.", () => {
    try {
      checkQuery({ ...data, page: '0' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors[0].reason.should.be.equals('유효하지 않은 값입니다.');
    }
  });

  it("# page가 음수이면 errorField reason은 '유효하지 않은 값입니다.' 이다.", () => {
    try {
      checkQuery({ ...data, page: '-1' });
    } catch (err) {
      const { fieldErrors } = err;
      err.should.be.an.instanceOf(ErrorResponse);
    }
  });

  it('# page와 category가 모두 올바르지 않으면 fieldErrors의 길이는 2이다.', () => {
    try {
      checkQuery({ category: '-1', page: '-1' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors.should.have.length(2);
    }
  });

  it('# sort가 유효한 값이 아니면 유효하지 않은 정렬기준 입니다.를 반환한다.', () => {
    try {
      checkQuery({ sort: 'dsa' });
    } catch (err) {
      const { fieldErrors } = err;
      fieldErrors[0].reason.should.be.equals('유효하지 않은 정렬기준 입니다.');
    }
  });

  it('# sort가 datedesc면 true를 반환한다.', () => {
    const query = checkQuery({ sort: 'datedesc' });
    query.should.be.true();
  });

  it('# sort가 dateasc true를 반환한다.', () => {
    const query = checkQuery({ sort: 'dateasc' });
    query.should.be.true();
  });

  it('# sort가 subjectasc true를 반환한다.', () => {
    const query = checkQuery({ sort: 'subjectasc' });
    query.should.be.true();
  });

  it('# sort가 subjectdesc true를 반환한다.', () => {
    const query = checkQuery({ sort: 'subjectdesc' });
    query.should.be.true();
  });

  it('# sort가 fromdesc true를 반환한다.', () => {
    const query = checkQuery({ sort: 'fromdesc' });
    query.should.be.true();
  });

  it('# sort가 fromasc true를 반환한다.', () => {
    const query = checkQuery({ sort: 'fromasc' });
    query.should.be.true();
  });
});
