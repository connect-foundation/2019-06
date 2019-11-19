/* eslint-disable camelcase */
import React, { useState } from 'react';
import S from './styled';
import MailTemplate from '../MailTemplate';
import ReadMail from '../ReadMail';
import PrevNextMail from '../PrevNextMail';

const MailArea = ({ mails }) => {
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

  const paging = selected ? (
    <PrevNextMail
      prev={selected.no > 0 ? mails[selected.no - 1] : false}
      next={selected.no < mails.length - 1 ? mails[selected.no + 1] : false}
      setSelected={setSelected}
      no={selected.no}
    />
  ) : (
    '1 2 3 4 5'
  );

  return (
    <S.MailArea>
      <S.Tools>{selected ? 'mail' : 'maillist'}</S.Tools>
      <S.MailListArea>
        {selected ? <ReadMail mail={selected.mail} /> : mailTemplates}
      </S.MailListArea>
      <S.MailPagingArea>{paging}</S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
