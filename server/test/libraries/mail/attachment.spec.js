/* eslint-disable no-undef */
import should from 'should';
import {
  checkAttachment,
  checkExtension,
  getTotalSize,
} from '../../../src/libraries/validation/attachment';

describe('attachment validation...', () => {
  describe('getTotalSize는......', () => {
    it('size의 총합을 반환한다.', () => {
      const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      getTotalSize(sizes).should.be.equals(55);

      const sizes2 = [1, 2, 3, 4, 5];
      getTotalSize(sizes2).should.be.equals(15);
    });
  });

  describe('checkExtension은.....', () => {
    it('이용가능한 확장자면 true를 반환한다.', () => {
      const filenames = ['asd.png', 'dqw.jpg', 'ddqw.md', 'dqw.html'];
      checkExtension(filenames).should.be.true();
    });

    it('이용 불가능한 확장자면 throw을 던진다..', () => {
      const filenames = ['asd.png', 'dqw.jpg', 'ddqw.md', 'dqw.js'];
      try {
        checkExtension(filenames);
      } catch (error) {
        error.should.be.equals('dqw.js');
      }
    });

    it('이용 불가능한 확장자면 throw을 던진다2..', () => {
      const filenames = ['asd.ps1', 'dqw.scf', 'ddqw.md', 'dqw.js'];
      try {
        checkExtension(filenames);
      } catch (error) {
        error.should.be.equals('asd.ps1 dqw.scf dqw.js');
      }
    });

    it('이용 불가능한 확장자면 throw을 던진다3..', () => {
      const filenames = ['asd.png', 'dqw.bat', 'ddqw.md', 'dqw.js'];
      try {
        checkExtension(filenames);
      } catch (error) {
        error.should.be.equals('dqw.bat dqw.js');
      }
    });
  });

  describe('checkAttachment은...', () => {
    const MB = 1000 * 1000;

    it('totalSize가 크면 에러를 반환한다..', () => {
      const files = [
        {
          size: 5 * MB,
          originalname: 'tes.txt',
        },
        {
          size: 5 * MB,
          originalname: 'tes.txt',
        },
        {
          size: 5 * MB,
          originalname: 'tes.txt',
        },
        {
          size: 5 * MB,
          originalname: 'tes.txt',
        },
        {
          size: 5 * MB,
          originalname: 'tes.txt',
        },
      ];
      try {
        checkAttachment(files);
      } catch (err) {
        const { errorCode, fieldErrors } = err;
        errorCode.status.should.be.equals(400);
        errorCode.message.should.be.equals('INVALID INPUT VALUE');
        fieldErrors[0].field.should.be.equals('size');
        fieldErrors[0].reason.should.be.equals('파일크기가 큽니다.');
      }
    });

    it('허용되지 않는 extension이 포함된경우 에러를 반환한다', () => {
      const files = [
        {
          size: MB,
          originalname: 'tes.bat',
        },
        {
          size: MB,
          originalname: 'text/plain',
        },
        {
          size: MB,
          originalname: 'text/plain',
        },
        {
          size: MB,
          originalname: 'text/plain',
        },
        {
          size: MB,
          originalname: 'text/plain',
        },
      ];
      try {
        checkAttachment(files);
      } catch (err) {
        const { errorCode, fieldErrors } = err;
        errorCode.status.should.be.equals(400);
        errorCode.message.should.be.equals('INVALID INPUT VALUE');
        fieldErrors[0].field.should.be.equals('file extension');
        fieldErrors[0].reason.should.be.equals('허용되지 않는 확장자가 포함되어 있습니다.');
      }
    });

    it('에러가 없으면 true를 반환한다..', () => {
      const files = [
        {
          size: MB,
          originalname: 'tes.txt',
        },
        {
          size: MB,
          originalname: 'tes.txt',
        },
        {
          size: MB,
          originalname: 'tes.txt',
        },
        {
          size: MB,
          originalname: 'tes.txt',
        },
        {
          size: MB,
          originalname: 'tes.txt',
        },
      ];
      checkAttachment(files).should.be.true();
    });
  });
});
