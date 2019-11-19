import React, { useRef, useContext } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import V from '../../../utils/validator';
import { WriteMailContext } from '../ContextProvider';
import SC from '../../../utils/special-characters';

const ListOfReceivers = () => {
  const { receivers, setReceivers } = useContext(WriteMailContext).receiver;
  const receiverInput = useRef(null);
  const inputWidthGuide = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
  };

  const deleteByRegExp = regex => val => val.replace(new RegExp(regex, 'gi'), SC.BLANK);
  const replaceAndSetReceiver = (f, target) => {
    const replaced = f(target.value);
    if (replaced !== SC.BLANK) {
      setReceivers([...receivers, replaced]);
      target.value = SC.BLANK;
      resizeInput(target);
    }
  };

  const keyDownHandler = e => {
    const { key, target } = e;
    if (key === SC.BACKSPACE && target.value === SC.BLANK && receivers.length > 0) {
      target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (key === SC.ENTER && target.value !== SC.BLANK) {
      replaceAndSetReceiver(deleteByRegExp(SC.COMMA), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    resizeInput(target);
    if (target.value.includes(SC.COMMA) && target.value !== SC.COMMA) {
      replaceAndSetReceiver(deleteByRegExp(SC.COMMA), target);
    } else if (target.value.includes(SC.SPACE) && target.value !== SC.SPACE) {
      replaceAndSetReceiver(deleteByRegExp(SC.SPACE), target);
    }
  };

  // 문자가 같으면 오류 발생
  const receiverDeleteBtn = idx =>
    setReceivers([...receivers.filter(receiver => receivers.indexOf(receiver) !== idx)]);

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>받는 사람</WM_S.Label>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverInputWidthGuide ref={inputWidthGuide} />
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi validation={V.validate('email', receiver)} key={idx}>
              {receiver}
              <S.ReceiverLiDeleteBtn onClick={() => receiverDeleteBtn(idx)}>
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
    </WM_S.RowWrapper>
  );
};

export default ListOfReceivers;
