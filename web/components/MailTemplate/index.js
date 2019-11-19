/* eslint-disable camelcase */
import React from 'react';
import moment from 'moment';
import * as S from './styled';

const MailTemplate = ({ mail, setSelected, no }) => {
  const { from, subject, date, is_important, is_read } = mail;
  const startdate = moment(date).format('YYYY-MM-DD');
  const handleClickSubject = e => setSelected({ mail, no });

  return (
    <S.MailTemplateWrap>
      <div>
        <input type="checkbox" />
      </div>
      <div>{is_important ? 'O' : 'X'}</div>
      <div>{is_read ? 'O' : 'X'}</div>
      <div>{from}</div>
      <div onClick={handleClickSubject}>{subject}</div>
      <div>{startdate}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
