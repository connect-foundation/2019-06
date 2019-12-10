const mysql = require("mysql2/promise");

const TABLE = {
  MAIL_TEMPLATE: "tbl_mail_template",
  MAIL: "tbl_mail",
  USER: "tbl_user",
  CATEGORY: "tbl_category",
  ATTACHMENT: "tbl_attachment"
};

const QUERY = {
  INSERT: "INSERT INTO ?? SET ?",
  SELECT: "SELECT ?? AS ?, ?? FROM ?? WHERE ?? = ?? AND ?? = ? AND ?? = ?"
};

const IDENTIFIER = {
  USER_NO: `${TABLE.USER}.no`,
  CATEGORY_NO: `${TABLE.CATEGORY}.no`,
  CATEGORY_USER_NO: `${TABLE.CATEGORY}.user_no`,
  CATEGOTY_NAME: `${TABLE.CATEGORY}.name`,
  ID: "id"
};

const VALUE = {
  OWNER: "owner",
  NOW: mysql.raw("now()"),
  MAILBOX: "받은메일함",
  SENT_MAILBOX: "보낸메일함"
};

const getQueryToAddMailTemplate = ({ from, to, subject, text, html }) => {
  const valueOfMailTemplate = {
    from,
    to,
    subject,
    text,
    html,
    created_at: VALUE.NOW,
    updated_at: VALUE.NOW
  };

  return mysql.format(QUERY.INSERT, [TABLE.MAIL_TEMPLATE, valueOfMailTemplate]);
};

const getQueryToAddAttachment = ({
  filename,
  url,
  contentType,
  mail_template_id,
  size
}) => {
  const valueOfAttachment = {
    name: filename,
    url,
    type: contentType,
    mail_template_id,
    size
  };
  return mysql.format(QUERY.INSERT, [TABLE.ATTACHMENT, valueOfAttachment]);
};

const getQueryToFindOwnerAndCategoryNo = (id, sender = false) => {
  return mysql.format(QUERY.SELECT, [
    IDENTIFIER.USER_NO,
    VALUE.OWNER,
    IDENTIFIER.CATEGORY_NO,
    [TABLE.USER, TABLE.CATEGORY],
    IDENTIFIER.USER_NO,
    IDENTIFIER.CATEGORY_USER_NO,
    IDENTIFIER.ID,
    id,
    IDENTIFIER.CATEGOTY_NAME,
    sender ? VALUE.SENT_MAILBOX : VALUE.MAILBOX
  ]);
};

const getQueryToAddMail = ({
  owner,
  category_no,
  mail_template_id,
  message_id
}) => {
  const valueOfMail = {
    owner,
    category_no,
    mail_template_id,
    is_important: 0,
    is_read: 0,
    message_id
  };

  return mysql.format(QUERY.INSERT, [TABLE.MAIL, valueOfMail]);
};

module.exports = {
  getQueryToAddMailTemplate,
  getQueryToAddAttachment,
  getQueryToFindOwnerAndCategoryNo,
  getQueryToAddMail
};
