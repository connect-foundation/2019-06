import React from 'react';

import PwChangeForm from '../../components/Forms/PwChangeForm';
import * as GS from '../../components/GlobalStyle';

const ProfilePage = () => {
  return (
    <GS.FlexRowCenterWrap>
      <GS.SmallColumnBoard>
        <PwChangeForm />
      </GS.SmallColumnBoard>
    </GS.FlexRowCenterWrap>
  );
};

export default ProfilePage;
