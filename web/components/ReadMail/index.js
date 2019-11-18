import React from 'react';
import * as S from './styled';
import { SUBJECT, ADDRESS } from './constant';

const ReadMail = ({ mail }) => {
  const { to, from, subject, date, body } = mail;
  return (
    <S.ReadArea>
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
          <div>{to}</div>
        </S.Column>
      </S.TitleView>
      <S.ReadFrame>{body}</S.ReadFrame>
    </S.ReadArea>
  );
};

export default ReadMail;
