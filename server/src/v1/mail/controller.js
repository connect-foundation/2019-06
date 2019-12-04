import STATUS from 'http-status';
import service from './service';
import U from '../../libraries/mail-util';
import { validate } from '../../libraries/validation/common';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';
import ErrorField from '../../libraries/exception/error-field';
import { checkQuery, validateNo, validateProps } from '../../libraries/validation/mail';
import dateValidator from '../../libraries/validation/date';
import { strToDate } from '../../libraries/date-parser';
import { checkAttachment } from '../../libraries/validation/attachment';
import { multipartUpload } from '../../libraries/storage/ncloud';

const list = async (req, res, next) => {
  const userNo = req.user.no;
  const { query } = req;
  let mails;

  try {
    checkQuery(query);
    mails = await service.getMailsByOptions(userNo, query);
  } catch (error) {
    return next(error);
  }

  return res.json(mails);
};

const write = async (req, res, next) => {
  const attachments = req.files;
  const { subject, text, reservationTime } = req.body;
  let { to } = req.body;
  if (!Array.isArray(to)) {
    to = [to];
  }
  const from = req.user.email;
  if (!to.every(val => validate('email', val))) {
    const errorField = new ErrorField('email', to, '이메일이 올바르지 않습니다');
    return next(new ErrorResponse(ERROR_CODE.INVALID_INPUT_VALUE, errorField));
  }

  if (attachments && attachments.length) {
    let uploadResult;
    try {
      checkAttachment(attachments);
      const promises = attachments.map(file => multipartUpload(file));
      uploadResult = await Promise.all(promises);
    } catch (err) {
      return next(err);
    }
    const attachmentsLength = attachments.length;
    for (let i = 0; i < attachmentsLength; i += 1) {
      attachments[i].url = uploadResult[i].key;
    }
  }
  const mailContents = U.getSingleMailData({ from, to, subject, text, attachments });

  try {
    if (!reservationTime) {
      await service.sendMail(mailContents, req.user);
    } else {
      dateValidator.validateDate(reservationTime);
      const date = strToDate(reservationTime);
      await service.saveReservationMail(mailContents, req.user, date);
    }
  } catch (error) {
    return next(error);
  }

  return res.status(STATUS.CREATED).json({ mail: mailContents });
};

const update = async (req, res, next) => {
  const { no } = req.params;
  const { props } = req.body;
  let mail;

  try {
    validateNo(no);
    validateProps(props);
    mail = await service.updateMail(no, props);
  } catch (err) {
    return next(err);
  }

  return res.json(mail);
};

const getCategories = async (req, res, next) => {
  let categories;

  try {
    categories = await service.getCategories(req.user.no);
  } catch (err) {
    return next(err);
  }

  return res.json(categories);
};

export default {
  list,
  write,
  update,
  getCategories,
};
