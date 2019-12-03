import React from 'react';
import * as S from '../WriteMail/styled';
import InputReceiver from '../WriteMail/InputReceiver';
import InputSubject from '../WriteMail/InputSubject';
import InputBody from '../WriteMail/InputBody';
import SubmitButton from '../WriteMail/SubmitButton';
import {
  WriteMailContextProvider,
  useDispatchForWM,
  useStateForWM,
} from '../WriteMail/ContextProvider';
import DropZone from '../WriteMail/DropZone';
import sessionStorage from '../../utils/storage';

const WriteMailToMe = () => {
  const props = { useStateForWM, useDispatchForWM };
  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <InputReceiver {...props} defaultReceiver={sessionStorage.getUser().email} />
        <InputSubject {...props} />
        <InputBody {...props} />
        <SubmitButton {...props} />
        <DropZone {...props} />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMailToMe;
