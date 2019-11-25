/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import * as S from './styled';
import LogoutButton from '../LogoutButton';
import { AppDisapthContext } from '../../contexts';
import { setView } from '../../contexts/reducer';
import MailArea from '../MailArea';

const Header = ({ brand }) => {
  const { dispatch } = useContext(AppDisapthContext);
  const handleAtagClick = () => dispatch(setView(<MailArea />));
  return (
    <S.Header>
      <S.Brand>
        <S.Center>
          <S.Atag onClick={handleAtagClick}>{brand}</S.Atag>
        </S.Center>
      </S.Brand>
      <S.Search>
        <button>검색</button>
        <S.SearchInput placeholder="메일 검색" type="text" />
        <button>필터</button>
      </S.Search>
      <LogoutButton />
    </S.Header>
  );
};

export default Header;
