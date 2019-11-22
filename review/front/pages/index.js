import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Home = () => {
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      Router.push('/login');
    } else {
      const userData = window.sessionStorage.getItem('user');
      setUser(JSON.parse(userData));
      setView(<MailArea />);
    }
  }, []);

  const indexPage = (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside setView={setView} />
        {view}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
  return user ? indexPage : <Loading full={true} />;
};

export default Home;
