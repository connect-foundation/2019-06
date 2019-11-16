import React from 'react';
import S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import InputBody from './InputBody';
import SubmitButton from './SubmitButton';
import WriteMailContextProvider from './ContextProvider';

const WriteMail = () => (
  <WriteMailContextProvider>
    <S.WriteArea>
      <InputReceiver />
      <InputSubject />
      <InputBody />
      <SubmitButton />
    </S.WriteArea>
  </WriteMailContextProvider>
);

export default WriteMail;
