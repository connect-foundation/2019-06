import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import { AppContext } from '../contexts';
import Footer from '../components/Footer';
import WriteMail from '../components/WriteMail';
import Loading from '../components/Loading';

const Home = () => {
  const { user } = useContext(AppContext).userContext;
  const [readMode, setReadMode] = useState(true);
  const [mails, setMails] = useState(null);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      router.push('/login');
    } else {
      setLoading(true);
    }
  }, [router]);

  const handleReadMode = (e, value) => {
    e.preventDefault();
    setReadMode(value);
  };

  const section = readMode ? <MailArea mails={mails} /> : <WriteMail />;
  const indexPage = (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside setReadMode={handleReadMode} />
        {section}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
  return user && mails ? indexPage : <Loading />;
};

export default Home;
