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
  const notMatchedImapMailWithDB = {}; // IMAP과 DB의 데이터가 일치하지 않거나 DB에 없는 메일함별 메일 ID 배열객체
  for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
    notMatchedImapMailWithDB[mailboxName] = [];
    messageIds.forEach(messageId => {
      if (!dbMails[messageId]) {
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

  const getBoxNameByMessageId = getImapMessageIdsReverse(imapMessageIds);

  const categories = await getRefinedCategory(4);
  const dbMails = await getDBMails(imapMessageIds);

  // IMAP에만 존재하는 메일
  const notMatchedImapMailWithDB = getNotMatchedImapMailWithDB(dbMails, imapMessageIds);

  const updateMethods = [];
  for (const [mailboxName, messageIds] of Object.entries(notMatchedImapMailWithDB)) {
    for (let i = 0; i < messageIds.length; i++) {
      if (mailboxName !== dbMails[messageIds[i]]['Category.name']) {
        if (mailboxName !== '휴지통') {
          updateMethods.push(
            DB.Mail.updateByMessageId(messageIds[i], { category_no: categories[mailboxName] }),
          );
        } else {
          updateMethods.push(
            DB.Mail.updateByMessageId(messageIds[i], {
              category_no: categories[mailboxName],
              prev_category_no: dbMails[messageIds[i]].category_no,
            }),
          );
        }
      }
    }
  }
  await Promise.all(updateMethods);

  res.send({
    imapMessageIds,
    getBoxNameByMessageId,
    dbMails,
    categories,
    notMatchedImapMailWithDB,
  });
};

export default syncWithImap;
