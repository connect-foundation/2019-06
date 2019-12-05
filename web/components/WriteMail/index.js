import React from 'react';
import dynamic from 'next/dynamic';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import SubmitButton from './SubmitButton';
import { WriteMailContextProvider } from './ContextProvider';
import DropZone from './DropZone';

const InputBody = dynamic(import('./InputBody'), { ssr: false });

const WriteMail = () => {
  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <SubmitButton />
        <InputReceiver />
        <InputSubject />
        <DropZone />
        <InputBody />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMail;
