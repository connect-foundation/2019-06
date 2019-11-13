import React, { useState, useRef } from 'react';
import S from './styled';
import V from '../../../utils/validator';

const ListOfReceivers = () => {
  const [BLANK, SPACE] = ['', ' '];

  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);
  const inputWidthGuide = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
  };

  const deleteByRegExp = regex => val => val.replace(new RegExp(regex, 'gi'), BLANK);
  const replaceAndSetReceiver = (f, target) => {
    const replaced = f(target.value);
    if (replaced !== BLANK) {
      setReceivers([...receivers, replaced]);
      target.value = BLANK;
      resizeInput(target);
    }
  };

  const keyDownHandler = e => {
    const { key, target } = e;
    if (key === 'Backspace' && target.value === BLANK && receivers.length > 0) {
      target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (key === 'Enter' && target.value !== BLANK) {
      replaceAndSetReceiver(deleteByRegExp(','), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
    if (target.value.includes(',') && target.value !== ',') {
      replaceAndSetReceiver(deleteByRegExp(','), target);
    } else if (target.value.includes(SPACE) && target.value !== SPACE) {
      replaceAndSetReceiver(deleteByRegExp(SPACE), target);
    }
  };

  const getReceiverLis = () =>
    receivers.map((receiver, idx) => (
      <S.ReceiverListLi validation={V.validate('email', receiver)} key={idx}>
        {receiver}
        <S.ReceiverLiDeleteBtn
          onClick={() =>
            setReceivers([...receivers.filter(receivr => receivers.indexOf(receivr) !== idx)])
          }>
          X
        </S.ReceiverLiDeleteBtn>
      </S.ReceiverListLi>
    ));

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverInputWidthGuide ref={inputWidthGuide} />
        <S.ReceiverListUl>{getReceiverLis()}</S.ReceiverListUl>
        <S.ReceiverListInput
          ref={receiverInput}
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          contentEditable={true}
        />
      </S.ReceiverListWrapper>
    </>
  );
};

export default ListOfReceivers;
