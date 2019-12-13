import React from 'react';

import PwChangeForm from '../../components/Forms/PwChangeForm';
import * as GS from '../../components/GlobalStyle';
import HeadTitle from '../../components/HeadTitle';
import { withAuthentication } from '../../higher-order-component/with-authentication';

const PwChangePage = () => {
  return (
    <GS.FlexRowCenterWrap>
      <HeadTitle title="비밀번호 변경" />
      <GS.SmallColumnBoard>
        <PwChangeForm />
      </GS.SmallColumnBoard>
    </GS.FlexRowCenterWrap>
  );
};

export default withAuthentication(PwChangePage);
