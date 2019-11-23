import React from 'react';

import FindPwForm from '../../components/FindPwForm';

import * as GS from '../../components/GlobalStyle';

const FindPwPage = () => (
  <GS.FlexRowCenterWrap>
    <GS.SmallBoard>
      <GS.FlexItem>
        <FindPwForm />
      </GS.FlexItem>
    </GS.SmallBoard>
  </GS.FlexRowCenterWrap>
);

export default FindPwPage;
