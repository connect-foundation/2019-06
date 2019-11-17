import DB from '../src/database';

const bulkCreateMailTemplate = async () => {
  const mailTemplates = [];

  for (let i = 0; i < 10; i += 1) {
    const mailTemplate = {
      from: `root${i}@daitnu.com`,
      to: 'daitnu@daitnu.com,daitne@daitnu.com',
      subject: `제목입니다${i}.ㅎㅎ`,
      body: `바디입니다${i}.ㅎㅎㅎ`,
    };
    mailTemplates.push(mailTemplate);
  }
  await DB.MailTemplate.bulkCreate(mailTemplates);
};

const bulkCreateMail = async () => {
  const mails = [];
  for (let i = 0; i < 10000; i += 1) {
    const mail = {
      owner: 1,
      mail_template_id: (i % 10) + 1,
      is_read: i % 2 === 0,
      is_important: i % 3 === 0,
      is_removed: i % 5 === 0,
    };
    mails.push(mail);
  }

  await DB.Mail.bulkCreate(mails);
};

const bulkCreateAttachment = async () => {
  const attachments = [];

  for (let i = 0; i < 10; i += 1) {
    const attachment = {
      mail_template_id: (i % 2) + 1,
      type: 'image',
      name: `attachment-${i + 1}`,
      content: 'content',
    };

    attachments.push(attachment);
  }

  await DB.Attachment.bulkCreate(attachments);
};

const bulkCreate = async () => {
  await bulkCreateMailTemplate();
  await bulkCreateMail();
  await bulkCreateAttachment();
};

export default bulkCreate;
