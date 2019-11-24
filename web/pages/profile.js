import React from 'react';

import Profile from '../components/Profile';

import * as GS from '../components/GlobalStyle';

const ProfilePage = () => (
  <GS.FlexRowCenterWrap>
    <GS.SmallBoard>
      <Profile />
    </GS.SmallBoard>
  </GS.FlexRowCenterWrap>
);

export default ProfilePage;
