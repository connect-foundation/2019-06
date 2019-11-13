import React, { useState, useRef } from 'react';
import S from './styled';

const ListOfReceivers = () => {
  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const keyDownHandler = e => {
    if (e.key === 'Backspace' && e.target.value === '') {
      e.target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (e.key === 'Enter' && e.target.value !== '') {
      setReceivers([...receivers, e.target.value]);
      e.target.value = '';
    }
  };

  const changeHandler = e => {
    if (e.target.value.includes(',') && e.target.value !== ',') {
      const replaced = e.target.value.replace(/,/gi, '');
      if (replaced !== '') {
        setReceivers([...receivers, e.target.value.replace(/,/gi, '')]);
        e.target.value = '';
      }
    }
  };

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi key={idx}>
              {receiver}
              <S.ReceiverLiDeleteBtn
                key={idx}
                onClick={() =>
                  setReceivers([...receivers.filter(receivr => receivers.indexOf(receivr) !== idx)])
                }>
                x
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
