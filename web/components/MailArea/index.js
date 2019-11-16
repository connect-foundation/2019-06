import React, { useState } from 'react';
import * as S from './styled';
import MailTemplate from '../MailTemplate';
import ReadMail from '../ReadMail';

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
    <MailTemplate key={`mail-${i}`} mail={mail} setSelected={setSelected} />
  ));

  return (
    <S.MailArea>
      <S.Tools>{selected ? 'mail' : 'maillist'}</S.Tools>
      <S.MailListArea>{selected ? <ReadMail mail={selected} /> : mailTemplates}</S.MailListArea>
      <S.MailPagingArea>{selected ? '<  >' : '1 2 3 4 5'}</S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
