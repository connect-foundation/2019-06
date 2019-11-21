/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import * as S from './styled';
import { AppContext } from '../../contexts';
import { handleMailTemplateClick } from '../../contexts/reducer';

const MailTemplate = ({ mail, no }) => {
  const { state, dispatch } = useContext(AppContext);
  const { from, subject, date, is_important, is_read } = mail;
  const startdate = moment(date).format('YYYY-MM-DD');
  return (
    <S.MailTemplateWrap>
      <div>
        <input type="checkbox" />
      </div>
      <div>{is_important ? 'O' : 'X'}</div>
      <div>{is_read ? 'O' : 'X'}</div>
      <div>{from}</div>
      <div onClick={() => dispatch(handleMailTemplateClick(mail, no))}>{subject}</div>
      <div>{startdate}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
