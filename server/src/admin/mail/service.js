/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import DB from '../../database/index';
import { aesDecrypt } from '../../libraries/crypto';
import nodemailer from 'nodemailer';
import U from '../../libraries/mail-util';
import { makeMimeMessage } from '../../libraries/mimemessage';
import { saveSentMail } from '../../libraries/save-to-infra';

const ALLOWED_TIME = 10;

const sendResrvationMail = async mail => {
  const { owner, MailTemplate } = mail;
  const { from, to, subject, text } = MailTemplate;

  try {
    const user = await DB.User.findOneByNo(owner);
    user.password = aesDecrypt(user.imap_password);
    const transporter = nodemailer.createTransport(U.getTransport(user));
    const mailContents = U.getSingleMailData({ from, to, subject, text });

    const { messageId } = await transporter.sendMail(mailContents);
    const msg = makeMimeMessage({ messageId, mailContents });
    saveSentMail({ user, msg });
    mail.reservation_time = null;
    await mail.save();
  } catch (err) {}
};

const getReservationMails = async () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + ALLOWED_TIME);

  const mails = await DB.Mail.findOldDateMail(date);
  for (const mail of mails) {
    sendResrvationMail(mail);
  }
  return {
    mails,
  };
};

export default {
  getReservationMails,
};
