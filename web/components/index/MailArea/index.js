import React from 'react';
import * as S from './styled';
import MailTemplate from '../MailTemplate';

const MailArea = () => {
  const mails = [
    {
      to: '나에게',
      from: '내가 <daintnu@daitnu.com>',
      subject: '제목이지제목이지제목이지제목이지제목이지제목이지',
      date: Date.now(),
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
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
    { to: '나에게', from: '내가 <daintnu@daitnu.com>', subject: '제목이지', date: Date.now() },
  ];

  const mailTemplates = mails.map((mail, i) => <MailTemplate key={`mail-${i}`} mail={mail} />);

  return (
    <S.MailArea>
      <S.Tools>tools</S.Tools>
      <S.MailListArea>{mailTemplates}</S.MailListArea>
      <S.MailPagingArea>Paging Area</S.MailPagingArea>
    </S.MailArea>
  );
};

export default MailArea;
