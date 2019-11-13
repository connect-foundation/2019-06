/* eslint-disable import/prefer-default-export */
import DB from '../../database/index';

const rawMailList = async (userNo, userEmail) => {
  const mails = await DB.Mail.findAllReceiveMail(userNo, userEmail);
  return mails;
};

export default { rawMailList };
