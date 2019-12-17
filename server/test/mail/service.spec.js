/* eslint-disable no-undef */
import should from 'should';
import service from '../../src/v1/mail/service';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';
import bulkMock from '../../mock/create-large-amount-data';
import ERROR_CODE from '../../src/libraries/exception/error-code';

const names = ['받은메일함', '보낸메일함', '내게쓴메일함', '휴지통'];

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
      const data = await service.getMailsByOptions({ no: 1, waste_basket_no: 3 }, {});
      data.paging.should.be.properties('startPage', 'endPage', 'page', 'perPageNum', 'totalPage');
    });

    it('# 메일리스트 정보를 배열로 포함한다.', async () => {
      const data = await service.getMailsByOptions({ no: 1, waste_basket_no: 3 }, {});
      data.mails.should.an.instanceof(Array);
    });

    it('# perPageNum만큼 mail을 반환한다.', async () => {
      const options = {
        perPageNum: 2,
      };
      const data = await service.getMailsByOptions({ no: 1, waste_basket_no: 3 }, options);
      data.mails.should.have.length(2);
    });

    it('# category에 해당하는 메일들을 반환한다.', async () => {
      const category = 10;
      const options = {
        category,
      };
      const { mails } = await service.getMailsByOptions({ no: 1, waste_basket_no: 3 }, options);
      const length = mails.filter(mail => mail.category_no === category);
      length.should.have.length(0);
    });
  });

  describe('getQueryByOptions ...', () => {
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
      query.mailFilter.should.have.property('category_no');
    });

    it('# 매개변수 오브젝트에 sort가 없다면 query에도 order가 없다..', () => {
      const query = service.getQueryByOptions(data);
      query.should.not.have.property('order');
    });

    it('# 매개변수 오브젝트에 sort가 있으면 order가 존재한다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'dateasc' });
      query.should.have.property('order');
    });

    it('# 매개변수 오브젝트에 sort가 dateasc면 no asc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'dateasc' });
      const order = query.order.flat();
      order[1].should.be.equals('createdAt');
      order[2].should.be.equals('ASC');
    });

    it('# 매개변수 오브젝트에 sort가 datedesc면 no desc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'datedesc' });
      const order = query.order.flat();
      order[1].should.be.equals('createdAt');
      order[2].should.be.equals('DESC');
    });

    it('# 매개변수 오브젝트에 sort가 유효한 값이 아니면 order는 존재하지 않는다...', () => {
      let query = service.getQueryByOptions({ ...data, sort: 'ASD' });
      query.should.not.have.property(query.order);

      query = service.getQueryByOptions({ ...data, sort: 'asd' });
      query.should.not.have.property(query.order);

      query = service.getQueryByOptions({ ...data, sort: 'zxc' });
      query.should.not.have.property(query.order);

      query = service.getQueryByOptions({ ...data, sort: 'A34SD' });
      query.should.not.have.property(query.order);

      query = service.getQueryByOptions({ ...data, sort: '43#$G3' });
      query.should.not.have.property(query.order);
    });

    it('# 매개변수 오브젝트에 sort가 subjectdesc면 subject desc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'subjectdesc' });
      const order = query.order.flat();
      order[1].should.be.equals('subject');
      order[2].should.be.equals('DESC');
    });

    it('# 매개변수 오브젝트에 sort가 subjectdesc면 subject desc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'subjectasc' });
      const order = query.order.flat();
      order[1].should.be.equals('subject');
      order[2].should.be.equals('ASC');
    });

    it('# 매개변수 오브젝트에 sort가 fromdesc from desc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'fromdesc' });
      const order = query.order.flat();
      order[1].should.be.equals('from');
      order[2].should.be.equals('DESC');
    });

    it('# 매개변수 오브젝트에 sort가 subjectdesc면 subject desc 이다...', () => {
      const query = service.getQueryByOptions({ ...data, sort: 'fromasc' });
      const order = query.order.flat();
      order[1].should.be.equals('from');
      order[2].should.be.equals('ASC');
    });
  });

  describe('getCategories 함수는...', () => {
    it('# 1번이 가지고 있는 카테고리들을 반환한다.', async () => {
      const { categories } = await service.getCategories(1);
      categories.map(category => category.name).should.be.eql(names);
    });

    it('# 2번이 가지고 있는 카테고리들을 반환한다.', async () => {
      const { categories } = await service.getCategories(2);
      categories.map(category => category.name).should.be.eql(names);
    });

    it('# 3번이 가지고 있는 카테고리들을 반환한다.', async () => {
      const { categories } = await service.getCategories(3);
      categories.map(category => category.name).should.be.eql(names);
    });
  });

  describe('updateMails 함수는...', () => {
    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    it('# 1,4,7,10번 메일의 category_no를 4로 변경', async () => {
      const nos = [1, 4, 7, 10];
      const props = { category_no: 4 };
      const result = await service.updateMails(nos, props, 1);
      result.should.be.eql(true);
    });

    it('# 1,4,-1,10번 메일의 category_no를 3로 변경하면 MAIL_NOT_FOUND', async () => {
      const nos = [1, 4, -1, 10];
      const props = { category_no: 3 };
      try {
        await service.updateMails(nos, props, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });

    it('# 1,1,1,1번 메일의 category_no를 4로 변경하면 1개만 변경', async () => {
      const nos = [1, 1, 1, 1];
      const props = { category_no: 4 };
      const result = await service.updateMails(nos, props, 1);
      result.should.be.eql(true);
    });

    it('# 99999, 100001번 메일의 category_no를 3로 변경하면 MAIL_NOT_FOUND', async () => {
      const nos = [99999, 100001];
      const props = { category_no: 3 };
      try {
        await service.updateMails(nos, props, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });
  });

  describe('removeMails 함수는...', () => {
    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    it('# 1,4,7,10번 메일 영구 삭제하면 true', async () => {
      const nos = [1, 4, 7, 10];
      const isDeleted = await service.removeMails(nos, 1);
      isDeleted.should.be.eql(true);
    });

    it('# 이미 삭제한 1,4,7,10번 메일 영구 삭제하면 MAIL_NOT_FOUND', async () => {
      const nos = [1, 4, 7, 10];
      try {
        await service.removeMails(nos, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });

    it('# 2, 4번 메일 영구 삭제하면 MAIL_NOT_FOUND', async () => {
      const nos = [2, 4];
      try {
        await service.removeMails(nos, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });

    it('# 123123, -1번 메일 영구 삭제하면 MAIL_NOT_FOUND', async () => {
      const nos = [123123, -1];
      try {
        await service.removeMails(nos, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });

    it('# asd, sd, 1번 메일 영구 삭제하면 MAIL_NOT_FOUND', async () => {
      const nos = ['asd', 'sd', 1];
      try {
        await service.removeMails(nos, 1);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });
  });
});
