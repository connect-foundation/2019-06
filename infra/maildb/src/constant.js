const TABLE = {
  MAIL_TEMPLATE: "tbl_mail_template",
  MAIL: "tbl_mail",
  USER: "tbl_user",
  CATEGORY: "tbl_category"
};

const QUERY = {
  INSERT: "INSERT INTO ?? SET ?",
  SELECT:
    "SELECT ?? AS ??, ?? AS ?? FROM ?? WHERE ?? = ? AND ?? = ?? AND (?? = ? OR ?? = ?)"
};

const MAILBOX = {
  ENTIRE: "전체메일함",
  RECEIVED: "받은메일함"
};

const MY_DOMAIN = "daitnu.com";
const UNTITLE = "untitle";
const TABLE_USER_NO = "tbl_user.no";
const TABLE_CATEGORY_NO = "tbl_category.no";
const TABLE_CATEGORY_USER_NO = "tbl_category.user_no";
const CATEGORY_NO = "category_no";
const TABLE_CATEGOTY_NAME = "tbl_category.name";
const OWNER = "owner";
const ID = "id";
const NOW = "now()";

module.exports = {
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
};
