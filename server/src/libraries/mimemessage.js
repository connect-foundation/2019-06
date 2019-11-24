import mimemessage from 'mimemessage';

const getTextEntity = ({ text }) => {
  const alternateEntity = mimemessage.factory({
    contentType: 'multipart/alternate',
    body: [],
  });
  const plainEntity = mimemessage.factory({
    body: text,
  });
  alternateEntity.body.push(plainEntity);

  return alternateEntity;
};

const makeAttachmentsEntity = ({ msg, attachments }) => {
  attachments.forEach(attachment => {
    const entity = mimemessage.factory({
      contentType: attachment.contentType,
      contentTransferEncoding: 'base64',
      body: attachment.content,
    });
    entity.header('Content-Disposition', `attachment ;filename="${attachment.filename}"`);
    msg.body.push(entity);
  });
};

// eslint-disable-next-line import/prefer-default-export
export const makeMimeMessage = ({ messageId, mailContents }) => {
  const msg = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: [],
  });
  const { from, to, subject, text, attachments } = mailContents;
  msg.header('Message-ID', messageId);
  msg.header('From', from);
  msg.header('To', to);
  msg.header('Subject', subject);
  msg.header('Date', new Date());
  msg.body.push(getTextEntity({ text }));
  makeAttachmentsEntity({ msg, attachments });
  return msg;
};
