import React, { useContext, useEffect, useState } from 'react';
import Router from 'next/router';
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

  console.log(user);
  useEffect(() => {
    if (!user) {
      Router.push('/login');
    }
  }, [user]);

  const section = readMode ? <MailArea /> : <WriteMail />;

  const indexPage = (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside setReadMode={setReadMode} />
        {section}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );

  return user ? indexPage : <Loading />;
};

export default Home;
