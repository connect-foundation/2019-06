import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import S from './styled';
import { DATE_CHANGES } from '../context';

const DATE_FORMAT = 'yyyyMMdd';
const { START_DATE, END_DATE } = DATE_CHANGES;

const DateInput = ({ label, dispatch }) => {
  const [today] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDataChange = (date, isStart = true) => {
    const formatDate = date ? moment(date).format('YYYY/MM/DD') : '';
    if (isStart) {
      setStartDate(date);
      return dispatch({ type: START_DATE, payload: formatDate });
    }
    setEndDate(date);
    return dispatch({ type: END_DATE, payload: formatDate });
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
