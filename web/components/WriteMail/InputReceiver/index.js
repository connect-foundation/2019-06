import React, { useRef } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import V from '../../../utils/validator';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import * as SC from '../../../utils/special-characters';

const ListOfReceivers = () => {
  const { receivers } = useStateForWM();
  const dispatch = useDispatchForWM();
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
    if (receivers.includes(replaced)) {
      target.value = SC.BLANK;
      return;
    }
    if (replaced !== SC.BLANK) {
      dispatch({ type: 'updateReceivers', receivers: [...receivers, replaced] });
    }
    target.value = SC.BLANK;
    resizeInput(target);
  };

  const keyDownHandler = e => {
    const { key, target } = e;
    if (key === SC.BACKSPACE && target.value === SC.BLANK && receivers.length > 0) {
      target.value = receivers[receivers.length - 1];
      dispatch({ type: 'updateReceivers', receivers: [...receivers.slice(0, -1)] });
    } else if (key === SC.ENTER && target.value !== SC.BLANK) {
      replaceAndSetReceiver(deleteByRegExp(SC.COMMA), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    if (target.value.includes(SC.COMMA) && target.value !== SC.COMMA) {
      replaceAndSetReceiver(deleteByRegExp(SC.COMMA), target);
    } else if (target.value.includes(SC.SPACE) && target.value !== SC.SPACE) {
      replaceAndSetReceiver(deleteByRegExp(SC.SPACE), target);
    } else if (target.value === SC.SPACE || target.value === SC.COMMA) {
      target.value = SC.BLANK;
    }
    resizeInput(target);
  };

  const receiverDeleteBtn = idx =>
    dispatch({
      type: 'updateReceivers',
      receivers: [...receivers.filter(receiver => receivers.indexOf(receiver) !== idx)],
    });

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
