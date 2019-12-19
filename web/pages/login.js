import React, { useContext, useEffect } from 'react';
import Router from 'next/router';

import LoginForm from '../components/Forms/LoginForm';
import SmallHeader from '../components/SmallHeader';
import LinkArea from '../components/LinkArea';
import MessageHeader from '../components/MessageHeader';

import * as S from '../components/GlobalStyle';
import HeadTitle from '../components/HeadTitle';

import { setMessage } from '../contexts/reducer';
import { AppDispatchContext } from '../contexts';

const subscribeRouteChangeStartFunction = dispatch => {
  const handleRouteChange = url => {
    if (url !== '/login') {
      dispatch(setMessage(''));
      Router.events.off('routeChangeStart', handleRouteChange);
    }
  };
  Router.events.on('routeChangeStart', handleRouteChange);
};

const LoginPage = () => {
  const { dispatch } = useContext(AppDispatchContext);

  useEffect(() => {
    subscribeRouteChangeStartFunction(dispatch);
  }, [dispatch]);

  return (
    <S.FlexCenterWrap>
      <HeadTitle title="로그인" />
      <MessageHeader />
      <SmallHeader />
      <LoginForm />
      <S.HorizontalLine />
      <LinkArea />
    </S.FlexCenterWrap>
  );
};

export default LoginPage;
