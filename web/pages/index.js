import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/IndexLayout';
import MailArea from '../components/MailArea';
import WriteMailToMe from '../components/WriteMailToMe';
import WriteMail from '../components/WriteMail';
import ReadMail from '../components/ReadMail';

const VIEW_COMPONENTS = {
  'write-to-me': <WriteMailToMe />,
  write: <WriteMail />,
  read: <ReadMail />,
  search: <MailArea />,
  list: <MailArea />,
};

const IndexPage = () => {
  const router = useRouter();
  const { query } = router;
  const { view } = query;
  const renderView = VIEW_COMPONENTS[view] || <MailArea />;

  return <Layout>{renderView}</Layout>;
};

export default IndexPage;
