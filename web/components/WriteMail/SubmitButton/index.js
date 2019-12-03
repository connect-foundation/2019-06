import React, { useState } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SendIcon from '@material-ui/icons/Send';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Grow,
} from '@material-ui/core';
import axios from 'axios';
import * as WM_S from '../styled';
import * as S from './styled';
import { UPDATE_INIT } from '../ContextProvider/reducer/action-type';
import { Message } from './Message';
import { transformDateToReserve } from '../../../utils/transform-date';
import { ERROR_CANNOT_RESERVATION } from '../../../utils/error-message';
import validator from '../../../utils/validator';
import ReservationTimePicker from '../ReservationTimePicker';

const [LOADING, SUCCESS, FAIL] = [0, 1, 2];

const SubmitButton = ({ useStateForWM, useDispatchForWM }) => {
  const { receivers, files, subject, text, date } = useStateForWM();
  const dispatch = useDispatchForWM();

  const [sendMessage, setSendMessage] = useState(null);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    setSendMessage(<Message icon={LOADING} msg="메세지 보내는 중..." />);

    const formData = new FormData();
    receivers.forEach(r => {
      formData.append('to', r);
    });
    formData.append('subject', subject);
    formData.append('text', text);
    files.forEach(f => {
      formData.append('attachments', f);
    });

    if (date) {
      if (!validator.isAfterDate(date)) {
        setSendMessage(<Message icon={FAIL} msg={ERROR_CANNOT_RESERVATION} />);
        return;
      }
      formData.append('reservationTime', transformDateToReserve(date));
    }

    axios
      .post('/mail', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setSendMessage(<Message icon={SUCCESS} msg="메일 전송 완료" />);
        dispatch({ type: UPDATE_INIT });
      })
      .catch(err => {
        setSendMessage(<Message icon={FAIL} msg="메세지 전송 실패" />);
      });
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleReservationClick = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      {sendMessage}
      <WM_S.RowWrapper>
        <div></div>
        <div>
          <ButtonGroup variant="outlined" color="default" ref={anchorRef}>
            <Button onClick={handleClick}>보내기</Button>
            <Button color="default" size="small" onClick={handleToggle}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList id="split-button-menu">
                      <MenuItem onClick={handleReservationClick}>
                        <S.VerticalAlign>
                          {<SendIcon fontSize="small" />} <span>보내기 예약</span>
                        </S.VerticalAlign>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </WM_S.RowWrapper>
      <ReservationTimePicker
        open={modalOpen}
        handleModalClose={handleModalClose}
        useDispatchForWM={useDispatchForWM}
      />
    </>
  );
};

export default SubmitButton;
