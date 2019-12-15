import { getImapMessageIds } from '../libraries/imap';
import DB from '../database';

const getDBMails = async imapMessageIds => {
  const dbMails = {};
  const mailBoxNames = Object.keys(imapMessageIds);
  for (let i = 0; i < mailBoxNames.length; i++) {
    if (mailBoxNames[i] === 'INBOX') {
      mailBoxNames[i] = '받은메일함';
    }
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
  const categories = await getDBCategory(4);
  const dbMails = await getDBMails(imapMessageIds);

  // for (const [mailboxName, messageIds] of Object.entries(imapMessageIds)) {
  //   messageIds.forEach(messageId => {
  //     dbMails[mailboxName][messageId];
  //   });
  // }

  res.send({ imapMessageIds, dbMails, categories });
};

export default syncWithImap;
