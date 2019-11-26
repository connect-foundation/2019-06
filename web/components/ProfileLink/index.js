import React from 'react';
import Link from 'next/link';

import S from './styled';
import user from '../../assets/imgs/user.png';

const ProfileLink = () => {
  return (
    <Link href="profile">
      <S.Brand>
        <S.Logo src={user} />
      </S.Brand>
    </Link>
  );
};
export default ProfileLink;
