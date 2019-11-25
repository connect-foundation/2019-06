import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ReadMail from '../components/ReadMail';
import { AppContext } from '../contexts';
import { getUser } from '../utils/storage';

const Home = () => {
  const { state } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    const userData = getUser(window);
    if (!userData) {
      Router.push('/login');
    } else {
      setUser(userData);
      setView(<MailArea />);
    }
  }, []);

  const indexPage = (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside setView={setView} />
        {state.selected.mail ? <ReadMail mail={state.selected.mail} /> : view}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
  return user ? indexPage : <Loading full={true} />;
};

export default Home;
