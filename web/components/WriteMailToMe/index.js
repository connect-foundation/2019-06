import React from 'react';
import dynamic from 'next/dynamic';
import * as S from '../WriteMail/styled';
import InputReceiver from '../WriteMail/InputReceiver';
import InputSubject from '../WriteMail/InputSubject';
import SubmitButton from '../WriteMail/SubmitButton';
import { WriteMailContextProvider } from '../WriteMail/ContextProvider';
import DropZone from '../WriteMail/DropZone';
import sessionStorage from '../../utils/storage';

const InputBody = dynamic(import('../WriteMail/InputBody'), { ssr: false });

const WriteMailToMe = () => {
  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <InputReceiver defaultReceiver={sessionStorage.getUser().email} />
        <InputSubject />
        <InputBody />
        <SubmitButton />
        <DropZone />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMailToMe;
