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

const syncWithImap = async (req, res, next) => {
  const imapMessageIds = await getImapMessageIds({
    user: { email: 'yaahoo@daitnu.com', password: '12345678' },
  });
  imapMessageIds['받은메일함'] = imapMessageIds.INBOX;
  delete imapMessageIds.INBOX;

  const categories = await getDBCategory(4);
  const dbMails = await getDBMails(imapMessageIds);
  const notFoundImapMailInDB = {}; // IMAP과 DB의 데이터가 일치하지 않는 메일 객체
  for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
    notFoundImapMailInDB[mailboxName] = [];
    messageIds.forEach(messageId => {
      if (!dbMails[mailboxName][messageId]) {
        notFoundImapMailInDB[mailboxName].push(messageId);
      }
    });
  }

  res.send({ imapMessageIds, dbMails, categories, notFoundImapMailInDB });
};

export default syncWithImap;
