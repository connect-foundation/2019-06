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

export const saveSentMail = ({ user, msg }) => {
  const imap = getImap(user);

  imap.once('ready', () => {
    imap.openBox(SENT_MAILBOX, false, err => {
      if (err) throw err;
      imap.append(msg.toString());
      imap.end();
    });
  });

  imap.once('error', err => {
    throw err;
  });

  imap.connect();
};

export const addMailBox = ({ user, name }) => {
  const imap = getImap(user);
  imap.addBox(PREFIX + name, err => {
    throw err;
  });
};
