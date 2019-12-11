import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import S from './styled';

const DateInput = ({ label }) => {
  const [today] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(today);

  return (
    <S.FlexRowWrap>
      <S.Label>{label}</S.Label>
      <DatePicker
        selected={startDate}
        dateFormat="yyyyMMdd"
        onChange={date => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        isClearable
        maxDate={today}
      />
      {'-'}
      <DatePicker
        selected={endDate}
        dateFormat="yyyyMMdd"
        onChange={date => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        isClearable
        maxDate={today}
      />
    </S.FlexRowWrap>
  );
};

export default DateInput;
