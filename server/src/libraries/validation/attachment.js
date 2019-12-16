import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';
import { FILE_MAX_SIZE, UNAVAILABLE_EXTENSION } from '../../constant/mail';

const add = (a, b) => a + b;

const getTotalSize = sizes => {
  const sum = sizes.reduce(add, 0);
  return sum;
};

const checkExtension = fileNames => {
  const errors = [];
  for (const fileName of fileNames) {
    const splitedFileName = fileName.split('.');
    let extension = splitedFileName[splitedFileName.length - 1];
    extension = extension.toLowerCase();

    if (UNAVAILABLE_EXTENSION[extension]) {
      errors.push(fileName);
    }
  }

  if (errors.length > 0) {
    throw errors.join(' ');
  }
  return true;
};

const checkAttachment = files => {
  const sizes = files.map(file => file.size);
  const fileNames = files.map(file => file.originalname);
  const errorFields = [];

  const totalSize = getTotalSize(sizes);
  if (FILE_MAX_SIZE < totalSize) {
    const errorField = new ErrorField('size', totalSize, '파일크기가 큽니다.');
    errorFields.push(errorField);
  }

  try {
    checkExtension(fileNames);
  } catch (error) {
    const errorField = new ErrorField(
      'file extension',
      error,
      '허용되지 않는 확장자가 포함되어 있습니다.',
    );
    errorFields.push(errorField);
  }

  if (errorFields.length > 0) {
    throw new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorFields);
  }

  return true;
};

export { checkAttachment, checkExtension, getTotalSize };
