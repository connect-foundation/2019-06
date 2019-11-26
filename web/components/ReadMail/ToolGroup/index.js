import React, { useContext } from 'react';
import * as S from './styled';

const buttonNames = ['답장', '전체답장', '전달', '삭제'];
const buttonSet = buttonNames.map(name => <button>{name}</button>);

const ToolGroup = () => {
  return (
    <S.Container>
      <S.ButtonSet>{buttonSet}</S.ButtonSet>
    </S.Container>
  );
};

export default ToolGroup;
