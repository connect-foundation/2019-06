import mimemessage from 'mimemessage';
import moment from 'moment';

const DATE_RFC2822 = 'ddd, DD MMM YYYY HH:mm:ss ZZ';

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
export const makeMimeMessage = ({ messageId, mailContents, date }) => {
  const msg = mimemessage.factory({
    contentType: 'multipart/mixed',
    body: [],
  });
  const { from, to, subject, text, attachments } = mailContents;
  msg.header('Message-ID', messageId);
  msg.header('From', from);
  msg.header('To', to);
  msg.header('Subject', subject);

  if (!date) {
    msg.header('Date', moment().format(DATE_RFC2822));
  } else {
    msg.header('Date', date);
  }

  msg.body.push(getTextEntity({ text }));
  makeAttachmentsEntity({ msg, attachments });
  return msg;
};
