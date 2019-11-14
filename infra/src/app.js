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
    const parsed = await simpleParser(content);
    return {
      from: clearFrom(parsed.from.text),
      to: parsed.to.text,
      subject: parsed.subject,
      body: parsed.text,
      attachments: parsed.attachments
    };
  } catch (error) {
    console.log(error);
    return;
  }
}

const clearFrom = (from) => {
  return from.split('<')[1].slice(0, -1);
}

const insertMailToDB = async (content) => {
  const { from, to, subject, body } = await parseMailContent(content);
  connection.connect();
  connection.execute('INSERT INTO tbl_mail_template (`from`, `to`, `subject`, `body`) VALUES (?, ?, ?, ?)',
    [from, to, subject, body],
    (error, result) => console.log({ error, result })
  );
  connection.end();
}

insertMailToDB(MAIL_CONTENT);
