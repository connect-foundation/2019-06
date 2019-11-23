const simpleParser = require("mailparser").simpleParser;
const mysql = require("mysql2/promise");
const {
  TABLE,
  QUERY,
  MAILBOX,
  MY_DOMAIN,
  UNTITLE,
  TABLE_USER_NO,
  TABLE_CATEGORY_NO,
  TABLE_CATEGORY_USER_NO,
  CATEGORY_NO,
  TABLE_CATEGOTY_NAME,
  OWNER,
  ID,
  NOW
} = require("./constant");

const [
  ORIGIN,
  FILE_NAME,
  MAIL_CONTENT,
  DB_DEV_USERNAME,
  DB_DEV_PW,
  DB_DEV_SCHEMA,
  DB_DEV_HOST
] = process.argv;

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

const insertMailToDB = async content => {
  const { from, to, subject, text, attachments } = await parseMailContent(
    content
  );
  const receivers = [];
  const now = mysql.raw(NOW);

  to.split(",").forEach(email => {
    const [id, domain] = email.split("@");
    if (domain === MY_DOMAIN) {
      receivers.push(id);
    }
  });

  try {
    const connection = await pool.getConnection(async conn => conn);
    await connection.beginTransaction();
    const valueOfMailTemplate = {
      from,
      to,
      subject,
      text,
      created_at: now,
      updated_at: now
    };
    const insertMailTemplate = mysql.format(QUERY.INSERT, [
      TABLE.MAIL_TEMPLATE,
      valueOfMailTemplate
    ]);
    const [resultOfMailTemplate] = await connection.execute(insertMailTemplate);
    const mail_template_id = await resultOfMailTemplate.insertId;

    receivers.forEach(async id => {
      const selectOwnerAndCategoryNo = mysql.format(QUERY.SELECT, [
        TABLE_USER_NO,
        OWNER,
        TABLE_CATEGORY_NO,
        CATEGORY_NO,
        [TABLE.USER, TABLE.CATEGORY],
        ID,
        id,
        TABLE_USER_NO,
        TABLE_CATEGORY_USER_NO,
        TABLE_CATEGOTY_NAME,
        MAILBOX.ENTIRE,
        TABLE_CATEGOTY_NAME,
        MAILBOX.RECEIVED
      ]);
      const [results] = await connection.query(selectOwnerAndCategoryNo);
      results.forEach(async ({ owner, category_no }) => {
        const valueOfMail = {
          owner,
          category_no,
          mail_template_id,
          is_important: 0,
          is_read: 0
        };
        const insertMail = mysql.format(QUERY.INSERT, [
          TABLE.MAIL,
          valueOfMail
        ]);
        const [result] = await connection.execute(insertMail);
        console.log(result);
      });
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
