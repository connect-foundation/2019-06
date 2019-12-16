import crypto from 'crypto';
import DB from '../database';

const { ENCRYPTION_KEY } = process.env;

export const createSalt = async () => {
  const [saltQueryresult] = await DB.sequelize.query('SELECT SUBSTRING(SHA(RAND()), -16)', {
    raw: true,
    type: DB.sequelize.QueryTypes.SELECT,
  });

  const [saltKey] = Object.keys(saltQueryresult);
  const salt = saltQueryresult[saltKey].toString();

  return salt;
};

export const encrypt = async (password, salt) => {
  const [passQueryResult] = await DB.sequelize.query(
    `SELECT ENCRYPT('${password}', CONCAT('$6$', '${salt}'))`,
    {
      raw: true,
      type: DB.sequelize.QueryTypes.SELECT,
    },
  );

  const [passKey] = Object.keys(passQueryResult);
  const hashedPassword = passQueryResult[passKey].toString();

  return hashedPassword;
};

export const aesEncrypt = password => {
  const cipher = crypto.createCipher('aes-256-cbc', ENCRYPTION_KEY);
  let result = cipher.update(password, 'utf8', 'base64');
  result += cipher.final('base64');

  return result;
};

export const aesDecrypt = password => {
  const decipher = crypto.createDecipher('aes-256-cbc', ENCRYPTION_KEY);
  let result = decipher.update(password, 'base64', 'utf8');
  result += decipher.final('utf8');

  return result;
};
