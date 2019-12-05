import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const MB = 1024 * 1024;
const FILE_MAX_SIZE = 9 * MB;

const AVAILABLE_MIME_TYPE = {
  'text/plain': true,
  'text/csv': true,
  'text/html': true,
  'application/vnd.ms-powerpoint': true,
  'application/haansoftxlsx': true,
  'application/pdf': true,
  'application/x-font-ttf': true,
  'application/zip': true,
  'application/json': true,
  'application/haansoftpptx': true,
  'application/vnd.ms-excel': true,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': true,
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': true,
  'application/msword': true,
  'image/jpeg': true,
  'image/png': true,
  'image/jpg': true,
  'image/bmp': true,
  'image/gif': true,
  '': true,
};

const add = (a, b) => a + b;

const getTotalSize = sizes => {
  const sum = sizes.reduce(add, 0);
  return sum;
};

const checkMimeType = mimetypes => mimetypes.every(mimetype => AVAILABLE_MIME_TYPE[mimetype]);

const checkAttachment = files => {
  const sizes = files.map(file => file.size);
  const mimetypes = files.map(file => file.mimetype);
  const errorFields = [];

  const totalSize = getTotalSize(sizes);
  if (FILE_MAX_SIZE < totalSize) {
    const errorField = new ErrorField('size', totalSize, '파일크기가 큽니다.');
    errorFields.push(errorField);
  }

  if (!checkMimeType(mimetypes)) {
    const errorField = new ErrorField(
      'mimetype',
      mimetypes,
      '허용되지 않는 mimetype이 포함되어 있습니다.',
    );
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export { checkAttachment, checkMimeType, getTotalSize };
