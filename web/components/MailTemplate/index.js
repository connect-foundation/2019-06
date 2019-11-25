/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import * as S from './styled';
import { AppContext } from '../../contexts';
import { handleMailClick } from '../../contexts/reducer';
import ReadMail from '../ReadMail';

const MailTemplate = ({ mail, no }) => {
  const { dispatch } = useContext(AppContext);
  const { from, subject, date, is_important, is_read } = mail;
  const startdate = moment(date).format('YYYY-MM-DD');
  const handleSubjectClick = () => dispatch(handleMailClick(mail, <ReadMail />));
  return (
    <S.MailTemplateWrap>
      <div>
        {no}
        {/* <input type="checkbox" /> */}
      </div>
      <div>{is_important ? 'O' : 'X'}</div>
      <div>{is_read ? 'O' : 'X'}</div>
      <div>{from}</div>
      <div onClick={handleSubjectClick}>{subject}</div>
      <div>{startdate}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
