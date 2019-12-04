import React from 'react';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import InputBody from './InputBody';
import SubmitButton from './SubmitButton';
import { WriteMailContextProvider, useDispatchForWM, useStateForWM } from './ContextProvider';
import DropZone from './DropZone';

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
