import service from './service';
import validateNo from '../../../libraries/validation/mail-template';

const downloadAttachment = async (req, res, next) => {
  const { no } = req.params;
  const { email } = req.user;

  let attachment;
  try {
    validateNo(no);
    attachment = await service.getAttachment({ attachmentNo: no, email });
  } catch (error) {
    return next(error);
  }

  return res.end(attachment.Body);
};

export default {
  downloadAttachment,
};
