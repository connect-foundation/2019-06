import { getImapMessageIds } from '../libraries/imap';
import DB from '../database';
import ERROR_CODE from '../libraries/exception/error-code';
import ErrorResponse from '../libraries/exception/error-response';

const { NODE_ENV } = process.env;

const getDBMails = async (imapMessageIds, userNo) => {
  const dbMails = {};
  const mailBoxNames = Object.keys(imapMessageIds);
  for (const mailBoxName of mailBoxNames) {
    // eslint-disable-next-line no-await-in-loop
    const userMails = await DB.Mail.findAllNonResultvation(userNo, mailBoxName);
    userMails.forEach(userMail => {
      dbMails[userMail.message_id] = userMail;
    });
  }
  return dbMails;
};

const getRefinedCategory = async userNo => {
  const dbCategories = await DB.Category.findAllByUserNo(userNo);
  const refinedCategories = {};
  dbCategories.forEach(dbCategory => {
    refinedCategories[dbCategory.name] = dbCategory.no;
  });
  return refinedCategories;
};

const getNotMatchedImapMailWithDB = (dbMails, imapMessageIds) => {
  const notMatchedImapMailWithDB = {}; // DB에는 없고 IMAP 서버에만 존재하는 메일(메일이 이동되었거나 삭제된 경우)
  for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
    notMatchedImapMailWithDB[mailboxName] = [];
    messageIds.forEach(messageId => {
      if (dbMails[messageId] && mailboxName !== dbMails[messageId].name) {
        notMatchedImapMailWithDB[mailboxName].push(messageId);
      }
    });
  }
  return notMatchedImapMailWithDB;
};

const getImapMessageIdsReverse = imapMessageIds => {
  const imapMessageIdsReverse = {};
  for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
    messageIds.forEach(messageId => {
      imapMessageIdsReverse[messageId] = mailboxName;
    });
  }
  return imapMessageIdsReverse;
};

const updateMails = async (userNo, categories, dbMails, notMatchedImapMailWithDB) => {
  const updateMethods = [];
  for (const [mailboxName, messageIds] of Object.entries(notMatchedImapMailWithDB)) {
    messageIds.forEach(messageId => {
      if (dbMails[messageId] && mailboxName !== dbMails[messageId].name) {
        if (mailboxName !== '휴지통') {
          updateMethods.push(
            DB.Mail.updateByMessageId(userNo, messageId, {
              category_no: categories[mailboxName],
            }),
          );
        } else {
          updateMethods.push(
            DB.Mail.updateByMessageId(userNo, messageId, {
              category_no: categories[mailboxName],
              prev_category_no: dbMails[messageId].category_no,
            }),
          );
        }
      }
    });
  }
  await Promise.all(updateMethods);
};

const deleteNonExistMailsInDB = async (userNo, onlyImapMessageIds, onlyDBMessageIds) => {
  const onlyImapMessageIdsObject = {};
  const promisedDelete = [];

  onlyImapMessageIds.forEach(id => {
    onlyImapMessageIdsObject[id] = true;
  });

  onlyDBMessageIds.forEach(messageId => {
    if (!onlyImapMessageIdsObject[messageId]) {
      promisedDelete.push(DB.Mail.deleteByMesssasgeId(userNo, messageId));
    }
  });

  await Promise.all(promisedDelete);
};

const makeMailboxNonExistedInDB = async (imapMessageIds, userNo) => {
  const categories = await getRefinedCategory(userNo);

  // IMAP에는 존재하지만 DB에는 존재하지 않을 경우
  const mailboxesToInsertToDB = Object.keys(imapMessageIds)
    .filter(mailboxName => !categories[mailboxName])
    .map(mailboxName => ({ user_no: userNo, name: mailboxName }));

  await DB.Category.bulkCreate(mailboxesToInsertToDB);
};

const syncWithImapService = async (req, res, next) => {
  if (NODE_ENV === 'test') {
    return next();
  }

  const { user } = req;
  const { no: userNo } = user;
  const imapMessageIds = await getImapMessageIds({ user });
  imapMessageIds['받은메일함'] = imapMessageIds.INBOX;
  delete imapMessageIds.INBOX;

  await makeMailboxNonExistedInDB(imapMessageIds, userNo);

  const getBoxNameByMessageId = getImapMessageIdsReverse(imapMessageIds);
  const [categories, dbMails] = await Promise.all([
    getRefinedCategory(userNo),
    getDBMails(imapMessageIds, userNo),
  ]);

  // DB에는 없고 IMAP 서버에만 존재하는 메일(메일이 이동되었거나 삭제된 경우)
  const notMatchedImapMailWithDB = getNotMatchedImapMailWithDB(dbMails, imapMessageIds);

  // DB에는 존재하지만 IMAP에는 존재하지 않을 경우
  const mailboxNumbersToDeleteOnDB = [];
  for (const [categoryName, categoryNo] of Object.entries(categories)) {
    if (!imapMessageIds[categoryName]) {
      mailboxNumbersToDeleteOnDB.push(categoryNo);
    }
  }

  await updateMails(userNo, categories, dbMails, notMatchedImapMailWithDB);
  await deleteNonExistMailsInDB(userNo, Object.keys(getBoxNameByMessageId), Object.keys(dbMails));
  await DB.Category.destroy({ where: { no: Object.values(mailboxNumbersToDeleteOnDB) } });

  next();
};

const syncWithImap = async (req, res, next) => {
  try {
    await syncWithImapService(req, res, next);
  } catch (err) {
    res.locals.syncErr = new ErrorResponse(ERROR_CODE.FAIL_TO_SYNC_MAIL);
    next();
  }
};

export default syncWithImap;
