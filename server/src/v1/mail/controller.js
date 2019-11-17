import service from './service';
import U from '../../libraries/mail-util';
import ERROR_CODE from '../../libraries/error-code';
import ErrorResponse from '../../libraries/error-response';

const list = async (req, res, next) => {
  const { no, email } = req.user;

  let mails;
  try {
    mails = await service.getRawMails(no, email);
  } catch (error) {
    return next(error);
  }

  return res.json({ mails });
};

const write = async (req, res, next) => {
  const attachments = req.files;
  const { from, to, subject, text } = req.body;
  const mailContents = U.getSingleMailData({ from, to, subject, text, attachments });

  let mail;
  try {
    mail = await service.sendMail(mailContents);
  } catch (error) {
    return next(new ErrorResponse(ERROR_CODE.FAIL_TO_SEND_MAIL));
  }

  return res.status(201).json({ mail });
};

export default {
  list,
  write,
};
