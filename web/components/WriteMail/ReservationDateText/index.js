import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';

import * as S from './styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { UPDATE_DATE } from '../ContextProvider/reducer/action-type';
import { transformDateForReservationDateText } from '../../../utils/transform-date';

const ReservationDateText = () => {
  const { date } = useStateForWM();
  const dispatch = useDispatchForWM();

  const handleClick = () => {
    dispatch({ type: UPDATE_DATE, payload: { date: '' } });
  };

  return (
    <>
      <S.Text>{date ? transformDateForReservationDateText(date) : ''}</S.Text>
      {date && (
        <CloseIcon
          color={'error'}
          onClick={handleClick}
          size={20}
          style={{ paddingTop: '2px', cursor: 'pointer' }}
        />
      )}
    </>
  );
};

export default ReservationDateText;
