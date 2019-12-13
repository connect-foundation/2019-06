/* eslint-disable no-undef */
import should from 'should';
import { checkSearchQuery } from '../../../src/libraries/validation/mail';

describe.only('checkSearchQuery...', () => {
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

  it('content의 길이가 100이하면 true를 반환한다. ', () => {
    let content = '*'.repeat(12);
    checkSearchQuery({ content }).should.be.true();
    content = '*'.repeat(99);
    checkSearchQuery({ content }).should.be.true();
    content = '*'.repeat(100);
    checkSearchQuery({ content }).should.be.true();
    content = '*'.repeat(1);
    checkSearchQuery({ content }).should.be.true();
    content = '*'.repeat(0);
    checkSearchQuery({ content }).should.be.true();
  });
});
