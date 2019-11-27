/* eslint-disable object-curly-newline */
import dotenv from 'dotenv';

dotenv.config();

const { DB_DEV_USERNAME, DB_DEV_PW, DB_DEV_SCHEMA, DB_DEV_HOST } = process.env;
const { DB_TEST_USERNAME, DB_TEST_PW, DB_TEST_SCHEMA, DB_TEST_HOST } = process.env;
const {
  DB_PRODUCTION_USERNAME,
  DB_PRODUCTION_PW,
  DB_PRODUCTION_SCHEMA,
  DB_PRODUCTION_HOST,
} = process.env;

const config = {
  development: {
    username: DB_DEV_USERNAME,
    password: DB_DEV_PW,
    database: DB_DEV_SCHEMA,
    host: DB_DEV_HOST,
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    timezone: '+09:00',
  },
  test: {
    username: DB_TEST_USERNAME,
    password: DB_TEST_PW,
    database: DB_TEST_SCHEMA,
    host: DB_TEST_HOST,
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    timezone: '+09:00',
  },
  production: {
    username: DB_PRODUCTION_USERNAME,
    password: DB_PRODUCTION_PW,
    database: DB_PRODUCTION_SCHEMA,
    host: DB_PRODUCTION_HOST,
    dialect: 'mysql',
    operatorsAliases: 'false',
    logging: false,
    timezone: '+09:00',
  },
};

export default config;
