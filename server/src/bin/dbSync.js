import db from '../database';
import createDummyData from '../database/create-dummy-data';

const dbSync = async ({ force }) => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.sequelize.sync({ force });
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  if (force) {
    await createDummyData();
  }
};

export default dbSync;
