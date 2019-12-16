import Imap from 'imap';
import ErrorField from './exception/error-field';
import ErrorResponse from './exception/error-response';
import ERROR_CODE from './exception/error-code';
import U from './mail-util';

const { DEFAULT_DOMAIN_NAME, IMAP_PORT } = process.env;
const EXP_EXTRACT_RECEIVER = /<.{3,40}@.{3,40}>/;
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

const connectImap = ({ email, password }, callback) =>
  new Promise((resolve, reject) => {
    const imap = getImap({ email, password });

    imap.once('ready', () => {
      resolve(callback(imap));
    });

    imap.once('error', err => {
      reject(err);
    });

    imap.connect();
  });

const getRawBoxes = imap =>
  new Promise((resolve, reject) => {
    imap.getBoxes((err, box) => {
      if (err) reject(err);
      const boxes = [];
      const pushBoxNames = (mailbox, parentName) => {
        for (const [mailboxName, mailboxAttributes] of Object.entries(mailbox)) {
          if (parentName !== '') {
            boxes.push(parentName + mailboxName);
          } else {
            boxes.push(mailboxName);
          }
          if (mailboxAttributes.children) {
            pushBoxNames(mailboxAttributes.children, `${parentName}${mailboxName}.`);
          }
        }
      };
      resolve((pushBoxNames(box, ''), boxes));
    });
  });

const insertMesssageId = (mailBox, value) => {
  const messageIdValue = value
    .trim()
    .split(':')[1]
    .trim();
  const realId = EXP_EXTRACT_RECEIVER.exec(messageIdValue);
  if (realId) {
    mailBox.push(realId[0].slice(1, -1));
  } else {
    mailBox.push(messageIdValue);
  }
};

export const getImapMessageIds = async ({ user }) => {
  const { email, password } = user;
  const messages = {};
  await connectImap({ email, password }, async imap => {
    const imapBoxes = await getRawBoxes(imap);
    const gatheringMessageIds = (boxes, i) =>
      new Promise((resolve, reject) => {
        if (boxes.length === i) {
          return resolve(messages);
        }

        imap.openBox(boxes[i], true, (openErr, box) => {
          if (openErr) reject(openErr);
          messages[boxes[i]] = [];
          if (!box || box.messages.total === 0) {
            return resolve(gatheringMessageIds(boxes, i + 1));
          }
          const f = imap.seq.fetch('1:*', {
            bodies: 'HEADER.FIELDS (MESSAGE-ID)',
            struct: true,
          });
          f.on('message', msg => {
            msg.on('body', stream => {
              let messageId = '';
              stream.on('data', chunk => {
                messageId += chunk.toString('utf8');
              });
              stream.once('end', () => {
                insertMesssageId(messages[boxes[i]], messageId);
              });
            });
          });
          f.once('error', fetchErr => {
            reject(fetchErr);
          });
          f.once('end', () => {
            return resolve(gatheringMessageIds(boxes, i + 1));
          });
        });
      });
    await gatheringMessageIds(imapBoxes, 0);
    imap.end();
  });
  return messages;
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
      imap.search(U.makeSearchArgs(searchArgs), (searchErr, results) => {
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
          imap.end();
        });
      });
    });
  });
};

export const saveToMailbox = ({ user, msg, mailboxName }) => {
  connectImap(user, imap => {
    imap.append(msg.toString(), { mailbox: PREFIX + mailboxName }, err => {
      if (err) {
        const errorField = new ErrorField('mailBox', mailboxName, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
      imap.end();
    });
  });
};

export const addMailBox = ({ user, name }) => {
  connectImap(user, imap => {
    imap.addBox(PREFIX + name, err => {
      if (err) {
        const errorField = new ErrorField('mailBox', name, '존재하지 않는 메일함입니다');
        throw new ErrorResponse(ERROR_CODE.MAILBOX_NOT_FOUND, errorField);
      }
      imap.end();
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
      imap.end();
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
      imap.end();
    });
  });
};
