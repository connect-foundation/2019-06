import DB from '../database/index';

export const WASTEBASKET_NAME = '휴지통';
export const SENT_MAILBOX_NAME = '보낸메일함';
export const WROTE_TO_ME_MAILBOX_NAME = '내게쓴메일함';

export const DEFAULT_MAIL_QUERY_OPTIONS = {
  category: 0,
  page: 1,
  perPageNum: 100,
  sort: 'datedesc',
};

export const SORT_TYPE = {
  datedesc: [[DB.MailTemplate, 'createdAt', 'DESC']],
  dateasc: [[DB.MailTemplate, 'createdAt', 'ASC']],
  subjectdesc: [[DB.MailTemplate, 'subject', 'DESC']],
  subjectasc: [[DB.MailTemplate, 'subject', 'ASC']],
  fromdesc: [[DB.MailTemplate, 'from', 'DESC']],
  fromasc: [[DB.MailTemplate, 'from', 'ASC']],
};

export const FILE_MAX_COUNT = 5;
export const MB = 1000 ** 2;
export const FILE_MAX_SIZE = 10 * MB;

export const MAILBOX_NAME_LENGTH_LIMIT = 20;

export const UNAVAILABLE_EXTENSION = {
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
