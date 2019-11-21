import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WriteMail from '../components/WriteMail';
import Loading from '../components/Loading';

const useUser = setUser => {
  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      Router.push('/login');
    } else {
      const data = window.sessionStorage.getItem('user');
      setUser(JSON.parse(data));
    }
  }, [setUser]);
};

const Home = () => {
  const [readMode, setReadMode] = useState(true);
  const [mailList, setMailList] = useState(null);
  const [user, setUser] = useState(null);

  const handleReadMode = (e, value) => {
    e.preventDefault();
    setReadMode(value);
  };

  axios.get('/mail').then(({ data }) => {
    setMailList(data.mails);
  });

  const section = readMode ? <MailArea mailList={mailList} /> : <WriteMail />;
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
  return user && mailList ? indexPage : <Loading />;
};

export default Home;
