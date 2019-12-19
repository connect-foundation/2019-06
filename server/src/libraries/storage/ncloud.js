/* eslint-disable object-curly-newline */
import uuidv4 from 'uuid';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { FILE_MAX_SIZE } from '../../constant/mail';

dotenv.config();

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
  partSize: FILE_MAX_SIZE,
};

const renameFile = filename => {
  const newFilename = Date.now() + uuidv4().replace(/-/g, '');
  const extension = filename.split('.').pop();
  return `${newFilename}.${extension}`;
};

const multipartUpload = ({ buffer, originalname }) => {
  const newName = renameFile(originalname);
  return S3.upload(
    {
      Bucket: STORAGE_BUCKET,
      Key: BASE_PATH + newName,
      Body: buffer,
    },
    options,
  ).promise();
};

const downloadFile = path =>
  S3.getObject({
    Bucket: STORAGE_BUCKET,
    Key: path,
  }).promise();

const getStream = path =>
  S3.getObject({
    Bucket: STORAGE_BUCKET,
    Key: path,
  }).createReadStream();

export { downloadFile, multipartUpload, getStream };
