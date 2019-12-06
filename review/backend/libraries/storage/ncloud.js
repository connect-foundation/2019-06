/* eslint-disable object-curly-newline */
import uuidv4 from 'uuid';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const MB = 1024 * 1024;
const FILE_LIMIT_SIZE = 10 * MB;

const {
  STORAGE_END_POINT,
  STORAGE_REGION,
  STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY,
  STORAGE_BUCKET,
} = process.env;

const endpoint = new AWS.Endpoint(STORAGE_END_POINT);
const region = STORAGE_REGION;

AWS.config.update({
  accessKeyId: STORAGE_ACCESS_KEY,
  secretAccessKey: STORAGE_SECRET_KEY,
});

const BASE_PATH = 'mail/';
const S3 = new AWS.S3({
  endpoint,
  region,
});

// ...

const getStream = path => {
  const stream = S3.getObject({
    Bucket: STORAGE_BUCKET,
    Key: path,
  }).createReadStream();
  return stream;
};

export { download, multipartUpload, getStream };
