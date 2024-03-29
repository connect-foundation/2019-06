import React, { useRef, useEffect } from 'react';
import * as S from './styled';
import * as WM_S from '../styled';
import V from '../../../utils/validator';
import * as SC from '../../../utils/special-characters';
import { useDispatchForWM, useStateForWM } from '../ContextProvider';
import { UPDATE_RECEIVERS } from '../ContextProvider/reducer/action-type';

const extractAddress = receiver => {
  const address = /<.{3,40}@.{3,40}>/.exec(receiver);
  return address ? address[0].slice(1, -1) : receiver;
};

const ListOfReceivers = ({ defaultReceiver }) => {
  const { receivers } = useStateForWM();
  const dispatch = useDispatchForWM();
  const receiverInput = useRef(null);
  const inputWidthGuide = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
  };

  useEffect(() => {
    if (defaultReceiver) {
      dispatch({
        type: UPDATE_RECEIVERS,
        payload: { receivers: [extractAddress(defaultReceiver)] },
      });
    }
  }, [defaultReceiver]);

  const splitBySpecialCharacter = specialCharacter => val => val.split(specialCharacter);
  const replaceAndSetReceiver = (split, target) => {
    const splitedEmails = split(target.value);
    const filteredReceivers = splitedEmails.filter(re => re !== '' && !receivers.includes(re));
    if (splitedEmails && splitedEmails !== SC.BLANK) {
      dispatch({
        type: UPDATE_RECEIVERS,
        payload: { receivers: [...receivers, ...filteredReceivers] },
      });
    }
    target.value = SC.BLANK;
    resizeInput(target);
  };

  const keyDownHandler = e => {
    const { key, target } = e;
    if (key === SC.BACKSPACE && target.value === SC.BLANK && receivers.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      target.value = receivers[receivers.length - 1];
      dispatch({ type: UPDATE_RECEIVERS, payload: { receivers: receivers.slice(0, -1) } });
      resizeInput(target);
    } else if (key === SC.ENTER && target.value !== SC.BLANK) {
      replaceAndSetReceiver(splitBySpecialCharacter(SC.COMMA), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    if (target.value.includes(SC.COMMA) && target.value !== SC.COMMA) {
      replaceAndSetReceiver(splitBySpecialCharacter(SC.COMMA), target);
    } else if (target.value.includes(SC.SPACE) && target.value !== SC.SPACE) {
      replaceAndSetReceiver(splitBySpecialCharacter(SC.SPACE), target);
    } else if (target.value === SC.SPACE || target.value === SC.COMMA) {
      target.value = SC.BLANK;
    }
    resizeInput(target);
  };

  const blurHandler = e => {
    const { target } = e;
    if (target.value !== SC.SPACE && target.value !== SC.COMMA) {
      replaceAndSetReceiver(splitBySpecialCharacter(SC.SPACE), target);
    }
  };

  const receiverDeleteBtn = target =>
    dispatch({
      type: UPDATE_RECEIVERS,
      payload: { receivers: receivers.filter(receiver => receiver !== target) },
    });

  return (
    <WM_S.RowWrapper style={defaultReceiver ? { display: 'none' } : {}}>
      <WM_S.Label>받는 사람</WM_S.Label>
      <S.ReceiverListWrapper onClick={focusOn}>
        <S.ReceiverInputWidthGuide ref={inputWidthGuide} />
        <S.ReceiverListUl>
          {receivers.map((receiver, idx) => (
            <S.ReceiverListLi validation={V.validate('email', receiver)} key={idx}>
              {receiver}
              <S.ReceiverLiDeleteBtn onClick={() => receiverDeleteBtn(receiver)}>
                X
              </S.ReceiverLiDeleteBtn>
            </S.ReceiverListLi>
          ))}
        </S.ReceiverListUl>
        <S.ReceiverListInput
          ref={receiverInput}
          onKeyDown={keyDownHandler}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
      </S.ReceiverListWrapper>
    </WM_S.RowWrapper>
  );
};

export default ListOfReceivers;
