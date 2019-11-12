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

const makeData = async () => {
  await makeDomainData();
};

export default makeData;
