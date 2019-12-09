import ERROR_CODE from '../exception/error-code';
import ErrorField from '../exception/error-field';
import ErrorResponse from '../exception/error-response';

const MB = 1000 * 1000;
const FILE_MAX_SIZE = 10 * MB;

const UNAVAILABLE_EXTENSION = {
  bat: true,
  cmd: true,
  com: true,
  cpl: true,
  exe: true,
  js: true,
  scr: true,
  vds: true,
  wsf: true,
  jse: true,
  adp: true,
  chm: true,
  hta: true,
  lnk: true,
  mde: true,
  msc: true,
  msi: true,
  msp: true,
  mst: true,
  pif: true,
  sct: true,
  shb: true,
  vb: true,
  vbe: true,
  wsc: true,
  wsh: true,
  ade: true,
  jar: true,
  bas: true,
  cer: true,
  crt: true,
  der: true,
  gadget: true,
  hlp: true,
  inf: true,
  mad: true,
  maf: true,
  mag: true,
  mam: true,
  maq: true,
  mar: true,
  mas: true,
  mat: true,
  mau: true,
  mav: true,
  maw: true,
  mda: true,
  mdb: true,
  mdt: true,
  mdw: true,
  mdz: true,
  reg: true,
  scf: true,
  shs: true,
  ps1: true,
  ps1xml: true,
  ps2: true,
  ps2xml: true,
  psc1: true,
  psc2: true,
  url: true,
  grp: true,
  xbap: true,
  ocx: true,
  nsh: true,
  sys: true,
  vxd: true,
  jnlp: true,
};

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
    throw errors.join('  ');
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
