import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../config/config';

const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = {};
const { database, username, password } = config;

const sequelize = new Sequelize(database, username, password, config);
const MODEL_DIRECTORY = '/models';

const directoryFiles = fs.readdirSync(path.join(__dirname, MODEL_DIRECTORY));
const modelFiles = directoryFiles.filter(file => file.slice(-3) === '.js');

modelFiles.forEach(file => {
  // eslint-disable-next-line no-path-concat
  const model = sequelize.import(path.join(__dirname + MODEL_DIRECTORY, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
