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

  describe('updateMail 함수는...', () => {
    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    it('# 2번 메일의 category_no를 8로 변경한다.', async () => {
      const props = { category_no: 8 };
      const mail = await service.updateMail(2, props, 2);
      mail.should.be.have.properties(props);
    });

    it('# 2번 메일의 category_no를 없는 번호로 변경하면 ERROR_CODE는 CATEGORY_NOT_FOUND이다.', async () => {
      try {
        const props = { category_no: -1 };
        const mail = await service.updateMail(2, props, 2);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.CATEGORY_NOT_FOUND);
      }
    });

    it('# 존재하지 않는 번호가 들어왔을 때는 ERROR_CODE는 MAIL_NOT_FOUND이다.', async () => {
      try {
        const mail = await service.updateMail(10001, {}, 2);
      } catch (error) {
        const { errorCode } = error;
        errorCode.should.be.eql(ERROR_CODE.MAIL_NOT_FOUND);
      }
    });

    it('# 5번 메일을 중요 메일로 변경한다.', async () => {
      const props = { is_important: true };
      const mail = await service.updateMail(5, props, 2);
      mail.should.be.have.properties(props);
    });

    it('# 5번 메일을 읽은 메일로 변경한다.', async () => {
      const props = { is_read: true };
      const mail = await service.updateMail(5, props, 2);
      mail.should.be.have.properties(props);
    });
  });

  describe('removeMail 함수는...', () => {
    before(async () => {
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
      await DB.sequelize.sync({ force: true });
      await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
      await mock();
    });

    it('# 2번 메일을 삭제한다.', async () => {
      const isDeleted = await service.removeMail(2);
      isDeleted.should.be.eql(true);
    });

    it('# 이미 삭제한 2번 메일을 삭제한다.', async () => {
      const isDeleted = await service.removeMail(2);
      isDeleted.should.be.eql(false);
    });

    it('# 유효하지 않는 번호의 메일을 삭제한다.', async () => {
      const isDeleted = await service.removeMail(-1);
      isDeleted.should.be.eql(false);
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
      const [updated] = await service.updateMails(nos, props, 1);
      updated.should.be.eql(4);
    });

    it('# 1,4,-1,10번 메일의 category_no를 3로 변경하면 3개만 변경', async () => {
      const nos = [1, 4, -1, 10];
      const props = { category_no: 3 };
      const [updated] = await service.updateMails(nos, props, 1);
      updated.should.be.eql(3);
    });

    it('# 1,1,1,1번 메일의 category_no를 4로 변경하면 1개만 변경', async () => {
      const nos = [1, 1, 1, 1];
      const props = { category_no: 4 };
      const [updated] = await service.updateMails(nos, props, 1);
      updated.should.be.eql(1);
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
});
