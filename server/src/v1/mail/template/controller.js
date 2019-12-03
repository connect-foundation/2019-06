import service from './service';
import validateNo from '../../../libraries/validation/mail-template';

const getAttachmentsByTemplateNo = async (req, res, next) => {
  const { no } = req.params;
  const { email } = req.user;

  let attachments;
  try {
    validateNo(no);
    attachments = await service.getAttachmentsByTemplateNo({ templateNo: no, email });
  } catch (error) {
    return next(error);
  }

  return res.json({ attachments });
};

export default {
  getAttachmentsByTemplateNo,
};
