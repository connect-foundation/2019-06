/* eslint-disable object-curly-newline */
import uuidv4 from 'uuid';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const MB = 1000 ** 2;
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

const options = {
  partSize: FILE_LIMIT_SIZE,
};

const rename = originalname => {
  const splitedFileName = originalname.split('.');
  const now = Date.now();
  const fileName = now + uuidv4().replace(/-/g, '');
  const extension = splitedFileName[splitedFileName.length - 1];
  const newFileName = `${fileName}.${extension}`;
  return newFileName;
};

const multipartUpload = ({ buffer, originalname }) => {
  const newName = rename(originalname);
  const promise = S3.upload(
    {
      Bucket: STORAGE_BUCKET,
      Key: BASE_PATH + newName,
      Body: buffer,
    },
    options,
  ).promise();
  return promise;
};

const download = path => {
  const file = S3.getObject({
    Bucket: STORAGE_BUCKET,
    Key: path,
  }).promise();

  return file;
};

const getStream = path => {
  const stream = S3.getObject({
    Bucket: STORAGE_BUCKET,
    Key: path,
  }).createReadStream();
  return stream;
};

export { download, multipartUpload, getStream };
