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
const UNTITLE = "";

const pool = mysql.createPool({
  user: DB_DEV_USERNAME,
  password: DB_DEV_PW,
  database: DB_DEV_SCHEMA,
  host: DB_DEV_HOST
});

const parseMailContent = async content => {
  try {
    const { from, to, subject, html, text, attachments } = await simpleParser(
      content
    );
    return {
      from: from.text,
      to: to.text,
      subject: subject || UNTITLE,
      text: html || text,
      attachments
    };
  } catch (err) {
    console.log(err);
    return;
  }
};

const getReceivers = to => {
  const receivers = [];
  to.split(",").forEach(email => {
    const [id, domain] = email.split("@");
    if (domain === MY_DOMAIN) {
      receivers.push(id);
    }
  });
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
  const receivers = getReceivers(mail.to);
  const connection = await pool.getConnection(async conn => conn);
  let queryFormat;
  const log = {};

  try {
    await connection.beginTransaction();
    queryFormat = format.getQueryToAddMailTemplate(mail);
    const [{ insertId }] = await connection.execute(queryFormat);

    mail.attachments.forEach(async attahcment => {
      attahcment.mail_template_id = insertId;
      queryFormat = format.getQueryToAddAttachment(attahcment);
      await connection.execute(queryFormat);
    });

    receivers.forEach(async id => {
      queryFormat = format.getQueryToFindOwnerAndCategoryNo(id);
      const [[{ owner, no }]] = await connection.query(queryFormat);
      log.mail_template_id = insertId;
      log.owner = owner;
      log.category_no = no;
      queryFormat = format.getQueryToAddMail(log);
      await connection.execute(queryFormat);
      recordLog(mail, log);
    });

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
