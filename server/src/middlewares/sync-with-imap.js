import { getImapMessageIds } from '../libraries/imap';
import DB from '../database';

const getDBMails = async imapMessageIds => {
  const dbMails = {};
  const mailBoxNames = Object.keys(imapMessageIds);
  for (let i = 0; i < mailBoxNames.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const userMails = await DB.Mail.findAllMessasgeIds(
      4,
      imapMessageIds[mailBoxNames[i]],
      mailBoxNames[i],
    );
    dbMails[mailBoxNames[i]] = {};
    userMails.forEach(userMail => {
      dbMails[mailBoxNames[i]][userMail.message_id] = userMail;
      delete dbMails[mailBoxNames[i]][userMail.message_id].message_id;
    });
  }
  return dbMails;
};

const getDBCategory = async userNo => {
  const dbCategories = await DB.Category.findAllByUserNo(userNo);
  const refinedCategories = {};
  dbCategories.forEach(dbCategory => {
    refinedCategories[dbCategory.name] = dbCategory.no;
  });
  return refinedCategories;
};

const getNotMatchedImapMailWithDB = (dbMails, imapMessageIds) => {
  const notMatchedImapMailWithDB = {}; // IMAP과 DB의 데이터가 일치하지 않거나 없는 메일함별 메일 ID 배열객체
  for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
    notMatchedImapMailWithDB[mailboxName] = [];
    messageIds.forEach(messageId => {
      if (!dbMails[mailboxName][messageId]) {
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

const syncWithImap = async (req, res, next) => {
  const imapMessageIds = await getImapMessageIds({
    user: { email: 'yaahoo@daitnu.com', password: '12345678' },
  });
  imapMessageIds['받은메일함'] = imapMessageIds.INBOX;
  delete imapMessageIds.INBOX;

  const imapMessageIdsReverse = getImapMessageIdsReverse(imapMessageIds);

  const categories = await getDBCategory(4);
  const dbMails = await getDBMails(imapMessageIds);
  const notMatchedImapMailWithDB = getNotMatchedImapMailWithDB(dbMails, imapMessageIds);
  // TODO: notMatchedImapMailWithDB 여기에 들어있는 것들을 imap에 맞게 업데이트 시켜주면 됨
  const mailIdsToUpdate = {};
  for (const [mailboxName, messageIds] of Object.entries(notMatchedImapMailWithDB)) {
    messageIds.forEach(messageId => {});
  }

  res.send({
    imapMessageIds,
    imapMessageIdsReverse,
    dbMails,
    categories,
    notMatchedImapMailWithDB,
  });
};

export default syncWithImap;
