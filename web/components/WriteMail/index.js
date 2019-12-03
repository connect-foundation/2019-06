import React from 'react';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import InputBody from './InputBody';
import SubmitButton from './SubmitButton';
import { WriteMailContextProvider, useDispatchForWM, useStateForWM } from './ContextProvider';
import DropZone from './DropZone';
import ReservationDateText from './ReservationDateText';

const WriteMail = () => {
  const props = { useStateForWM, useDispatchForWM };
  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <InputReceiver {...props} />
        <InputSubject {...props} />
        <InputBody {...props} />
        <S.RowContainer>
          <SubmitButton {...props} />
          <ReservationDateText {...props} />
        </S.RowContainer>
        <DropZone {...props} />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMail;
