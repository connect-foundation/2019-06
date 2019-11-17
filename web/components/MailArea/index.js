import React, { useState } from 'react';
import * as S from './styled';
import MailTemplate from '../MailTemplate';
import ReadMail from '../ReadMail';
import PrevNextMail from '../PrevNextMail';

const MailArea = () => {
  const mails = [
    {
      to: '나에게',
      from: '내가 <daintnu@daitnu.com>',
      subject: '제목이지제목이지제목이지제목이지제목이지제목이지',
      date: Date.now(),
      body: '본문이지',
    },
    {
      to: '나에게',
      from: '내가 <daintnu@daitnu.com>',
      subject: '제목이지',
      date: Date.now(),
      body: '본문',
    },
    {
      to: '나에게',
      from: '내가 <daintnu@daitnu.com>',
      subject: '제목이지',
      date: Date.now(),
      body: '굿',
    },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
  ];

  const [selected, setSelected] = useState(false);
  const mailTemplates = mails.map((mail, i) => (
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
