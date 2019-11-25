import React, { useContext } from 'react';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { StarBorder } from '@material-ui/icons';
import { AppContext } from '../../contexts';

const ReadMail = () => {
  const { state } = useContext(AppContext);
  const { to, from, subject, createdAt, text } = state.mail;
  const receivers = to.replace(',', ', ');

  return (
    <S.Container>
      <S.Tools>Tools</S.Tools>
      <S.ReadArea>
        <S.TitleView>
          <S.Subject>
            <StarBorder />
            <h3>{subject}</h3>
            <div>{createdAt}</div>
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
