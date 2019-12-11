import React from 'react';

import PwChangeForm from '../../components/Forms/PwChangeForm';
import * as GS from '../../components/GlobalStyle';
import { withAuthentication } from '../../utils/with-authentication';

const PwChangePage = () => {
  return (
    <GS.FlexRowCenterWrap>
      <GS.SmallColumnBoard>
        <PwChangeForm />
      </GS.SmallColumnBoard>
    </GS.FlexRowCenterWrap>
  );
};

export default withAuthentication(PwChangePage);
