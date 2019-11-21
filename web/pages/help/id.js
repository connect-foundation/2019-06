import React from 'react';

import FindIdForm from '../../components/FindIdForm';

import * as S from '../../components/GlobalStyle';

const FindIdPage = () => (
  <S.FlexRowCenterWrap>
    <S.SmallBoard>
      <S.FlexItem>
        <FindIdForm />
      </S.FlexItem>
    </S.SmallBoard>
  </S.FlexRowCenterWrap>
);

export default FindIdPage;
