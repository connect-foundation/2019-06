import React, { useState, useRef } from 'react';
import S from './styled';

const ListOfReceivers = () => {
  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);
  const rcvDiv = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    rcvDiv.current.innerText = target.value;
    target.style.width = `${rcvDiv.current.clientWidth + 35}px`;
  };
  const deleteAllComma = val => val.replace(/,/gi, '');
  const replaceAndSetReceiver = (f, target, cb) => {
    const replaced = f(target.value);
    if (replaced !== '') {
      setReceivers([...receivers, replaced]);
      target.value = '';
      cb(target);
    }
  };

  const keyDownHandler = e => {
    if (e.key === 'Backspace' && e.target.value === '' && receivers.length > 0) {
      e.target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (e.key === 'Enter' && e.target.value !== '') {
      replaceAndSetReceiver(deleteAllComma, e.target, resizeInput);
    }
  };

  const changeHandler = e => {
    rcvDiv.current.innerText = e.target.value;
    e.target.style.width = `${rcvDiv.current.clientWidth + 35}px`;
    if (e.target.value.includes(',') && e.target.value !== ',') {
      replaceAndSetReceiver(deleteAllComma, e.target, resizeInput);
    }
  };

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverDiv ref={rcvDiv} />
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi key={idx}>
              {receiver}
              <S.ReceiverLiDeleteBtn
                key={idx}
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
