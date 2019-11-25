import React from 'react';

import Profile from '../components/Profile';
import * as GS from '../components/GlobalStyle';
import BackButton from '../components/BackButton';

const ProfilePage = () => (
  <GS.FlexRowCenterWrap>
    <GS.SmallColumnBoard>
      <GS.AlignLeftContainer>
        <BackButton />
      </GS.AlignLeftContainer>
      <Profile />
    </GS.SmallColumnBoard>
  </GS.FlexRowCenterWrap>
);

export default ProfilePage;
