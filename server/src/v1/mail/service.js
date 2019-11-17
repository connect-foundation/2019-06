/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import DB from '../../database/index';
import U from '../../libraries/mail-util';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const getRawMails = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceivedMail(userNo, userEmail);
  return mails;
};

const saveAttachments = async (attachments, mailTemplateNo) => {
  const processedAttachments = attachments.map(attachment => {
    const { type, name, content } = attachment;
    return { contentType: type, name, content, mail_template_id: mailTemplateNo };
  });

  try {
    await DB.Attachment.bulkCreate(processedAttachments);
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
  await saveMail(mailContents);
  await transporter.sendMail(mailContents);
  return mailContents;
};

export default { getRawMails, sendMail };
