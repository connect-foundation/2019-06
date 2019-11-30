const simpleParser = require("mailparser").simpleParser;
const mysql = require("mysql2/promise");
const format = require("./format");

const [
  ORIGIN,
  FILE_NAME,
  MAIL_CONTENT,
  DB_DEV_USERNAME,
  DB_DEV_PW,
  DB_DEV_SCHEMA,
  DB_DEV_HOST
] = process.argv;

const MY_DOMAIN = "daitnu.com";
const RECEIVED_KEY = 'received';
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
    const { from, to, subject, html, text, attachments, headers } = await simpleParser(
      content
    );
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
}

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

const recordLog = (mail, log) => {
  console.log(
    JSON.stringify({
      from: mail.from,
      to: mail.to,
      ...log
    })
  );
};

const insertMailToDB = async content => {
  const mail = await parseMailContent(content);
  const receivers = getReceivers(mail);
  const connection = await pool.getConnection(async conn => conn);
  let queryFormat;
  const log = {};

  try {
    await connection.beginTransaction();
    queryFormat = format.getQueryToAddMailTemplate(mail);
    const [{ insertId }] = await connection.execute(queryFormat);

    for await (let attachment of mail.attachments) {
      attachment.mail_template_id = insertId;
      queryFormat = format.getQueryToAddAttachment(attachment);
      await connection.execute(queryFormat);
    }

    for await (let id of receivers) {
      queryFormat = format.getQueryToFindOwnerAndCategoryNo(id);
      const [[{ owner, no }]] = await connection.query(queryFormat);
      log.mail_template_id = insertId;
      log.owner = owner;
      log.category_no = no;
      queryFormat = format.getQueryToAddMail(log);
      await connection.execute(queryFormat);
      recordLog(mail, log);
    }

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
