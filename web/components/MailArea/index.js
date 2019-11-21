/* eslint-disable camelcase */
import React, { useState } from 'react';
import ReadMail from '../ReadMail';
import MailTemplate from '../MailTemplate';
import S from './styled';
import Paging from '../Paging';

const MailArea = ({ mailList }) => {
  const { paging, mails } = mailList;

  const processedMails = mails.map(mail => {
    const { is_important, is_read, MailTemplate, no } = mail;
    const { from, subject, text, createdAt } = MailTemplate;
    return {
      from,
      subject,
      text,
      createdAt,
      is_important,
      is_read,
      no,
    };
  });

  const [selected, setSelected] = useState(null);
  const mailTemplates = processedMails.map((mail, i) => (
    <MailTemplate key={`mail-${i}`} mail={mail} setSelected={setSelected} no={i} />
  ));

  return (
    <S.MailArea>
      <S.Tools>{selected ? 'mail' : 'maillist'}</S.Tools>
      <S.MailListArea>
        {selected ? <ReadMail mail={selected.mail} /> : mailTemplates}
      </S.MailListArea>
      <S.MailPagingArea>
        <Paging paging={paging} />
      </S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
