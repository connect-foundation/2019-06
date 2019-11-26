import Imap from 'imap';

const PREFIX = 'Private/';
const SENT_MAILBOX = `${PREFIX}Sent`;
const { DEFAULT_DOMAIN_NAME, IMAP_PORT } = process.env;

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

export const saveSentMail = ({ user, msg }) => {
  connectImap(user, imap => {
    imap.openBox(SENT_MAILBOX, false, err => {
      if (err) throw err;
      imap.append(msg.toString());
    });
  });
};

export const addMailBox = ({ user, name }) => {
  connectImap(user, imap => {
    imap.addBox(PREFIX + name, err => {
      throw err;
    });
  });
};

export const renameMailBox = ({ user, oldName, newName }) => {
  connectImap(user, imap => {
    imap.renameBox(PREFIX + oldName, PREFIX + newName, err => {
      throw err;
    });
  });
};

export const deleteMailBox = ({ user, name }) => {
  connectImap(user, imap => {
    imap.delBox(PREFIX + name, err => {
      throw err;
    });
  });
};
