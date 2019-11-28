import React, { useContext } from 'react';
import moment from 'moment';
import { StarBorder } from '@material-ui/icons';
import * as S from './styled';
import PageMoveButtonArea from './PageMoveButtonArea';
import { AppStateContext } from '../../contexts';
import ToolGroup from './ToolGroup';

const ReadMail = () => {
  const { state } = useContext(AppStateContext);
  const { to, from, subject, createdAt, text, no } = state.mail;
  const receivers = to.replace(',', ', ');
  const date = moment(createdAt)
    .utc()
    .format('YYYY-MM-DD HH:mm');

  return (
    <S.Container>
      <ToolGroup />
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
      <PageMoveButtonArea no={no} />
    </S.Container>
  );
};

export default ReadMail;
