/* eslint-disable import/prefer-default-export */
import DB from '../../database/index';

const getRawMails = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceivedMail(userNo, userEmail);
  return mails;
};

export default { getRawMails };
