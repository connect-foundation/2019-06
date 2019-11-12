import React, { useState, useRef } from 'react';
import S from './styled';

const ListOfReceivers = () => {
  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const keyUpHandler = e => {
    if (e.key === ',' && e.target.innerText !== '') {
      setReceivers([...receivers, e.target.innerText.replace(',', '')]);
      e.target.innerText = '';
    } else if (e.key === 'Backspace') {
      if (e.target.innerText === '') {
        e.target.innerText = receivers[receivers.length - 1];
        setReceivers([...receivers.slice(0, -1)]);
      }
    }
  };

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi>
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
        <S.ReceiverListInput ref={receiverInput} onKeyUp={keyUpHandler} contentEditable={true} />
      </S.ReceiverListWrapper>
    </>
  );
};

export default ListOfReceivers;
