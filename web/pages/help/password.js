import React from 'react';

import FindPwForm from '../../components/Forms/FindPwForm';

import * as GS from '../../components/GlobalStyle';
import BackButton from '../../components/BackButton';
import HeadTitle from '../../components/HeadTitle';

const FindPwPage = () => (
  <GS.FlexRowCenterWrap>
    <HeadTitle title="비밀번호 찾기" />
    <BackButton />
    <GS.TinyBoard>
      <GS.FlexItem>
        <FindPwForm />
      </GS.FlexItem>
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default FindPwPage;
