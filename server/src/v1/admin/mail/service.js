/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */

import DB from '../../../database/index';
import { aesDecrypt } from '../../../libraries/crypto';
import U from '../../../libraries/mail-util';
import { makeMimeMessage } from '../../../libraries/mimemessage';
import { saveToMailbox } from '../../../libraries/imap';
import { getStream } from '../../../libraries/storage/ncloud';

const AVAILABLE_TIME = 10;

const SENT_MAILBOX_NAME = '보낸메일함';

const getFileNameAndBufferFromAttachment = ({ url, name }) => {
  const stream = getStream(url);

  return new Promise(resolve => {
    stream.on('data', buffer => {
      resolve({ buffer, originalname: name });
    });
  });
};

const sendReservationMail = async (user, mail) => {
  const { MailTemplate, reservation_time } = mail;
  const { from, to, subject, text, html, Attachments } = MailTemplate;

  const mailboxName = SENT_MAILBOX_NAME;

  const tasks = Attachments.map(attachment => getFileNameAndBufferFromAttachment(attachment));
  const attachments = await Promise.all(tasks);

  const mailContents = U.getSingleMailData({ from, to, subject, html, text, attachments });
  mailContents.date = reservation_time;

  const { messageId } = await U.sendMail(mailContents);
  const msg = makeMimeMessage({ messageId, mailContents, date: reservation_time });
  saveToMailbox({ user, msg, mailboxName });

  mail.destroy();
};

const sendReservationMailsOfOwner = async (owner, mails) => {
  const user = await DB.User.findByPk(owner, { raw: true });

  user.password = aesDecrypt(user.imap_password);

  for (const mail of mails) {
    await sendReservationMail(user, mail);
  }
};

const handleReservationMails = async () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + AVAILABLE_TIME);

  const mailsFromDB = await DB.Mail.findAllPastReservationMailByDate(date);
  const mailsPerUser = {};

  for (const mail of mailsFromDB) {
    if (!mailsPerUser[mail.owner]) {
      mailsPerUser[mail.owner] = [];
    }
    mailsPerUser[mail.owner].push(mail);
  }

  for (const [owner, mails] of Object.entries(mailsPerUser)) {
    sendReservationMailsOfOwner(owner, mails);
  }
};

export default {
  handleReservationMails,
};
