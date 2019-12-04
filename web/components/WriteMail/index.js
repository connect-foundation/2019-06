import React from 'react';
import dynamic from 'next/dynamic';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import SubmitButton from './SubmitButton';
import { WriteMailContextProvider, useDispatchForWM, useStateForWM } from './ContextProvider';
import DropZone from './DropZone';

const InputBody = dynamic(import('./InputBody'), { ssr: false });

const WriteMail = () => {
  const props = { useStateForWM, useDispatchForWM };
  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <InputReceiver {...props} />
        <InputSubject {...props} />
        <InputBody {...props} />
        <SubmitButton {...props} />
        <DropZone {...props} />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMail;
