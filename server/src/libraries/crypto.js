import DB from '../database';

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
