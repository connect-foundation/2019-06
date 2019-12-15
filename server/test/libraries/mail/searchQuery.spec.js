/* eslint-disable no-undef */
import should from 'should';
import { checkSearchQuery, isValidYYYYMMDDFormat } from '../../../src/libraries/validation/mail';

describe('checkSearchQuery...', () => {
  describe('isValidYYYYMMDDFormat..', () => {
    it('YYYY/MM/DD format이면 true를 반환한다.', () => {
      isValidYYYYMMDDFormat('2019/11/11').should.be.true();
      isValidYYYYMMDDFormat('2019/2/3').should.be.true();
      isValidYYYYMMDDFormat('2019/3/31').should.be.true();
      isValidYYYYMMDDFormat('2019/2/31').should.be.true();
    });

    it('YYYY/MM/DD format아니면 false를 반환한다.', () => {
      isValidYYYYMMDDFormat('201911/11').should.be.false();
      isValidYYYYMMDDFormat('20191111').should.be.false();
      isValidYYYYMMDDFormat('2019/11/1/1').should.be.false();
    });

    it('year이 1000보다 작으면 false를 반환한다..', () => {
      isValidYYYYMMDDFormat('999/11/11').should.be.false();
      isValidYYYYMMDDFormat('111/11/11').should.be.false();
      isValidYYYYMMDDFormat('333/11/11').should.be.false();
    });

    it('year이 9999보다 크면 false를 반환한다..', () => {
      isValidYYYYMMDDFormat('10000/11/11').should.be.false();
      isValidYYYYMMDDFormat('99999/11/11').should.be.false();
      isValidYYYYMMDDFormat('11111/11/11').should.be.false();
      isValidYYYYMMDDFormat('33333/11/11').should.be.false();
    });

    it('month가 12보다 크면 false를 반환한다..', () => {
      isValidYYYYMMDDFormat('2019/13/11').should.be.false();
      isValidYYYYMMDDFormat('2019/14/11').should.be.false();
      isValidYYYYMMDDFormat('2019/15/11').should.be.false();
      isValidYYYYMMDDFormat('2019/16/11').should.be.false();
    });

    it('day가 31보다 크면 false를 반환한다..', () => {
      isValidYYYYMMDDFormat('2019/12/32').should.be.false();
      isValidYYYYMMDDFormat('2019/12/33').should.be.false();
      isValidYYYYMMDDFormat('2019/12/34').should.be.false();
      isValidYYYYMMDDFormat('2019/12/35').should.be.false();
    });
  });

  it('from의 길이가 100이상이면 ', () => {
    const from = '*'.repeat(101);
    try {
      checkSearchQuery({ from });
    } catch (err) {
      const { errorCode, fieldErrors } = err;
      errorCode.status.should.be.equals(400);
      fieldErrors[0].field.should.be.equals('from');
      fieldErrors[0].value.should.be.equals(from);
    }
  });

  it('to의 길이가 100이상이면 ', () => {
    const to = '*'.repeat(101);
    try {
      checkSearchQuery({ to });
    } catch (err) {
      const { errorCode, fieldErrors } = err;
      errorCode.status.should.be.equals(400);
      fieldErrors[0].field.should.be.equals('to');
      fieldErrors[0].value.should.be.equals(to);
    }
  });

  it('content의 길이가 100이상이면 ', () => {
    const content = '*'.repeat(101);
    try {
      checkSearchQuery({ content });
    } catch (err) {
      const { errorCode, fieldErrors } = err;
      errorCode.status.should.be.equals(400);
      fieldErrors[0].field.should.be.equals('content');
      fieldErrors[0].value.should.be.equals(content);
    }
  });

  it('subject의 길이가 100이상이면 ', () => {
    const subject = '*'.repeat(101);
    try {
      checkSearchQuery({ subject });
    } catch (err) {
      const { errorCode, fieldErrors } = err;
      errorCode.status.should.be.equals(400);
      fieldErrors[0].field.should.be.equals('subject');
      fieldErrors[0].value.should.be.equals(subject);
    }
  });

  it('subject의 길이가 100이하면 true를 반환한다. ', () => {
    let subject = '*'.repeat(12);
    checkSearchQuery({ subject }).should.be.true();
    subject = '*'.repeat(99);
    checkSearchQuery({ subject }).should.be.true();
    subject = '*'.repeat(100);
    checkSearchQuery({ subject }).should.be.true();
    subject = '*'.repeat(1);
    checkSearchQuery({ subject }).should.be.true();
    subject = '*'.repeat(0);
    checkSearchQuery({ subject }).should.be.true();
  });

  it('to의 길이가 100이하면 true를 반환한다. ', () => {
    let to = '*'.repeat(12);
    checkSearchQuery({ to }).should.be.true();
    to = '*'.repeat(99);
    checkSearchQuery({ to }).should.be.true();
    to = '*'.repeat(100);
    checkSearchQuery({ to }).should.be.true();
    to = '*'.repeat(1);
    checkSearchQuery({ to }).should.be.true();
    to = '*'.repeat(0);
    checkSearchQuery({ to }).should.be.true();
  });

  it('from의 길이가 100이하면 true를 반환한다. ', () => {
    let from = '*'.repeat(12);
    checkSearchQuery({ from }).should.be.true();
    from = '*'.repeat(99);
    checkSearchQuery({ from }).should.be.true();
    from = '*'.repeat(100);
    checkSearchQuery({ from }).should.be.true();
    from = '*'.repeat(1);
    checkSearchQuery({ from }).should.be.true();
    from = '*'.repeat(0);
    checkSearchQuery({ from }).should.be.true();
  });
});
