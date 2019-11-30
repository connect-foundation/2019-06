import React from 'react';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import InputBody from './InputBody';
import SubmitButton from './SubmitButton';
import { WriteMailContextProvider } from './ContextProvider';
import DropZone from './DropZone';
import ReservationTimePicker from './ReservationTimePicker';
import ReservationDateText from './ReservationDateText';

const WriteMail = () => (
  <WriteMailContextProvider>
    <S.WriteArea>
      <InputReceiver />
      <InputSubject />
      <InputBody />
      <S.RowContainer>
        <SubmitButton />
        <ReservationDateText />
      </S.RowContainer>
      <DropZone />
      <ReservationTimePicker />
    </S.WriteArea>
  </WriteMailContextProvider>
);

export default WriteMail;
