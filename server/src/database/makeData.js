import db from '.';

const makeDomainData = async () => {
  const results = await db.Domain.bulkCreate(
    [
      {
        name: 'example.com',
      },
    ],
    { returning: true },
  );

  return results;
};

const makeMailData = async () => {
  const template = {
    from: 'test2@daitnu.com',
    to: 'test1@daitnu.com',
    subject: '제목입니당',
    body: '바디입니다.',
  };

  const dummys = [];
  for (let i = 0; i < 1000; i += 1) {
    dummys.push(template);
  }

  const results = await db.Mail.bulkCreate(dummys, { returning: true });

  return results;
};

const makeBulkData = async () => {
  await makeDomainData();
  await makeMailData();
};

export default makeBulkData;
