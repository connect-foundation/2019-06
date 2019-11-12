import React, { useState, useRef } from 'react';
import S from './styled';

const ListOfReceivers = () => {
  const [receivers, setReceivers] = useState([]);
  const receiverInput = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const keyDownHandler = e => {};

  return (
    <>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverListUl>
          {receivers}
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
          <S.ReceiverListLi>
            123123
            <S.ReceiverLiDeleteBtn>x</S.ReceiverLiDeleteBtn>
          </S.ReceiverListLi>
        </S.ReceiverListUl>
        <S.ReceiverListInput
          ref={receiverInput}
          onKeyDown={keyDownHandler}
          contentEditable={true}
        />
      </S.ReceiverListWrapper>
    </>
  );
};

export default ListOfReceivers;
