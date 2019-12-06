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

  imap.once('error', err => {
    throw err;
  });

  imap.connect();
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
