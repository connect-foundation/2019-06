import React from 'react';

import Profile from '../components/Profile';
import * as GS from '../components/GlobalStyle';
import BackButton from '../components/BackButton';

const ProfilePage = () => (
  <GS.FlexRowCenterWrap>
    <BackButton />
    <GS.TinyBoard>
      <Profile />
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default ProfilePage;
