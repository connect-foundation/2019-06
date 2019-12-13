import React from 'react';

import Profile from '../components/Profile';
import * as GS from '../components/GlobalStyle';
import BackButton from '../components/BackButton';
import { withAuthentication } from '../higher-order-component/with-authentication';
import HeadTitle from '../components/HeadTitle';

const ProfilePage = ({ name, sub_email, email }) => {
  return (
    <GS.FlexRowCenterWrap>
      <HeadTitle title="프로필" />
      <BackButton />
      <GS.TinyBoard>
        <Profile name={name} sub_email={sub_email} email={email} />
      </GS.TinyBoard>
    </GS.FlexRowCenterWrap>
  );
};

export default withAuthentication(ProfilePage);
