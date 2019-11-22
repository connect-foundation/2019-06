/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import DB from '../../database/index';
import U from '../../libraries/mail-util';

const saveAttachments = async (attachments, mailTemplateNo, transaction) => {
  const processedAttachments = attachments.map(attachment => {
    const { contentType, filename, content } = attachment;
    return { type: contentType, name: filename, content, mail_template_id: mailTemplateNo };
  });

  await DB.Attachment.bulkCreate(processedAttachments, { transaction });
};

const saveMail = async (mailContents, transaction) => {
  const mailTemplateResult = await DB.MailTemplate.create(
    { ...mailContents, to: mailContents.to.join(',') },
    { transaction },
  );
  const mailTemplate = mailTemplateResult.get({ plain: true });
  const user = await DB.User.findOneById(mailContents.from.split('@')[0], { transaction });
  await DB.Mail.create(
    {
      owner: user.no,
      mail_template_id: mailTemplate.no,
    },
    { transaction },
  );
  await saveAttachments(mailContents.attachments, mailTemplate.no, transaction);
};

const sendMail = async mailContents => {
  const transporter = nodemailer.createTransport(U.getTransport());
  await DB.sequelize.transaction(async transaction => await saveMail(mailContents, transaction));
  await transporter.sendMail(mailContents);
  return mailContents;
};

export default { getMailsByOptions, sendMail, getQueryByOptions };
