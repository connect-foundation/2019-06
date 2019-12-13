import React, { useEffect, useState, useContext } from 'react';
import Router from 'next/router';
import * as GS from '../GlobalStyle';
import Aside from '../Aside';
import Header from '../Header';
import Footer from '../Footer';
import Loading from '../Loading';
import storage from '../../utils/storage';
import MessageSnackbar from '../Snackbar';
import { AppDispatchContext, AppStateContext } from '../../contexts';
import { handleSnackbarState } from '../../contexts/reducer';

const IndexPageLayout = props => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDispatchContext);
  const [user, setUser] = useState(null);
  const { snackbarOpen, snackbarVariant, snackbarContent } = state;
  const snackbarState = { snackbarOpen, snackbarVariant, snackbarContent };

  useEffect(() => {
    const userData = storage.getUser();
    if (!userData) {
      Router.push('/login');
    } else {
      setUser(userData);
    }
  }, [dispatch]);

  const messageSnackbarProps = {
    ...snackbarState,
    snackbarClose: () => dispatch(handleSnackbarState({ snackbarOpen: false })),
  };

  const indexPage = (
    <GS.FlexWrap>
      <Header />
      <GS.Content>
        <MessageSnackbar {...messageSnackbarProps} />
        <Aside />
        {props.children}
      </GS.Content>
      <Footer />
    </GS.FlexWrap>
  );
  return user ? indexPage : <Loading full={true} />;
};

export default IndexPageLayout;
