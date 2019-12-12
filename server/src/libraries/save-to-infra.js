import Imap from 'imap';
import ErrorField from './exception/error-field';
import ErrorResponse from './exception/error-response';
import ERROR_CODE from './exception/error-code';

const { DEFAULT_DOMAIN_NAME, IMAP_PORT } = process.env;
const PREFIX = '';

const getImap = ({ email, password }) => {
  return new Imap({
    user: email,
    password,
    host: `mail.${DEFAULT_DOMAIN_NAME}`,
    port: IMAP_PORT,
    tls: true,
  });
};

const connectImap = ({ email, password }, callback) => {
  const imap = getImap({ email, password });

  imap.once('ready', () => {
    callback(imap);
    imap.end();
  });

  imap.once('error', () => {
    const errorField = new ErrorField(
      'fail to imap connection',
      '',
      'imap 서버와 연결하는데 실패하였습니다',
    );
    throw new ErrorResponse(ERROR_CODE.FAIL_TO_CONNECT_TO_IMAP, errorField);
  });

  imap.connect();
};

const makeArg = val => ['HEADER', 'MESSAGE-ID', val];

const makeSearchArgs = array => {
  if (!Array.isArray(array)) {
    throw new Error('argument must be array');
  }
  if (array.length === 0) {
    return [];
  }
  if (array.length === 1) {
    return [makeArg(array[0])];
  }

  let result = [],
    cur,
    prev;

  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      result.push(makeArg(array[i]));
    } else if (i === 1) {
      result.unshift('OR', makeArg(array[i]));
      prev = result;
    } else {
      cur = ['OR', prev[2], makeArg(array[i])];
      prev[2] = cur;
      prev = prev[2];
    }
  }
  return [result];
};

export const moveMail = ({ user, originBoxName, targetBoxName, searchArgs }) => {
  if (originBoxName === '받은메일함') {
    originBoxName = 'INBOX';
  }
  connectImap(user, imap => {
    imap.openBox(originBoxName, true, openErr => {
      if (openErr) {
        const errorField = new ErrorField('mailBox', originBoxName, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
      imap.search(makeSearchArgs(searchArgs), (searchErr, results) => {
        if (searchErr) {
          const errorField = new ErrorField('message-id', searchArgs, '메일 검색에 실패하였습니다');
          throw new ErrorResponse(ERROR_CODE.MAIL_NOT_FOUND, errorField);
        }
        imap.move(results, targetBoxName, moveErr => {
          if (moveErr) {
            const errorField = new ErrorField(
              'mailBox',
              targetBoxName,
              '메일 이동에 실패하였습니다',
            );
            throw new ErrorResponse(ERROR_CODE.FAIL_TO_MOVE_MAIL, errorField);
          }
        });
      });
    });
  });
};

export const saveToMailbox = ({ user, msg, mailboxName }) => {
  connectImap(user, imap => {
    imap.append(msg.toString(), { mailbox: PREFIX + mailboxName });
  });
};

export const addMailBox = ({ user, name }) => {
  connectImap(user, imap => {
    imap.addBox(PREFIX + name, err => {
      if (err) {
        const errorField = new ErrorField('mailBox', name, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
    });
  });
};

export const renameMailBox = ({ user, oldName, newName }) => {
  connectImap(user, imap => {
    imap.renameBox(PREFIX + oldName, PREFIX + newName, err => {
      if (err) {
        const errorField = new ErrorField('mailBox', oldName, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
    });
  });
};

export const deleteMailBox = ({ user, name }) => {
  connectImap(user, imap => {
    imap.delBox(PREFIX + name, err => {
      if (err) {
        const errorField = new ErrorField('mailBox', name, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
    });
  });
};
