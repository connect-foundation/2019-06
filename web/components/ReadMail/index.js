import React, { useContext } from 'react';
import { StarBorder } from '@material-ui/icons';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { AppStateContext } from '../../contexts';

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const { to, from, subject, date, text } = state.mail;
  const receivers = to.replace(',', ', ');

  return (
    <S.Container>
      <S.Tools>Tools</S.Tools>
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            <StarBorder />
            <h3>{subject}</h3>
            <div>{date}</div>
          </S.Subject>
          <S.Address>
            <span>보낸 사람</span>
            <div>{from}</div>
          </S.Address>
          <S.Address>
            <span>받은 사람</span>
            <div>{receivers}</div>
          </S.Address>
        </S.TitleView>
        <S.ReadFrame>{text}</S.ReadFrame>
      </S.ReadArea>
      <PageMoveButtonArea />
    </S.Container>
  );
};

export default ReadMail;
