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
import * as WM_S from '../styled';
import * as S from './styled';
import { UPDATE_INIT } from '../ContextProvider/reducer/action-type';
import { transformDateToReserve } from '../../../utils/transform-date';
import { ERROR_CANNOT_RESERVATION } from '../../../utils/error-message';
import { useDispatchForWM, useStateForWM } from '../ContextProvider';
import validator from '../../../utils/validator';
import { errorParser } from '../../../utils/error-parser';
import request from '../../../utils/request';
import ReservationTimePicker from '../ReservationTimePicker';
import ReservationDateText from '../ReservationDateText';
import Snackbar, { SNACKBAR_VARIANT, snackbarInitState, getSnackbarState } from '../../Snackbar';

const SNACKBAR_MSG = {
  ERROR: {
    AFTER_DATE: ERROR_CANNOT_RESERVATION,
    EMAIL_VALIDATION: '이메일 형식이 올바르지 않은 것이 존재합니다.',
    INPUT_RECEIVERS: '받는 이메일을 입력해주세요.',
  },
  SUCCESS: {
    SEND: '메일이 성공적으로 전송되었습니다.',
  },
  WAITING: {
    SENDING: '전송중입니다.',
  },
};

const SubmitButton = () => {
  const { receivers, files, subject, html, text, date } = useStateForWM();
  const dispatch = useDispatchForWM();

  const [snackbarState, setSnackbarState] = useState(snackbarInitState);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = async () => {
    if (receivers.length === 0) {
      setSnackbarState(
        getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.INPUT_RECEIVERS),
      );
      return;
    }

    if (!receivers.every(receiver => validator.validate('email', receiver))) {
      setSnackbarState(
        getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.EMAIL_VALIDATION),
      );
      return;
    }

    setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.INFO, SNACKBAR_MSG.WAITING.SENDING));
    const formData = new FormData();
    receivers.forEach(r => {
      formData.append('to', r);
    });
    formData.append('subject', subject);
    formData.append('text', text);
    formData.append('html', html);
    files.forEach(f => {
      formData.append('attachments', f);
    });

    if (date) {
      if (!validator.isAfterDate(date)) {
        setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.AFTER_DATE));
        return;
      }
      formData.append('reservationTime', transformDateToReserve(date));
    }

    const { isError, data } = await request.post('/mail', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (isError) {
      const { message } = errorParser(data);
      setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, message));
    } else {
      dispatch({ type: UPDATE_INIT });
      setSnackbarState(getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.SEND));
    }
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

  const messageSnackbarProps = {
    snackbarState,
    handleClose: () => setSnackbarState({ ...snackbarState, open: false }),
  };

  return (
    <>
      <Snackbar {...messageSnackbarProps} />
      <WM_S.RowWrapper>
        <div></div>
        <S.RowContainer>
          <ButtonGroup variant="outlined" color="default" ref={anchorRef}>
            <Button onClick={handleClick}>보내기</Button>
            <Button color="default" size="small" onClick={handleToggle}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <ReservationDateText />
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
        </S.RowContainer>
      </WM_S.RowWrapper>
      <ReservationTimePicker open={modalOpen} handleModalClose={handleModalClose} />
    </>
  );
};

export default SubmitButton;
