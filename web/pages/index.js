import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import axios from 'axios';
import * as GS from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import ReadMail from '../components/ReadMail';
import { AppContext } from '../contexts';
import { setMails } from '../contexts/reducer';

const Home = () => {
  const { state, dispatch } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    if (!window.sessionStorage.getItem('user')) {
      Router.push('/login');
    } else {
      const userData = window.sessionStorage.getItem('user');
      setUser(JSON.parse(userData));
      axios.get('/mail').then(({ data }) => {
        setView(<MailArea mailList={data.mails} />);
        dispatch(setMails(data.mails));
      });
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
  return user ? indexPage : <Loading />;
};

export default Home;
