/* eslint-disable camelcase */
import React, { useState } from 'react';
import MailTemplate from '../MailTemplate';
import S from './styled';
import Paging from '../Paging';

const MailArea = ({ mailList }) => {
  const { paging, mails } = mailList;
  const processedMails = mails.map(mail => {
    const { is_important, is_read, MailTemplate, no } = mail;
    const { from, to, subject, text, createdAt } = MailTemplate;
    return {
      from,
      to,
      subject,
      text,
      createdAt,
      is_important,
      is_read,
      no,
    };
  });

  const mailTemplates = processedMails.map((mail, i) => (
    <MailTemplate key={`mail-${i}`} mail={mail} no={i} />
  ));

  return (
    <S.MailArea>
      <S.Tools>tools</S.Tools>
      <S.MailListArea>{mailTemplates}</S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
