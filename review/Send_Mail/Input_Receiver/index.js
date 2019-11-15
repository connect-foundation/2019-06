import React, { useRef, useContext } from "react";
import S from "./styled";
import GS from "../styled";
import V from "../../../utils/validator";
import { sendMailContext } from "../context";

const ListOfReceivers = () => {
  const [BLANK, SPACE, BACKSPACE, ENTER, COMMA] = [
    "",
    " ",
    "Backspace",
    "Enter",
    ","
  ];

  const { receivers, setReceivers } = useContext(sendMailContext).receiver;
  const receiverInput = useRef(null);
  const inputWidthGuide = useRef(null);

  const focusOn = () => receiverInput.current.focus();
  const resizeInput = target => {
    inputWidthGuide.current.innerText = target.value;
    target.style.width = `${inputWidthGuide.current.clientWidth + 35}px`;
  };

  const deleteByRegExp = regex => val =>
    val.replace(new RegExp(regex, "gi"), BLANK);
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
    if (key === BACKSPACE && target.value === BLANK && receivers.length > 0) {
      target.value = receivers[receivers.length - 1];
      setReceivers([...receivers.slice(0, -1)]);
    } else if (key === ENTER && target.value !== BLANK) {
      replaceAndSetReceiver(deleteByRegExp(COMMA), target);
    }
  };

  const changeHandler = e => {
    const { target } = e;
    resizeInput(target);
    if (target.value.includes(COMMA) && target.value !== COMMA) {
      replaceAndSetReceiver(deleteByRegExp(COMMA), target);
    } else if (target.value.includes(SPACE) && target.value !== SPACE) {
      replaceAndSetReceiver(deleteByRegExp(SPACE), target);
    }
  };

  const getReceiverLis = () =>
    receivers.map((receiver, idx) => (
      <S.ReceiverListLi validation={V.validate("email", receiver)} key={idx}>
        {receiver}
        <S.ReceiverLiDeleteBtn
          onClick={() =>
            setReceivers([
              ...receivers.filter(receivr => receivers.indexOf(receivr) !== idx)
            ])
          }
        >
          X
        </S.ReceiverLiDeleteBtn>
      </S.ReceiverListLi>
    ));

  return (
    <GS.RowWrapper>
      <GS.Label>받는 사람</GS.Label>
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
    </GS.RowWrapper>
  );
};

export default ListOfReceivers;
