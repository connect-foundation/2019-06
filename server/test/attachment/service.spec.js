/* eslint-disable no-undef */
import should from 'should';
import service from '../../src/v1/mail/attachment/service';
import DB from '../../src/database';
import mock from '../../mock/create-dummy-data';
import bulkMock from '../../mock/create-large-amount-data';

describe.only('attachment service는...', () => {
  before(async () => {
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await DB.sequelize.sync({ force: true });
    await DB.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await mock();
    await bulkMock();
  });

  describe('service.getAttachment...', () => {
    it('없는 attachment이면 404 에러를 던진다.', async () => {
      const attachmentNo = Number.MAX_SAFE_INTEGER;
      const email = 'root@daitnu.com';
      try {
        await service.getAttachment({ attachmentNo, email });
      } catch (err) {
        const { errorCode } = err;
        errorCode.status.should.be.equals(404);
      }
    });

    it('권힌이 없는 첨부파일이면 404 에러를 던진다.', async () => {
      const attachmentNo = 1;
      const email = 'roooott@daitnu.com';
      try {
        await service.getAttachment({ attachmentNo, email });
      } catch (err) {
        const { errorCode } = err;
        errorCode.status.should.be.equals(404);
      }
    });
  });
});
