import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      router.push('/login');
    } else {
      setLoading(true);
    }
  }, []);

  if (!loading) {
    return <div></div>;
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
