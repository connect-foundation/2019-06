import { getImapMessageIds } from '../libraries/imap';
import DB from '../database';

const getDBMails = async (imapMessageIds, userNo) => {
  const dbMails = {};
  const mailBoxNames = Object.keys(imapMessageIds);
  for (let i = 0; i < mailBoxNames.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const userMails = await DB.Mail.findAllMessasgeIds(userNo, mailBoxNames[i]);
    userMails.forEach(userMail => {
      dbMails[userMail.message_id] = userMail;
      delete dbMails[userMail.message_id].message_id;
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
    for (let i = 0; i < messageIds.length; i++) {
      if (dbMails[messageIds[i]] && mailboxName !== dbMails[messageIds[i]].name) {
        if (mailboxName !== '휴지통') {
          updateMethods.push(
            DB.Mail.updateByMessageId(userNo, messageIds[i], {
              category_no: categories[mailboxName],
            }),
          );
        } else {
          updateMethods.push(
            DB.Mail.updateByMessageId(userNo, messageIds[i], {
              category_no: categories[mailboxName],
              prev_category_no: dbMails[messageIds[i]].category_no,
            }),
          );
        }
      }
    }
  }
  await Promise.all(updateMethods);
};

const deleteNoneExistMailsInDB = async (userNo, onlyImapMessageIds, onlyDBMessageIds) => {
  const onlyImapMessageIdsObject = {};
  const promisedDelete = [];

  onlyImapMessageIds.forEach(id => {
    onlyImapMessageIdsObject[id] = true;
  });

  for (let i = 0; i < onlyDBMessageIds.length; i++) {
    if (!onlyImapMessageIdsObject[onlyDBMessageIds[i]]) {
      promisedDelete.push(DB.Mail.deleteByMesssasgeId(userNo, onlyDBMessageIds[i]));
    }
  }

  await Promise.all(promisedDelete);
};

const syncWithImap = async (req, res, next) => {
  const { no: userNo } = req;
  const { user } = req;
  const imapMessageIds = await getImapMessageIds(user);
  imapMessageIds['받은메일함'] = imapMessageIds.INBOX;
  delete imapMessageIds.INBOX;

  let categories = await getRefinedCategory(userNo);

  // IMAP에는 존재하지만 DB에는 존재하지 않을 경우
  const mailboxesToInsertToDB = Object.keys(imapMessageIds)
    .filter(mailboxName => !categories[mailboxName])
    .map(mailboxName => ({ user_no: userNo, name: mailboxName }));

  await DB.Category.bulkCreate(mailboxesToInsertToDB);
  categories = await getRefinedCategory(userNo);
  const getBoxNameByMessageId = getImapMessageIdsReverse(imapMessageIds);
  const dbMails = await getDBMails(imapMessageIds, userNo);

  // DB에는 없고 IMAP 서버에만 존재하는 메일(메일이 이동되었거나 삭제된 경우)
  const notMatchedImapMailWithDB = getNotMatchedImapMailWithDB(dbMails, imapMessageIds);
  await updateMails(userNo, categories, dbMails, notMatchedImapMailWithDB);
  await deleteNoneExistMailsInDB(userNo, Object.keys(getBoxNameByMessageId), Object.keys(dbMails));

  // DB에는 존재하지만 IMAP에는 존재하지 않을 경우
  // const mailboxesToDeleteOnDB =

  res.send({
    imapMessageIds,
    getBoxNameByMessageId,
    dbMails,
    categories,
    notMatchedImapMailWithDB,
  });
};

export default syncWithImap;
