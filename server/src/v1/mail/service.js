/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import DB from '../../database/index';

const getRawMails = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceivedMail(userNo, userEmail);
  return mails;
};

const sendMail = async ({ from, to, subject, text, attachments = [] }) => {
  const { DEFAULT_DOMAIN_NAME, MAIL_AUTH_USER, MAIL_AUTH_PASS } = process.env;
  const transporter = nodemailer.createTransport({
    host: DEFAULT_DOMAIN_NAME,
    port: 465,
    secure: true,
    auth: {
      user: MAIL_AUTH_USER,
      pass: MAIL_AUTH_PASS,
    },
  });

  attachments = attachments.map(attachment => ({
    // filename, buffer -> content, mimetype -> contentType
    filename: attachment.originalname,
    content: attachment.buffer,
    contentType: attachment.mimetype,
  }));

  const mailContents = {
    from,
    to,
    subject,
    text,
    attachments,
  };

  await transporter.sendMail(mailContents);
  return mailContents;
};

export default { getRawMails, sendMail };
