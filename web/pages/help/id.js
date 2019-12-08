import React from 'react';

import FindIdForm from '../../components/Forms/FindIdForm';
import BackButton from '../../components/BackButton';
import * as GS from '../../components/GlobalStyle';

const FindIdPage = () => (
  <GS.FlexRowCenterWrap>
    <BackButton />
    <GS.TinyBoard>
      <GS.FlexItem>
        <FindIdForm />
      </GS.FlexItem>
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default FindIdPage;
