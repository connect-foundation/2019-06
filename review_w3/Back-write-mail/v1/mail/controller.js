import STATUS from "http-status";
import service from "./service";
import U from "../../libraries/mail-util";
import { validate } from "../../libraries/validator";
import ERROR_CODE from "../../libraries/exception/error-code";
import ErrorResponse from "../../libraries/exception/error-response";
import ErrorField from "../../libraries/exception/error-field";

const write = async (req, res, next) => {
  const attachments = req.files;
  const { subject, text } = req.body;
  let { to } = req.body;
  if (!Array.isArray(to)) {
    to = [to];
  }
  const from = req.user.email;
  if (!to.every(val => validate("email", val))) {
    const errorField = new ErrorField("email", to, "이메일이 올바르지 않습니다");
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }
  const mailContents = U.getSingleMailData({ from, to, subject, text, attachments});

  let mail;
  try {
    mail = await service.sendMail(mailContents);
  } catch (error) {
    return next(error);
  }

  return res.status(STATUS.CREATED).json({ mail });
};

export default { write };
