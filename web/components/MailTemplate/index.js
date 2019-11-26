/* eslint-disable camelcase */
import React, { useContext } from 'react';
import moment from 'moment';
import * as S from './styled';
import { AppDisapthContext } from '../../contexts';
import { handleMailClick } from '../../contexts/reducer';
import ReadMail from '../ReadMail';

const MailTemplate = ({ mail }) => {
  const { dispatch } = useContext(AppDisapthContext);
  const { is_important, is_read, MailTemplate, no } = mail;
  const { from, to, subject, text, createdAt } = MailTemplate;
  const date = moment(createdAt).format('YYYY-MM-DD');
  const mailToRead = { from, to, subject, text, date, is_important };
  const handleSubjectClick = () => dispatch(handleMailClick(mailToRead, <ReadMail />));
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
      <div>{date}</div>
    </S.MailTemplateWrap>
  );
};

export default MailTemplate;
