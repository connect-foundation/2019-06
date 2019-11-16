import React from 'react';
import * as S from './styled';

const ReadMail = ({ mail }) => {
  const { to, from, subject, date, body } = mail;
  return (
    <S.ReadArea>
      <S.TitleView>
        <S.Subject>
          <h4>{subject}</h4>
          <div>{date}</div>
        </S.Subject>
        <S.Address>
          <span>보낸 사람</span>
          <div>{from}</div>
        </S.Address>
        <S.Address>
          <span>받은 사람</span>
          <div>{to}</div>
        </S.Address>
      </S.TitleView>
      <S.ReadFrame>{body}</S.ReadFrame>
    </S.ReadArea>
  );
};

export default ReadMail;
