import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/IndexLayout';
import MailArea from '../components/MailArea';
import WriteMailToMe from '../components/WriteMailToMe';
import WriteMail from '../components/WriteMail';
import ReadMail from '../components/ReadMail';
import HeadTitle from '../components/HeadTitle';

const VIEW_COMPONENT = {
  'WRITE-TO-ME': <WriteMailToMe />,
  WRITE: <WriteMail />,
  READ: <ReadMail />,
};

const IndexPage = () => {
  const router = useRouter();
  const { query } = router;
  let { view } = query;
  if (view) {
    view = view.toUpperCase();
  }
  const renderView = VIEW_COMPONENT[view] || <MailArea />;

  return (
    <>
      <HeadTitle title="다잇누 메일서비스" />
      <Layout>{renderView}</Layout>
    </>
  );
};

export default IndexPage;
