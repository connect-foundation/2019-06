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
import Snackbar from '../../Snackbar';

const [ERROR, SUCCESS] = [true, false];

const snackbarInitState = {
  open: false,
  variant: 'error',
  contentText: '앗녕',
};

const SNACKBAR_VARIANT = {
  ERROR: 'error',
  SUCCESS: 'success',
};

const SNACKBAR_MSG = {
  ERROR: {
    AFTER_DATE: ERROR_CANNOT_RESERVATION,
    LENGTH: '메일함 이름은 최대 20자를 넘을 수 없습니다.',
    REGEX: '메일함은 완성된 한글, 영문, 숫자로만 이루어질 수 있습니다.',
  },
  SUCCESS: {
    SEND: '메일이 성공적으로 전송되었습니다.',
  },
  WAITING: {
    SENDING: '전송중입니다.',
  },
};

const getSnackbarState = (isError, contentText) => ({
  open: true,
  variant: isError ? SNACKBAR_VARIANT.ERROR : SNACKBAR_VARIANT.SUCCESS,
  contentText,
});

const SubmitButton = () => {
  const { receivers, files, subject, text, date } = useStateForWM();
  const dispatch = useDispatchForWM();

  const [snackbarState, setSnackbarState] = useState(snackbarInitState);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = async () => {
    setSnackbarState({ open: true, variant: 'info', contentText: SNACKBAR_MSG.WAITING.SENDING });
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
        setSnackbarState(getSnackbarState(ERROR, SNACKBAR_MSG.ERROR.AFTER_DATE));
        return;
      }
      formData.append('reservationTime', transformDateToReserve(date));
    }

    const { isError, data } = await request.post('/mail', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (isError) {
      const { message } = errorParser(data);
      setSnackbarState({ open: true, contentText: message, variant: 'error' });
      setSnackbarState(getSnackbarState(ERROR, message));
    } else {
      dispatch({ type: UPDATE_INIT });
      setSnackbarState(getSnackbarState(SUCCESS, SNACKBAR_MSG.SUCCESS.SEND));
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
