/* eslint-disable no-undef */
import should from 'should';
import service from '../../src/v1/mail/service';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';
import bulkMock from '../../mock/create-large-amount-data';

describe('Mail Service Test', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
    await bulkMock();
  });

  describe('getMailsByOptions...', () => {
    it('# 페이징 정보를 포함한다.', async () => {
      const data = await service.getMailsByOptions(1, {});
      data.paging.should.be.properties('startPage', 'endPage', 'page', 'perPageNum', 'totalPage');
    });

    it('# 메일리스트 정보를 배열로 포함한다.', async () => {
      const data = await service.getMailsByOptions(1, {});
      data.mails.should.an.instanceof(Array);
    });

    it('# perPageNum만큼 mail을 반환한다.', async () => {
      const options = {
        perPageNum: 2,
      };
      const data = await service.getMailsByOptions(1, options);
      data.mails.should.have.length(2);
    });

    it('# category에 해당하는 메일들을 반환한다.', async () => {
      const category = 10;
      const options = {
        category,
      };
      const { mails } = await service.getMailsByOptions(1, options);
      const length = mails.filter(mail => mail.category_no === category);
      length.should.have.length(0);
    });
  });

  describe('getQueryByOptions...', () => {
    const data = { userNo: 1, category: 0, perPageNum: 10, page: 1 };

    it('# category가 0이면 category가 포함되지 않는다.', () => {
      const query = service.getQueryByOptions(data);
      query.should.not.have.property('category_no');
    });

    it('# category가 음수이면 category가 포함되지 않는다.', () => {
      const query = service.getQueryByOptions(data);
      query.should.not.have.property('category_no');
    });

    it('# category가 양수이면 category가 포함된다.', () => {
      const query = service.getQueryByOptions({ ...data, category: 1 });
      query.should.have.property('category_no');
    });
  });
});
