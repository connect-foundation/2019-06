import DB from '../../../database';
import ERROR_CODE from '../../../libraries/exception/error-code';
import ErrorResponse from '../../../libraries/exception/error-response';

const getAttachmentsByTemplateNo = async ({ templateNo, email }) => {
  const attachments = await DB.MailTemplate.findAllAttachmentsByNo({ no: templateNo });

  if (attachments.length === 0) {
    throw new ErrorResponse(ERROR_CODE.PAGE_NOT_FOUND);
  }

  const template = attachments[0];
  const tos = template.to.split(',').map(user => user.trim());
  const accessibleUsers = [template.from, ...tos];

  if (!accessibleUsers.some(user => user === email)) {
    throw new ErrorResponse(ERROR_CODE.PRIVATE_PATH);
  }

  const processedAttachments = attachments.map(attachment => {
    const object = {
      no: attachment['Attachments.no'],
      templateNo: attachment['Attachments.mail_template_id'],
      type: attachment['Attachments.type'],
      name: attachment['Attachments.name'],
    };
    return object;
  });

  return processedAttachments;
};

export default {
  getAttachmentsByTemplateNo,
};
