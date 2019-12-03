import DB from '../src/database';

const MAILBOX = {
  RECEIVED: '받은메일함',
  SENT: '보낸메일함',
  SELF: '내게쓴메일함',
  TRASH: '휴지통',
};

const createDomainDummyData = async () => {
  const results = await DB.Domain.bulkCreate([
    {
      name: 'daitnu.com',
    },
  ]);

  return results;
};

const createMailTemplateDummyData = async () => {
  const mailTemplate = [
    {
      from: 'root@daitnu.com',
      to: 'daitnu@daitnu.com,daitne@daitnu.com',
      subject: '제목입니다.ㅎㅎ',
      text: '바디입니다.ㅎㅎㅎ',
    },
    {
      from: 'root@daitnu.com',
      to: 'daitnu@daitnu.com,daitne@daitnu.com',
      subject: '제목입니다.ㅎㅎ2',
      text: '바디입니다.ㅎㅎㅎ2',
    },
  ];

  await DB.MailTemplate.bulkCreate(mailTemplate);
};

const createUserDummyData = async () => {
  const users = [
    {
      domain_no: 1,
      name: '다잇누',
      password: '12345678',
      id: 'rooot',
      sub_email: 'root@asd.bcd',
    },
    {
      domain_no: 1,
      name: '다없누',
      password: '12345678',
      id: 'root2',
      sub_email: 'root2@asd.bcd',
    },
    {
      domain_no: 1,
      name: '다했누',
      password: '12345678',
      id: 'root3',
      sub_email: 'root3@asd.bcd',
    },
  ];

  await DB.User.bulkCreate(users);
};

const createMailDummyData = async () => {
  const mails = [
    { owner: 1, mail_template_id: 1, category_no: 1 },
    { owner: 2, mail_template_id: 1, category_no: 5 },
    { owner: 3, mail_template_id: 1, category_no: 9 },
    { owner: 1, mail_template_id: 2, category_no: 1 },
    { owner: 2, mail_template_id: 2, category_no: 5 },
    { owner: 3, mail_template_id: 2, category_no: 9 },
  ];

  await DB.Mail.bulkCreate(mails);
};

const createCategoryDummyData = async () => {
  const categories = [];

  for (let i = 1; i <= 3; i += 1) {
    categories.push({ user_no: i, name: MAILBOX.RECEIVED, is_default: 1 });
    categories.push({ user_no: i, name: MAILBOX.SENT, is_default: 1 });
    categories.push({ user_no: i, name: MAILBOX.SELF, is_default: 1 });
    categories.push({ user_no: i, name: MAILBOX.TRASH, is_default: 1 });
  }

  await DB.Category.bulkCreate(categories);
};

const createDummyData = async () => {
  await createDomainDummyData();
  await createUserDummyData();
  await createMailTemplateDummyData();
  await createCategoryDummyData();
  await createMailDummyData();
};

export default createDummyData;
