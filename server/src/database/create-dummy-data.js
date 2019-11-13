import db from '.';

const createDomainDummyData = async () => {
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

const createDummyData = async () => {
  await createDomainDummyData();
};

export default createDummyData;
