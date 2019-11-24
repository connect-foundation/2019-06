const mysql = require("mysql2/promise");

const TABLE = {
  MAIL_TEMPLATE: "tbl_mail_template",
  MAIL: "tbl_mail",
  USER: "tbl_user",
  CATEGORY: "tbl_category"
};

const QUERY = {
  INSERT: "INSERT INTO ?? SET ?",
  SELECT:
    "SELECT ?? AS ??, ?? AS ?? FROM ?? WHERE ?? = ? AND ?? = ?? AND ?? = ?"
};

const MAILBOX = "받은메일함";
const TABLE_USER_NO = "tbl_user.no";
const TABLE_CATEGORY_NO = "tbl_category.no";
const TABLE_CATEGORY_USER_NO = "tbl_category.user_no";
const CATEGORY_NO = "category_no";
const TABLE_CATEGOTY_NAME = "tbl_category.name";
const OWNER = "owner";
const ID = "id";
const NOW = mysql.raw("now()");

const getQueryToAddMailTemplate = ({
  from,
  to,
  subject,
  text,
  attachments
}) => {
  const valueOfMailTemplate = {
    from,
    to,
    subject,
    text,
    created_at: NOW,
    updated_at: NOW
  };

  return mysql.format(QUERY.INSERT, [TABLE.MAIL_TEMPLATE, valueOfMailTemplate]);
};

const getQueryToFindOwnerAndCategoryNo = id => {
  return mysql.format(QUERY.SELECT, [
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
    MAILBOX
  ]);
};

const getQueryToAddMail = ({ owner, category_no, mail_template_id }) => {
  const valueOfMail = {
    owner,
    category_no,
    mail_template_id,
    is_important: 0,
    is_read: 0
  };

  return mysql.format(QUERY.INSERT, [TABLE.MAIL, valueOfMail]);
};

module.exports = {
  getQueryToAddMailTemplate,
  getQueryToFindOwnerAndCategoryNo,
  getQueryToAddMail
};
