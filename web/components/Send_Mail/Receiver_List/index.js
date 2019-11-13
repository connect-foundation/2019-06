import React, { useState, useRef } from 'react';
import S from './styled';
import V from '../../../utils/validator';

const ListOfReceivers = () => {
  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);
  const inputWidthGuide = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
  };

  const deleteWithRegex = regex => val => val.replace(new RegExp(regex, 'gi'), '');
  const replaceAndSetReceiver = (f, target) => {
    const replaced = f(target.value);
    if (replaced !== '') {
      setReceivers([...receivers, replaced]);
      target.value = '';
      resizeInput(target);
    }
  };

  const keyDownHandler = e => {
    const { key, target } = e;
    if (key === 'Backspace' && e.target.value === '' && receivers.length > 0) {
      target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (key === 'Enter' && target.value !== '') {
      replaceAndSetReceiver(deleteWithRegex(','), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
    if (target.value.includes(',') && target.value !== ',') {
      replaceAndSetReceiver(deleteWithRegex(','), target);
    } else if (target.value.includes(' ') && target.value !== ' ') {
      replaceAndSetReceiver(deleteWithRegex(' '), target);
    }
  };

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverInputWidthGuide ref={inputWidthGuide} />
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi
              style={
                V.validate('email', receiver)
                  ? {}
                  : { backgroundColor: '#D93024', color: '#FDEFEF' }
              }
              key={idx}>
              {receiver}
              <S.ReceiverLiDeleteBtn
                onClick={() =>
                  setReceivers([...receivers.filter(receivr => receivers.indexOf(receivr) !== idx)])
                }>
                X
              </S.ReceiverLiDeleteBtn>
            </S.ReceiverListLi>
          ))}
        </S.ReceiverListUl>
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
