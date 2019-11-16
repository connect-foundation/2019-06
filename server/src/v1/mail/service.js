/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import DB from '../../database/index';
import U from './util';

const getRawMails = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceivedMail(userNo, userEmail);
  return mails;
};

const sendMail = async mailContents => {
  const transporter = nodemailer.createTransport(U.getTransport());
  await transporter.sendMail(mailContents);
  return mailContents;
};

export default { getRawMails, sendMail };
