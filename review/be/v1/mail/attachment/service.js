import DB from '../../../database';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';
import { download, getStream } from '../../../libraries/storage/ncloud';

const getAttachment = async ({ attachmentNo, email }) => {
  const mailTemplateAndAttachment = await DB.Attachment.findAttachmentAndMailTemplateByPk(
    attachmentNo,
  );

  if (!mailTemplateAndAttachment) {
    throw new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND);
  }

  const to = mailTemplateAndAttachment['MailTemplate.to'];
  const from = mailTemplateAndAttachment['MailTemplate.from'];
  const tos = to.split(',').map(user => user.trim());
  const accessibleUsers = [from, ...tos];

  if (!accessibleUsers.some(user => user === email)) {
    throw new ErrorResponse(ERROR_CODE.PRIVATE_PATH);
  }

  const file = await download(mailTemplateAndAttachment.url);
  file.mimetype = mailTemplateAndAttachment.type;
  return file;
};

const getAttachmentStream = async ({ attachmentNo, email }) => {
  const mailTemplateAndAttachment = await DB.Attachment.findAttachmentAndMailTemplateByPk(
    attachmentNo,
  );

  if (!mailTemplateAndAttachment) {
    throw new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND);
  }

  const to = mailTemplateAndAttachment['MailTemplate.to'];
  const from = mailTemplateAndAttachment['MailTemplate.from'];
  const tos = to.split(',').map(user => user.trim());
  const accessibleUsers = [from, ...tos];

  if (!accessibleUsers.some(user => user === email)) {
    throw new ErrorResponse(ERROR_CODE.PRIVATE_PATH);
  }

  const isImage = mailTemplateAndAttachment.type.split('/')[0] === 'image';
  if (!isImage) {
    throw new ErrorResponse(ERROR_CODE.NOT_ALLOWED_PREVIEW_EXTENSION);
  }

  const stream = await getStream(mailTemplateAndAttachment.url);
  stream.mimetype = mailTemplateAndAttachment.type;
  return stream;
};

export default {
  getAttachment,
  getAttachmentStream,
};
