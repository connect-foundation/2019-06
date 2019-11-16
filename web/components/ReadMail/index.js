import React from 'react';
import * as S from './styled';

const ReadMail = ({ mail }) => {
  const { to, from, subject, date } = mail;
  return (
    <>
      <div>{to}</div>
      <div>{from}</div>
      <div>{subject}</div>
      <div>{date}</div>
    </>
  );
};

export default ReadMail;
