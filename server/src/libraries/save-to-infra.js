import Imap from 'imap';

const SENT_MAILBOX = 'Private/Sent';
const { DEFAULT_DOMAIN_NAME, IMAP_PORT } = process.env;

// eslint-disable-next-line import/prefer-default-export
export const saveSentMail = ({ user, msg }) => {
  const imap = new Imap({
    user: user.email,
    password: user.password,
    host: `mail.${DEFAULT_DOMAIN_NAME}`,
    port: IMAP_PORT,
    tls: true,
  });

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
