import mimemessage from 'mimemessage';

const getTextEntity = ({ html, text }) => {
  const alternateEntity = mimemessage.factory({
    contentType: 'multipart/alternate',
    body: [],
  });
  const htmlEntity = mimemessage.factory({
    contentType: 'text/html;charset=utf-8',
    body: html,
  });
  const plainEntity = mimemessage.factory({
    body: text,
  });

  alternateEntity.body.push(htmlEntity);
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
export const makeMimeMessage = ({ messageId, html, text, attachments }) => {
  const msg = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: [],
  });
  msg.header('Message-ID', messageId);
  msg.body.push(getTextEntity({ html, text }));
  makeAttachmentsEntity({ msg, attachments });
  return msg;
};
