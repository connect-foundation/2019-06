import React from 'react';

import FindPwForm from '../../components/Forms/FindPwForm';

import * as GS from '../../components/GlobalStyle';
import BackButton from '../../components/BackButton';

const FindPwPage = () => (
  <GS.FlexRowCenterWrap>
    <BackButton />
    <GS.TinyBoard>
      <GS.FlexItem>
        <FindPwForm />
      </GS.FlexItem>
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default FindPwPage;
