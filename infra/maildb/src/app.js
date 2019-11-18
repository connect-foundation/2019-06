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
    const { from, to, subject, text, attachments } = await simpleParser(content);
    return {
      from: from.text,
      to: to.text,
      subject,
      body: text,
      attachments
    };
  } catch (error) {
    console.log(error);
    return;
  }
}

const insertMailToDB = async (content) => {
  const { from, to, subject, body } = await parseMailContent(content);
  const INSERT_QUERY = 'INSERT INTO tbl_mail_template (`from`, `to`, `subject`, `body`) VALUES (?, ?, ?, ?)';
  let result;
  try {
    result = await connection.execute(INSERT_QUERY, [from, to, subject, body]);
  } catch (error) {
    result = error;
  } finally {
    console.log(result);
    connection.end();
  }
}

insertMailToDB(MAIL_CONTENT);
