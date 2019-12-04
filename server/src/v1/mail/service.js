/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import nodemailer from 'nodemailer';
import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
import DB from '../../database/index';
import U from '../../libraries/mail-util';
import getPaging from '../../libraries/paging';
import { makeMimeMessage } from '../../libraries/mimemessage';
import { saveToMailbox } from '../../libraries/save-to-infra';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';
import ErrorField from '../../libraries/exception/error-field';

const SENT_MAILBOX_NAME = '보낸메일함';
const WASTEBASKET_NAME = '휴지통';
const WROTE_TO_ME_MAILBOX_NAME = '내게쓴메일함';

const DEFAULT_MAIL_QUERY_OPTIONS = {
  category: 0,
  page: 1,
  perPageNum: 100,
  sort: 'datedesc',
};

const SORT_TYPE = {
  datedesc: [['no', 'DESC']],
  dateasc: [['no', 'ASC']],
  subjectdesc: [[DB.MailTemplate, 'subject', 'DESC']],
  subjectasc: [[DB.MailTemplate, 'subject', 'ASC']],
  fromdesc: [[DB.MailTemplate, 'from', 'DESC']],
  fromasc: [[DB.MailTemplate, 'from', 'ASC']],
};

const getQueryByOptions = ({ userNo, category, perPageNum, page, sort, wastebasketNo }) => {
  const query = {
    userNo,
    options: {
      raw: false,
    },
    paging: {
      limit: perPageNum,
      offset: (page - 1) * perPageNum,
    },
    mailFilter: {},
  };

  if (category > 0) {
    query.mailFilter.category_no = category;
  } else {
    query.mailFilter.category_no = {
      [Op.ne]: wastebasketNo,
    };
  }

  if (SORT_TYPE[sort]) {
    query.order = SORT_TYPE[sort];
  }

  return query;
};

const getWastebasketCategoryNo = async userNo => {
  const { no } = await DB.Category.findOneByUserNoAndName(userNo, WASTEBASKET_NAME);
  return no;
};

const getMailsByOptions = async (userNo, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  const { sort } = queryOptions;
  let { category, page, perPageNum } = queryOptions;
  category = +category;
  page = +page;
  perPageNum = +perPageNum;
  const wastebasketNo = await getWastebasketCategoryNo(userNo);
  const query = getQueryByOptions({ userNo, category, perPageNum, page, sort, wastebasketNo });
  const { count: totalCount, rows: mails } = await DB.Mail.findAndCountAllFilteredMail(query);

  const pagingOptions = {
    page,
    perPageNum,
  };
  const pagingResult = getPaging(totalCount, pagingOptions);

  return {
    paging: pagingResult,
    mails,
  };
};

const saveAttachments = async (attachments, mailTemplateNo, transaction) => {
  if (attachments.length === 0) {
    return;
  }

  const processedAttachments = attachments.map(attachment => {
    const { contentType, filename, url, size } = attachment;
    return { type: contentType, name: filename, url, mail_template_id: mailTemplateNo, size };
  });

  await DB.Attachment.bulkCreate(processedAttachments, { transaction });
};

const saveMail = async (mailboxName, mailContents, transaction, userNo, reservationTime = null) => {
  const mailTemplateResult = await DB.MailTemplate.create(
    { ...mailContents, to: mailContents.to.join(','), createdAt: reservationTime },
    { transaction },
  );
  const mailTemplate = mailTemplateResult.get({ plain: true });

  await saveAttachments(mailContents.attachments, mailTemplate.no, transaction);
  const userCategory = await DB.Category.findOneByUserNoAndName(userNo, mailboxName);
  await DB.Mail.create(
    {
      owner: userNo,
      mail_template_id: mailTemplate.no,
      category_no: userCategory.no,
      reservation_time: reservationTime,
    },
    { transaction },
  );
};

const wroteToMe = async (mailContents, user) => {
  const mailboxName = WROTE_TO_ME_MAILBOX_NAME;
  const messageId = `${uuidv4()}@daitnu.com`;
  const msg = makeMimeMessage({ messageId, mailContents });
  await DB.sequelize.transaction(
    async transaction => await saveMail(mailboxName, mailContents, transaction, user.no),
  );
  saveToMailbox({ user, msg, mailboxName });
};

const sendMail = async (mailContents, user) => {
  const mailboxName = SENT_MAILBOX_NAME;
  const transporter = nodemailer.createTransport(U.getTransport(user));
  await DB.sequelize.transaction(
    async transaction => await saveMail(mailboxName, mailContents, transaction, user.no),
  );
  const { messageId } = await transporter.sendMail(mailContents);
  const msg = makeMimeMessage({ messageId, mailContents });
  saveToMailbox({ user, msg, mailboxName });
};

const saveReservationMail = async (mailContents, user, reservationTime) => {
  await DB.sequelize.transaction(
    async transaction =>
      await saveMail(SENT_MAILBOX_NAME, mailContents, transaction, user.no, reservationTime),
  );
};

const getCategories = async no => {
  const categories = await DB.Category.findAllByUserNo(no);
  return { categories };
};

const updateMail = async (no, props) => {
  const mail = await DB.Mail.findByPk(no);
  if (!mail) {
    const errorField = new ErrorField('mail', mail, '존재하지 않는 메일입니다');
    throw new ErrorResponse(ERROR_CODE.MAIL_NOT_FOUND, errorField);
  }

  Object.keys(props).forEach(key => {
    mail[key] = props[key];
  });

  const category = await DB.Category.findOneByNoAndUserNo(mail.category_no, mail.owner);
  if (!category) {
    const errorField = new ErrorField('category', category, '존재하지 않은 카테고리입니다');
    throw new ErrorResponse(ERROR_CODE.CATEGORY_NOT_FOUND, errorField);
  }

  await mail.save();
  return mail;
};

export default {
  wroteToMe,
  getMailsByOptions,
  sendMail,
  getQueryByOptions,
  saveReservationMail,
  getCategories,
  updateMail,
};
