import db from '../src/database';

const createDomainDummyData = async () => {
  const results = await db.Domain.bulkCreate([
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
      body: '바디입니다.ㅎㅎㅎ',
    },
    {
      from: 'root@daitnu.com',
      to: 'daitnu@daitnu.com,daitne@daitnu.com',
      subject: '제목입니다.ㅎㅎ2',
      body: '바디입니다.ㅎㅎㅎ2',
    },
  ];

  await db.MailTemplate.bulkCreate(mailTemplate);
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

  await db.User.bulkCreate(users);
};

const createMailDummyData = async () => {
  const mails = [
    { owner: 1, mail_template_id: 1 },
    { owner: 2, mail_template_id: 1 },
    { owner: 3, mail_template_id: 1 },
    { owner: 1, mail_template_id: 2 },
    { owner: 2, mail_template_id: 2 },
    { owner: 3, mail_template_id: 2 },
  ];

  await db.Mail.bulkCreate(mails);
};

const createMailboxDummyData = async () => {
  const mailBoxes = [
    { user_no: 1, name: '받은편지함', is_default: 1 },
    { user_no: 1, name: '중요편지함', is_default: 1 },
    { user_no: 1, name: '보낸편지함', is_default: 1 },
    { user_no: 1, name: '내게쓴메일함', is_default: 1 },
    { user_no: 1, name: '휴지통', is_default: 1 },
  ];

  await db.Category.bulkCreate(mailBoxes);
};

const createDummyData = async () => {
  await createDomainDummyData();
  await createUserDummyData();
  await createMailTemplateDummyData();
  await createMailDummyData();
  await createMailboxDummyData();
};

export default createDummyData;
