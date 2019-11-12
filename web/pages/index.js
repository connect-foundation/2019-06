import React from 'react';
import * as S from '../components/index/styled';

const Home = () => (
  <S.FlexWrap>
    <S.Header>Daitnu</S.Header>
    <S.Content>
      <S.Aside>aside</S.Aside>
      <S.Section>
        <S.Tools>tools</S.Tools>
        <S.MailArea>mailList</S.MailArea>
      </S.Section>
    </S.Content>
  </S.FlexWrap>
);

export default Home;
// import styled from 'styled-components';

// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `;

// export default () => <Title>My page</Title>;
