import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import * as S from '../components/GlobalStyle';
import Aside from '../components/Aside';
import MailArea from '../components/MailArea';
import Header from '../components/Header';
import { UserContext } from '../components/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push('/login');
  }, []);

  if (!user) return <></>;
  return (
    <S.FlexWrap>
      <S.Header>
        <Header brand={'Daitnu'} />
      </S.Header>
      <S.Content>
        <S.Aside>
          <Aside />
        </S.Aside>
        <S.Section>
          <MailArea />
        </S.Section>
      </S.Content>
      <S.Footer>2019 Copyright Daitnu. All Rights Reserved</S.Footer>
    </S.FlexWrap>
  );
};

export default Home;
