import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { getUser } from '../utils/storage';
import { AppDisapthContext, AppStateContext } from '../contexts';
import { setView } from '../contexts/reducer';

const Home = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = getUser(window);
    if (!userData) {
      Router.push('/login');
    } else {
      setUser(userData);
      dispatch(setView(<MailArea />));
    }
  }, [dispatch]);

  const indexPage = (
    <GS.FlexWrap>
      <Header brand={'Daitnu'} />
      <GS.Content>
        <Aside />
        {state.view}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
  return user ? indexPage : <Loading full={true} />;
};

export default Home;
