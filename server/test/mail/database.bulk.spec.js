/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';
import bulkMock from '../../mock/create-large-amount-data';

describe('Mail bulk query test', () => {
  before(async () => {
    await DB.sequelize.sync({ force: true });
    await mock();
    await bulkMock();
  });

  it('내 메일 전체보기 메일리스트에 남의 메일은 존재하지 않는다.', async () => {
    const email = 'rooot@daitnu.com';
    const userNo = 1;

    const mailFilter = {};
    const mailTemplateFilter = {
      from: {
        [DB.Sequelize.Op.not]: email,
      },
    };

    const myMails = await DB.Mail.findAllFilteredMail({userNo, mailFilter, mailTemplateFilter});
    const filteredMails = myMails.filter(mail => mail.owner !== userNo);
    filteredMails.should.have.length(0);
  });

  it('읽지 않은 메일리스트에는 읽은 메일이 존재하지 않는다.', async () => {
    const email = 'rooot@daitnu.com';
    const userNo = 1;

    const mailFilter = {
      is_read: false,
    };
    const mailTemplateFilter = {
      from: {
        [DB.Sequelize.Op.not]: email,
      },
    };

    const unreadMails = await DB.Mail.findAllFilteredMail({userNo, mailFilter, mailTemplateFilter});
    const filteredMails = unreadMails.filter(mail => mail.is_read);
    filteredMails.should.have.length(0);
  });

  it('휴지통에는 is_removed가 true인 메일만 존재한다.', async () => {
    const email = 'rooot@daitnu.com';
    const userNo = 1;

    const mailFilter = {
      is_removed: true,
    };
    const mailTemplateFilter = {
      from: {
        [DB.Sequelize.Op.not]: email,
      },
    };

    const trashCan = await DB.Mail.findAllFilteredMail({userNo, mailFilter, mailTemplateFilter});
    const filteredMails = trashCan.filter(mail => !mail.is_removed);
    filteredMails.should.have.length(0);
  });

  it('카테고리 메일함에는 지정된 카테고리No mail만 존재한다.', async () => {
    const email = 'rooot@daitnu.com';
    const userNo = 1;
    const categoryNo = 1;

    const mailFilter = {
      category_no: categoryNo,
    };
    const mailTemplateFilter = {
      from: {
        [DB.Sequelize.Op.not]: email,
      },
    };

    const categoryMails = await DB.Mail.findAllFilteredMail({userNo, mailFilter, mailTemplateFilter});
    const filteredMails = categoryMails.filter(mail => mail.category_no !== categoryNo);
    filteredMails.should.have.length(0);
  });

  it('메일에 attachment가 있다면 모두 포함되어 반환된다..', async () => {
    const userNo = 1;

    const mailFilter = {};
    const mailTemplateFilter = {
      no: 1,
    };
    const options = {
      limit: 1,
      raw: false,
    }

    const mail = await DB.Mail.findAllFilteredMail({userNo, mailFilter, mailTemplateFilter,options});
    mail[0].dataValues.MailTemplate.Attachments.should.have.length(5);
  });
});
