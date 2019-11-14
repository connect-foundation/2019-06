import React from 'react';
import S from './styled';
import InputReceiver from './Input_Receiver';
import InputSubject from './Input_Subject';

const SendMail = () => (
  <S.DivWrite>
    <InputReceiver />
    <InputSubject />
  </S.DivWrite>
);

export default SendMail;
