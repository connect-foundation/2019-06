import db from '../database';
import makeBulkData from '../database/makeData';

const dbSync = async ({ force } = { force: false }) => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.sequelize.sync({ force });
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  if (force) {
    await makeBulkData();
  }
};

export default dbSync;
