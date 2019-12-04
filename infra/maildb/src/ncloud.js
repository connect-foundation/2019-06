const uuidv4 = require("uuid");
const AWS = require("aws-sdk");

const {
  STORAGE_END_POINT,
  STORAGE_REGION,
  STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY,
  STORAGE_BUCKET
} = require("./env");

const MB = 1024 * 1024;
const FILE_LIMIT_SIZE = 10 * MB;

const endpoint = new AWS.Endpoint(STORAGE_END_POINT);
const region = STORAGE_REGION;

AWS.config.update({
  accessKeyId: STORAGE_ACCESS_KEY,
  secretAccessKey: STORAGE_SECRET_KEY
});

const BASE_PATH = "mail/";
const S3 = new AWS.S3({
  endpoint,
  region
});

const options = {
  partSize: FILE_LIMIT_SIZE
};

const rename = originalname => {
  const splitedFileName = originalname.split(".");
  const now = Date.now();
  const fileName = now + uuidv4().replace(/-/g, "");
  const extension = splitedFileName[splitedFileName.length - 1];
  const newFileName = `${fileName}.${extension}`;
  return newFileName;
};

const multipartUpload = ({ content, filename }) => {
  const newName = rename(filename);
  const promise = S3.upload(
    {
      Bucket: STORAGE_BUCKET,
      Key: BASE_PATH + newName,
      Body: content
    },
    options
  ).promise();
  return promise;
};

module.exports = { multipartUpload };
