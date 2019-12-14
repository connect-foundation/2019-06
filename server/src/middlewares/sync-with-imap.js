import { getImapMessageIds } from '../libraries/imap';

const syncWithImap = async (req, res, next) => {
  const messageIds = await getImapMessageIds({
    user: { email: 'yaahoo@daitnu.com', password: '12345678' },
  });
  res.send(messageIds);
};

export default syncWithImap;
