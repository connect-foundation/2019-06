import React from 'react';

import FindIdForm from '../../components/FindIdForm';

import * as GS from '../../components/GlobalStyle';

const FindIdPage = () => (
  <GS.FlexRowCenterWrap>
    <GS.SmallBoard>
      <GS.FlexItem>
        <FindIdForm />
      </GS.FlexItem>
    </GS.SmallBoard>
  </GS.FlexRowCenterWrap>
);

export default FindIdPage;
