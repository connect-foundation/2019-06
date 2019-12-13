import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import S from './styled';
import { DATE_CHANGES } from '../context';

const DATE_FORMAT = 'yyyyMMdd';
const { START_DATE, END_DATE } = DATE_CHANGES;

const DateInput = ({ label, dispatch, startDate, endDate }) => {
  const [today] = useState(new Date());

  const handleDataChange = (date, isStart = true) => {
    if (isStart) {
      return dispatch({ type: START_DATE, payload: date });
    }
    return dispatch({ type: END_DATE, payload: date });
  };

  return (
    <S.FlexRowWrap>
      <S.Label>{label}</S.Label>
      <S.DatePickerWrap>
        <S.DatePickerItem>
          <DatePicker
            selected={startDate}
            dateFormat={DATE_FORMAT}
            onChange={date => handleDataChange(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            isClearable
            maxDate={today}
          />
        </S.DatePickerItem>
        <S.DatePickerItem>-</S.DatePickerItem>
        <S.DatePickerItem>
          <DatePicker
            selected={endDate}
            dateFormat={DATE_FORMAT}
            onChange={date => handleDataChange(date, false)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            isClearable
            maxDate={today}
          />
        </S.DatePickerItem>
      </S.DatePickerWrap>
    </S.FlexRowWrap>
  );
};

export default DateInput;
