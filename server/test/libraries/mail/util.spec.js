import should from 'should';
import MU from '../../../src/libraries/mail-util';

describe('Mail Util test...', () => {
  it('attachment에 undefined가 들어가면 빈 배열로 리턴된다', () => {
    const mockMail = {
      from: 'joajoa@daitnu.com',
      to: 'yaho@daitnu.com',
      subject: 'title이다',
      text: 'body이다',
      attachments: undefined,
    };
    MU.getSingleMailData(mockMail).should.be.properties({
      from: 'joajoa@daitnu.com',
      to: 'yaho@daitnu.com',
      subject: 'title이다',
      html: 'body이다',
      attachments: [],
    });
  });
});
