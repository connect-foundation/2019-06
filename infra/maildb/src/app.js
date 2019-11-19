const simpleParser = require('mailparser').simpleParser;
const mysql = require('mysql2');

const [ORIGIN, FILE_NAME, MAIL_CONTENT, DB_DEV_USERNAME, DB_DEV_PW, DB_DEV_SCHEMA, DB_DEV_HOST] = process.argv;

const connection = mysql.createConnection({
  user: DB_DEV_USERNAME,
  password: DB_DEV_PW,
  database: DB_DEV_SCHEMA,
  host: DB_DEV_HOST,
});

const parseMailContent = async (content) => {
  try {
    const { from, to, subject, html, attachments } = await simpleParser(content);
    return {
      from: from.text,
      to: to.text,
      subject: subject || 'untitle',
      text: html,
      attachments
    };
  } catch (error) {
    console.log(error);
    return;
  }
}

const insertMailToDB = async (content) => {
  const { from, to, subject, text, attachments } = await parseMailContent(content);
  const insertQuery = 'INSERT INTO ?? SET ?';
  const tableName = 'tbl_mail_template';
  const now = mysql.raw('now()');
  const mailTemplate = { from, to, subject, text, created_at: now, updated_at: now };
  const queryFormat = mysql.format(insertQuery, [tableName, mailTemplate]);
  let result;

  try {
    connection.connect();
    const executed = await connection.execute(queryFormat);
    result = executed.sql;
  } catch (error) {
    result = error;
  } finally {
    console.log(result);
    connection.end();
  }
}

insertMailToDB(MAIL_CONTENT);
