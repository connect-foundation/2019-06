/* eslint-disable no-undef */
import should from 'should';
import DB from '../../src/database';
import service from '../../src/v1/mail/template/service';
import mock from '../../mock/create-dummy-data';
import dummyMock from '../../mock/create-large-amount-data';

describe('mail template service는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
    await dummyMock();
  });

  describe('getAttachmentsByTemplateNo는...', () => {
    it('첨부파일을 배열로 반환한다..', async () => {
      const email = 'root@daitnu.com';
      const templateNo = 1;
      const result = await service.getAttachmentsByTemplateNo({ templateNo, email });
      result.should.an.instanceof(Array);
    });

    it('첨부파일을 no,templateNo,type,name 프로퍼티를 갖는다.', async () => {
      const email = 'root@daitnu.com';
      const templateNo = 1;
      const result = await service.getAttachmentsByTemplateNo({ templateNo, email });
      result[0].should.be.have.properties('no', 'templateNo', 'type', 'name');
    });

    it('권한이 없는 사용자면 404를 반환한다.', async () => {
      const email = 'root2@daitnu.com';
      const templateNo = 1;
      try {
        await service.getAttachmentsByTemplateNo({ templateNo, email });
      } catch (error) {
        error.errorCode.status.should.be.equals(404);
      }
    });

    it('첨부파일이 없으면 404를 반환한다.', async () => {
      const email = 'root9@daitnu.com';
      const templateNo = 12;
      try {
        await service.getAttachmentsByTemplateNo({ templateNo, email });
      } catch (error) {
        error.errorCode.status.should.be.equals(404);
      }
    });
  });
});
