import db from '../database';
import createDummyData from '../../mock/create-dummy-data';
import createBulkDummyData from '../../mock/create-large-amount-data';

const dbSync = async ({ force }) => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
  await db.sequelize.sync({ force });
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  if (force) {
    await createDummyData();
    await createBulkDummyData();
  }
};

export default dbSync;
