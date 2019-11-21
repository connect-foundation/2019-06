import React from 'react';
import * as S from './styled';
import { SUBJECT, ADDRESS } from './constant';
import PageMoveButtonArea from '../PageMoveButtonArea';

const ReadMail = ({ mail }) => {
  const { to, from, subject, date, text } = mail;
  const receivers = to
    .split(',')
    .map(receiver => `<${receiver}>`)
    .join(', ');

  return (
    <S.ReadArea>
      <S.Tools>Tools</S.Tools>
      <S.TitleView>
        <S.Column role={SUBJECT}>
          <h4>{subject}</h4>
          <div>{date}</div>
        </S.Column>
        <S.Column role={ADDRESS}>
          <span>보낸 사람</span>
          <div>{from}</div>
        </S.Column>
        <S.Column role={ADDRESS}>
          <span>받은 사람</span>
          <div>{receivers}</div>
        </S.Column>
      </S.TitleView>
      <S.ReadFrame>{text}</S.ReadFrame>
    </S.ReadArea>
  );
};

export default ReadMail;
