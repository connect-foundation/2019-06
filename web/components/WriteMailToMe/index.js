import React from 'react';
import * as S from '../WriteMail/styled';
import InputSubject from '../WriteMail/InputSubject';
import InputBody from '../WriteMail/InputBody';
import SubmitButton from './SubmitButton';
import {
  WriteMailToMeContextProvider,
  useWriteMailToMeState,
  useWriteMailToMeDispatch,
} from './ContextProvider';
import DropZone from '../WriteMail/DropZone';
import ReservationDateText from '../WriteMail/ReservationDateText';

const WriteMailToMe = () => {
  const props = { useWriteMailToMeState, useWriteMailToMeDispatch };
  return (
    <WriteMailToMeContextProvider>
      <S.WriteArea>
        <InputSubject {...props} />
        <InputBody {...props} />
        <S.RowContainer>
          <SubmitButton {...props} />
          <ReservationDateText {...props} />
        </S.RowContainer>
        <DropZone {...props} />
      </S.WriteArea>
    </WriteMailToMeContextProvider>
  );
};

export default WriteMailToMe;
