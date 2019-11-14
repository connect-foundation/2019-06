import React from 'react';
import * as S from '../components/index/styled';
import Aside from '../components/index/Aside';
import MailArea from '../components/index/MailArea';
import Header from '../components/index/Header';

const Home = () => (
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

export default Home;
