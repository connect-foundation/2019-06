/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import DB from '../../database/index';
import U from './util';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const getRawMails = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceivedMail(userNo, userEmail);
  return mails;
};

const saveAttachments = async (attachments, mailTemplateNo) => {
  try {
    await attachments.forEach(async attachment => {
      const { contentType: type, name, content } = attachment;
      await DB.Attachment.create({
        mail_template_id: mailTemplateNo,
        type,
        name,
        content,
      });
    });
  } catch (error) {
    throw new ErrorResponse(ERROR_CODE.FAIL_TO_SAVE_ATTACHMENT);
  }
};

const saveMail = async mailContents => {
  try {
    const mailTemplateResult = await DB.MailTemplate.create(mailContents);
    const mailTemplate = mailTemplateResult.get({ plain: true });
    const user = await DB.User.findOneById(mailContents.from.split('@')[0]);
    await DB.Mail.create({
      owner: user.no,
      mail_template_id: mailTemplate.no,
    });
    await saveAttachments(mailContents.attachments, mailTemplate.no);
  } catch (error) {
    throw new ErrorResponse(ERROR_CODE.FAIL_TO_SAVE_MAIL);
  }
};

const sendMail = async mailContents => {
  const transporter = nodemailer.createTransport(U.getTransport());
  await transporter.sendMail(mailContents);
  await saveMail(mailContents);
  return mailContents;
};

export default { getRawMails, sendMail };
