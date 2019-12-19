import React from 'react';

import FindIdForm from '../../components/Forms/FindIdForm';
import BackButton from '../../components/BackButton';
import * as GS from '../../components/GlobalStyle';
import HeadTitle from '../../components/HeadTitle';

const FindIdPage = () => (
  <GS.FlexRowCenterWrap>
    <HeadTitle title="아이디 찾기" />
    <BackButton />
    <GS.TinyBoard>
      <GS.FlexItem>
        <FindIdForm />
      </GS.FlexItem>
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default FindIdPage;
