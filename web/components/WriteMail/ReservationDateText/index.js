import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

import * as S from './styled';
import { UPDATE_DATE } from '../ContextProvider/reducer/action-type';
import { transformDateForReservationDateText } from '../../../utils/transform-date';

const ReservationDateText = ({ useStateForWM, useDispatchForWM }) => {
  const { date } = useStateForWM();
  const dispatch = useDispatchForWM();

  const handleReservationCancelClick = () => {
    dispatch({ type: UPDATE_DATE, payload: { date: null } });
  };

  return (
    <>
      <S.Text>{date ? transformDateForReservationDateText(date) : ''}</S.Text>
      {date && (
        <CloseIcon
          color={'error'}
          onClick={handleReservationCancelClick}
          size={20}
          style={{ paddingTop: '2px', cursor: 'pointer' }}
        />
      )}
    </>
  );
};

export default ReservationDateText;
