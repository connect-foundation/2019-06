import React from 'react';
import * as S from './styled';

const MailTemplate = ({ mail }) => {
  const { to, from, subject, date } = mail;

  return (
    <S.MailTemplateWrap>
      <div>
        <input type="checkbox" />
      </div>
      <div>중요</div>
      <div>읽음상태</div>
      <div>{from}</div>
      <div>{subject}</div>
      <div>{date}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
