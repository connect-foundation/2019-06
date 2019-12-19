/* eslint-disable no-return-await */
/* eslint-disable import/prefer-default-export */
import uuidv4 from 'uuid/v4';
import { Op } from 'sequelize';
import DB from '../../database/index';
import U from '../../libraries/mail-util';
import getPaging from '../../libraries/paging';
import { makeMimeMessage } from '../../libraries/mimemessage';
import { saveToMailbox, moveMail } from '../../libraries/imap';
import ERROR_CODE from '../../libraries/exception/error-code';
import ErrorResponse from '../../libraries/exception/error-response';
import ErrorField from '../../libraries/exception/error-field';
import {
  SENT_MAILBOX_NAME,
  WROTE_TO_ME_MAILBOX_NAME,
  DEFAULT_MAIL_QUERY_OPTIONS,
  SORT_TYPE,
} from '../../constant/mail';

const { NODE_ENV } = process.env;

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

const getMailsByOptions = async ({ no: userNo, waste_basket_no: wastebasketNo }, options = {}) => {
  const queryOptions = { ...DEFAULT_MAIL_QUERY_OPTIONS, ...options };
  const { sort } = queryOptions;
  let { category, page, perPageNum } = queryOptions;
  category = +category;
  page = +page;
  perPageNum = +perPageNum;
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
  const hasAttachment = mailContents.attachments.length !== 0;
  console.log(hasAttachment, mailContents.attachments.length);
  const mailTemplateResult = await DB.MailTemplate.create(
    {
      ...mailContents,
      to: mailContents.to.join(','),
      createdAt: reservationTime,
      has_attachment: hasAttachment,
    },
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
      message_id: mailContents.messageId,
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
  const { messageId } = await U.sendMail(mailContents);
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

const checkCategoryOfMail = async (mail, props) => {
  if (!props.hasOwnProperty('category_no')) {
    return;
  }
  props.prev_category_no = mail.category_no;
  const category = await DB.Category.findOneByNoAndUserNo(mail.category_no, mail.owner);
  if (!category) {
    const errorField = new ErrorField('category', category, '존재하지 않은 카테고리입니다');
    throw new ErrorResponse(ERROR_CODE.CATEGORY_NOT_FOUND, errorField);
  }
};

const checkOwnerHasMails = async (nos, userNo) => {
  const mails = await DB.Mail.findAllByNosAndUserNo(nos, userNo);
  const validMails = mails.filter(mail => mail);
  if (validMails.length !== nos.length) {
    const errorField = new ErrorField('mails', mails, '존재하지 않는 메일이 포함되어 있습니다.');
    throw new ErrorResponse(ERROR_CODE.MAIL_NOT_FOUND, errorField);
  }
  return validMails;
};

const removeDuplicatedNo = nos => nos.filter((no, index) => nos.indexOf(no) === index);

const createMessageIdsByMailboxName = async mails => {
  const messageIdsByMailboxName = {};
  const categoryNos = mails.map(mail => mail.category_no);
  const categories = await DB.Category.findAllByPk(categoryNos);
  const categoryNameByNo = {};

  for (const category of categories) {
    categoryNameByNo[category.no] = category.name;
  }

  for (const mail of mails) {
    const name = categoryNameByNo[mail.category_no];
    if (!messageIdsByMailboxName.hasOwnProperty(name)) {
      messageIdsByMailboxName[name] = [];
    }
    messageIdsByMailboxName[name].push(mail.message_id);
  }
  return messageIdsByMailboxName;
};

const moveMailInInfra = async (mails, props, user) => {
  if (!props.hasOwnProperty('category_no')) {
    return;
  }

  const { name: targetBoxName } = await DB.Category.findByPk(props.category_no);
  const messageIdsOfMailbox = await createMessageIdsByMailboxName(mails);
  Object.keys(messageIdsOfMailbox).forEach(async originBoxName => {
    moveMail({
      user,
      originBoxName,
      targetBoxName,
      searchArgs: messageIdsOfMailbox[originBoxName],
    });
  });
};

const hasMessageIdAllMails = mails => {
  for (const { message_id } of mails) {
    if (!message_id) {
      const errorField = new ErrorField('mails', mails, 'message-id값이 없는 메일이 있습니다.');
      throw new ErrorResponse(ERROR_CODE.MAIL_NOT_FOUND, errorField);
    }
  }
  return true;
};

/**
 * @param {category_no, is_read, is_important, prev_category_no} props
 */

const updateMails = async (nos, props, user) => {
  nos = removeDuplicatedNo(nos);
  const mails = await checkOwnerHasMails(nos, user.no);
  await checkCategoryOfMail(mails[0], props);
  if (NODE_ENV !== 'test') {
    hasMessageIdAllMails(mails);
    moveMailInInfra(mails, props, user);
  }
  const [updatedCount] = await DB.Mail.updateAllByNosAndProps(nos, props);
  return updatedCount === nos.length;
};

const removeMails = async (nos, userNo) => {
  nos = removeDuplicatedNo(nos);
  const mails = await checkOwnerHasMails(nos, userNo);
  const deletedCount = await DB.Mail.deleteAllByNosAndUserNo(nos, userNo);
  return deletedCount === nos.length;
};

export default {
  wroteToMe,
  getMailsByOptions,
  sendMail,
  getQueryByOptions,
  saveReservationMail,
  getCategories,
  updateMails,
  removeMails,
};
