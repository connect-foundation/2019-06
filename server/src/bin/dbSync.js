import db from '../database/index';

const dbSync = ({ force } = { force: false }) => db.sequelize.sync({ force });

export default dbSync;
