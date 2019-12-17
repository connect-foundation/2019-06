/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';

import DB from '../../../database/index';
import { aesDecrypt } from '../../../libraries/crypto';
import U from '../../../libraries/mail-util';
import { makeMimeMessage } from '../../../libraries/mimemessage';
import { saveToMailbox } from '../../../libraries/imap';
import { getStream } from '../../../libraries/storage/ncloud';

const ALLOWED_TIME = 10;

const SENT_MAILBOX_NAME = '보낸메일함';

const getFileNameAndBufferFromAttachment = async ({ url, name }) => {
  const stream = getStream(url);

  const buffer = await new Promise(resolve => {
    stream.on('data', data => {
      resolve(data);
    });
  });

  return { buffer, originalname: name };
};

const sendResrvationMail = async mail => {
  const { owner, MailTemplate, reservation_time } = mail;
  const { from, to, subject, text, Attachments } = MailTemplate;
  const mailboxName = SENT_MAILBOX_NAME;

  const user = await DB.User.findByPk(owner, { raw: true });
  user.password = aesDecrypt(user.imap_password);

  const promises = Attachments.map(attachment => getFileNameAndBufferFromAttachment(attachment));
  const attachments = await Promise.all(promises);

  const mailContents = U.getSingleMailData({ from, to, subject, text, attachments });
  mailContents.date = reservation_time;

  const { messageId } = await U.sendMail(mailContents);
  const msg = makeMimeMessage({ messageId, mailContents, date: reservation_time });
  saveToMailbox({ user, msg, mailboxName });

  mail.reservation_time = null;
  await mail.save();

  return mail;
};

const handleReservationMails = async () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + ALLOWED_TIME);

  const mails = await DB.Mail.findAllPastReservationMailByDate(date);
  const promises = [];
  for (const mail of mails) {
    promises.push(sendResrvationMail(mail));
  }

  const successMails = await Promise.all(promises);

  return successMails;
};

export default {
  handleReservationMails,
};
