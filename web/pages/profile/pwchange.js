import React from 'react';

import PwChangeForm from '../../components/Forms/PwChangeForm';
import * as GS from '../../components/GlobalStyle';
import HeadTitle from '../../components/HeadTitle';

const ProfilePage = () => {
  return (
    <GS.FlexRowCenterWrap>
      <HeadTitle title="비밀번호 변경" />
      <GS.SmallColumnBoard>
        <PwChangeForm />
      </GS.SmallColumnBoard>
    </GS.FlexRowCenterWrap>
  );
};

export default ProfilePage;
