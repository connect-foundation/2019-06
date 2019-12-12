import React from 'react';

import Profile from '../components/Profile';
import * as GS from '../components/GlobalStyle';
import BackButton from '../components/BackButton';
import HeadTitle from '../components/HeadTitle';

const ProfilePage = () => (
  <GS.FlexRowCenterWrap>
    <HeadTitle title="프로필" />
    <BackButton />
    <GS.TinyBoard>
      <Profile />
    </GS.TinyBoard>
  </GS.FlexRowCenterWrap>
);

export default ProfilePage;
