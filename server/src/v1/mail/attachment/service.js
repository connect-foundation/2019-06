import DB from '../../../database';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';
import { downloadFile, getStream } from '../../../libraries/storage/ncloud';

const getMailTemplateAndAttachment = async ({ attachmentNo, email }) => {
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

  return mailTemplateAndAttachment;
};

const getAttachment = async ({ attachmentNo, email }) => {
  const mailTemplateAndAttachment = await getMailTemplateAndAttachment({ attachmentNo, email });
  const { url, type } = mailTemplateAndAttachment;
  const file = await downloadFile(url);
  file.mimetype = type;
  return file;
};

const getAttachmentStream = async ({ attachmentNo, email }) => {
  const mailTemplateAndAttachment = await getMailTemplateAndAttachment({ attachmentNo, email });

  const isImage = mailTemplateAndAttachment.type.split('/')[0] === 'image';
  if (!isImage) {
    throw new ErrorResponse(ERROR_CODE.NOT_ALLOWED_PREVIEW_EXTENSION);
  }

  const { url, type } = mailTemplateAndAttachment;
  const stream = await getStream(url);
  stream.mimetype = type;
  return stream;
};

export default {
  getAttachment,
  getAttachmentStream,
};
