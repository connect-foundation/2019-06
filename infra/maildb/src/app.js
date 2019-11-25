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
const UNTITLE = "untitle";

const pool = mysql.createPool({
  user: DB_DEV_USERNAME,
  password: DB_DEV_PW,
  database: DB_DEV_SCHEMA,
  host: DB_DEV_HOST
});

const parseMailContent = async content => {
  try {
    const { from, to, subject, html, attachments } = await simpleParser(
      content
    );
    return {
      from: from.text,
      to: to.text,
      subject: subject || UNTITLE,
      text: html,
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

const insertMailToDB = async content => {
  const mail = await parseMailContent(content);
  const receivers = getReceivers(mail.to);
  const connection = await pool.getConnection(async conn => conn);
  let queryFormat;

  try {
    await connection.beginTransaction();
    queryFormat = format.getQueryToAddMailTemplate(mail);
    const [resultOfMailTemplate] = await connection.execute(queryFormat);
    const mail_template_id = resultOfMailTemplate.insertId;

    receivers.forEach(async id => {
      queryFormat = format.getQueryToFindOwnerAndCategoryNo(id);
      const [resultOfUserAndCategory] = await connection.query(queryFormat);
      const { owner, no } = resultOfUserAndCategory[0];
      queryFormat = format.getQueryToAddMail({
        owner,
        no,
        mail_template_id
      });
      await connection.execute(queryFormat);
      console.log(
        JSON.stringify({
          from: mail.from,
          to: mail.to,
          mail_template_id,
          owner,
          category_no: no
        })
      );
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
