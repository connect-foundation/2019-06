import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import { UserContext } from '../components/UserContext';
import Footer from '../components/Footer';

const Home = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, [router, user]);

  if (!user) {
    return <></>;
  }

  return (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside />
        <MailArea />
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
};

export default Home;
