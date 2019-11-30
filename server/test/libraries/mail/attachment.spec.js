/* eslint-disable no-undef */
import should from 'should';
import {
  checkAttachment,
  checkMimeType,
  getTotalSize,
} from '../../../src/libraries/validation/attachment';

describe.only('attachment validation...', () => {
  describe('getTotalSize는......', () => {
    it('size의 총합을 반환한다.', () => {
      const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      getTotalSize(sizes).should.be.equals(55);

      const sizes2 = [1, 2, 3, 4, 5];
      getTotalSize(sizes2).should.be.equals(15);
    });
  });

  describe('checkMimeTyep은...', () => {
    it('사용가능한 mimetype이면 true를 반환한다.', () => {
      const mimetypes = ['application/vnd.ms-powerpoint', 'image/jpeg', 'application/json'];
      checkMimeType(mimetypes).should.be.true();
    });

    it('사용 불가능한 mimetype이면 false를 반환한다..', () => {
      let mimetypes = ['application/vnd.ms-powerpoint2'];
      checkMimeType(mimetypes).should.be.false();

      mimetypes = ['md'];
      checkMimeType(mimetypes).should.be.false();

      mimetypes = ['application/js'];
      checkMimeType(mimetypes).should.be.false();

      mimetypes = ['text/js'];
      checkMimeType(mimetypes).should.be.false();

      mimetypes = ['text/js', 'text/py'];
      checkMimeType(mimetypes).should.be.false();
    });
  });

  describe('checkAttachment은...', () => {
    const MB = 1024 * 1024;

    it('totalSize가 크면 에러를 반환한다..', () => {
      const files = [
        {
          size: 5 * MB,
          mimetype: 'text/plain',
        },
        {
          size: 5 * MB,
          mimetype: 'text/plain',
        },
        {
          size: 5 * MB,
          mimetype: 'text/plain',
        },
        {
          size: 5 * MB,
          mimetype: 'text/plain',
        },
        {
          size: 5 * MB,
          mimetype: 'text/plain',
        },
      ];
      try {
        checkAttachment(files);
      } catch (err) {
        console.log(err);
        const { errorCode, fieldErrors } = err;
        errorCode.status.should.be.equals(400);
        errorCode.message.should.be.equals('INVALID INPUT VALUE');
        fieldErrors[0].field.should.be.equals('size');
        fieldErrors[0].reason.should.be.equals('파일크기가 큽니다.');
      }
    });

    it('허용되지 않는 mimetype이 포함된경우 에러를 반환한다', () => {
      const files = [
        {
          size: MB,
          mimetype: 'text/value',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
      ];
      try {
        checkAttachment(files);
      } catch (err) {
        console.log(err);
        const { errorCode, fieldErrors } = err;
        errorCode.status.should.be.equals(400);
        errorCode.message.should.be.equals('INVALID INPUT VALUE');
        fieldErrors[0].field.should.be.equals('mimetype');
        fieldErrors[0].reason.should.be.equals('허용되지 않는 mimetype이 포함되어 있습니다.');
        fieldErrors[0].value.should.an.instanceof(Array);
      }
    });

    it('에러가 없으면 true를 반환한다..', () => {
      const files = [
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
        {
          size: MB,
          mimetype: 'text/plain',
        },
      ];
      checkAttachment(files).should.be.true();
    });
  });
});
