import React from 'react';
import moment from 'moment';
import * as S from './styled';

const MailTemplate = ({ mail }) => {
  const { to, from, subject, date } = mail;

  const startdate = moment(date).format('YYYY-MM-DD');

  return (
    <S.MailTemplateWrap>
      <div>
        <input type="checkbox" />
      </div>
      <div>중요</div>
      <div>읽음</div>
      <div>{from}</div>
      <div>{subject}</div>
      <div>{startdate}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
