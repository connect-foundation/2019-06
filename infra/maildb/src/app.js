const simpleParser = require("mailparser").simpleParser;
const mysql = require("mysql2/promise");
const format = require("./format");
const { multipartUpload } = require("./ncloud");

const {
  DB_DEV_USERNAME,
  DB_DEV_PW,
  DB_DEV_SCHEMA,
  DB_DEV_HOST
} = require("./env");

const MAIL_CONTENT = process.argv[2];
const MY_DOMAIN = "daitnu.com";
const RECEIVED_KEY = "received";
const MESSAGE_ID_KEY = "message-id";
const UNTITLE = "";
const EXP_EXTRACT_RECEIVER = /<.{3,40}@.{3,40}>/;

const pool = mysql.createPool({
  user: DB_DEV_USERNAME,
  password: DB_DEV_PW,
  database: DB_DEV_SCHEMA,
  host: DB_DEV_HOST
});

const parseMailContent = async content => {
  try {
    const {
      from,
      to,
      subject,
      html,
      text,
      attachments,
      headers
    } = await simpleParser(content);
    return {
      from: from.text,
      to: to.text,
      subject: subject || UNTITLE,
      text: text || html,
      attachments,
      headers
    };
  } catch (err) {
    console.log(err);
    return;
  }
};

const addReceiver = (receviers, email) => {
  const [id, domain] = email.trim().split("@");
  if (domain === MY_DOMAIN) {
    receviers.push(id);
  }
};

const getReceivers = ({ headers, to }) => {
  const receivedOfHeader = headers.get(RECEIVED_KEY)[0];
  const realReceiver = EXP_EXTRACT_RECEIVER.exec(receivedOfHeader);
  const receivers = [];
  if (realReceiver) {
    addReceiver(receivers, realReceiver[0].slice(1, -1));
  } else {
    to.split(",").forEach(email => addReceiver(receivers, email));
  }
  return receivers;
};

const recordLog = mail => {
  const { from, to, mail_template_id, owner, category_no, message_id } = mail;
  console.log(
    JSON.stringify({
      from,
      to,
      mail_template_id,
      owner,
      category_no,
      message_id
    })
  );
};

const setMessageIdOfMail = mail => {
  const { headers } = mail;
  const messageId = headers.get(MESSAGE_ID_KEY);
  mail.message_id = messageId.slice(1, -1);
};

const insertMailToDB = async content => {
  const mail = await parseMailContent(content);
  const receivers = getReceivers(mail);
  setMessageIdOfMail(mail);
  const connection = await pool.getConnection(async conn => conn);
  let queryFormat;

  try {
    await connection.beginTransaction();
    queryFormat = format.getQueryToAddMailTemplate(mail);
    const [{ insertId }] = await connection.execute(queryFormat);

    const insertingAttachments = mail.attachments.map(async attachment => {
      const result = await multipartUpload(attachment);
      attachment.url = result.key;
      attachment.mail_template_id = insertId;
      queryFormat = format.getQueryToAddAttachment(attachment);
      return connection.execute(queryFormat);
    });

    const insertingMails = receivers.map(async id => {
      queryFormat = format.getQueryToFindOwnerAndCategoryNo(id);
      const [[{ owner, no }]] = await connection.query(queryFormat);
      mail.mail_template_id = insertId;
      mail.owner = owner;
      mail.category_no = no;
      queryFormat = format.getQueryToAddMail(mail);
      recordLog(mail);
      return connection.execute(queryFormat);
    });

    await Promise.all(insertingAttachments);
    await Promise.all(insertingMails);
    await connection.commit();
    connection.release();
  } catch (err) {
    await connection.rollback();
    connection.release();
    console.log(err);
  } finally {
    pool.end();
  }
};

insertMailToDB(MAIL_CONTENT);
