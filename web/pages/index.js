import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
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

  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  useEffect(() => {
    axios
      .get('/mail')
      .then(response => {
        setMails(response.data.mails);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
