import React, { useState, useContext } from 'react';
import { Send as SendIcon, ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
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
import { transformDateToReserve } from '../../../utils/transform-date';
import { ERROR_CANNOT_RESERVATION } from '../../../utils/error-message';
import { useStateForWM } from '../ContextProvider';
import { AppDispatchContext } from '../../../contexts';
import { handleSnackbarState } from '../../../contexts/reducer';
import ChangeWriteAreaButton from './ChangeWriteAreaButton';
import SwitchDropzone from './SwitchDropzone';
import validator from '../../../utils/validator';
import { errorParser } from '../../../utils/error-parser';
import request from '../../../utils/request';
import ReservationTimePicker from '../ReservationTimePicker';
import ReservationDateText from '../ReservationDateText';
import { SNACKBAR_VARIANT, getSnackbarState } from '../../Snackbar';
import { changeView, VIEW_STRING } from '../../../utils/url/change-query';

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

const Tools = ({ writeToMe, dropZoneVisible, setDropZoneVisible }) => {
  const { receivers, files, subject, html, text, date } = useStateForWM();
  const { dispatch: pageDispatch } = useContext(AppDispatchContext);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [sendBtnDisabledState, setSendBtnDisabledState] = useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = async () => {
    if (receivers.length === 0) {
      pageDispatch(
        handleSnackbarState(
          getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.INPUT_RECEIVERS),
        ),
      );
      return;
    }

    if (!receivers.every(receiver => validator.validate('email', receiver))) {
      pageDispatch(
        handleSnackbarState(
          getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.EMAIL_VALIDATION),
        ),
      );
      return;
    }

    pageDispatch(
      handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.INFO, SNACKBAR_MSG.WAITING.SENDING)),
    );

    const formData = new FormData();

    if (date) {
      if (!validator.isAfterDate(date)) {
        pageDispatch(
          handleSnackbarState(
            getSnackbarState(SNACKBAR_VARIANT.ERROR, SNACKBAR_MSG.ERROR.AFTER_DATE),
          ),
        );
        return;
      }
      formData.append('reservationTime', transformDateToReserve(date));
    }
    receivers.forEach(receiver => {
      formData.append('to', receiver);
    });
    formData.append('subject', subject);
    formData.append('text', text);
    formData.append('html', html);
    files.forEach(file => {
      formData.append('attachments', file);
    });

    setSendBtnDisabledState(true);

    const { isError, data } = await request.post('/mail', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (isError) {
      const { message } = errorParser(data);
      pageDispatch(handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.ERROR, message)));
      setSendBtnDisabledState(false);
    } else {
      pageDispatch(
        handleSnackbarState(getSnackbarState(SNACKBAR_VARIANT.SUCCESS, SNACKBAR_MSG.SUCCESS.SEND)),
      );
      setSendBtnDisabledState(false);
      changeView(VIEW_STRING.LIST);
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
    setOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      <WM_S.RowWrapper>
        <div></div>
        <S.RowContainer>
          <ButtonGroup variant="outlined" color="default" ref={anchorRef}>
            <Button disabled={sendBtnDisabledState} onClick={handleClick}>
              보내기
            </Button>
            {!writeToMe && (
              <Button color="default" size="small" onClick={handleToggle}>
                <ArrowDropDownIcon />
              </Button>
            )}
          </ButtonGroup>
          <ReservationDateText />
          <ChangeWriteAreaButton writeToMe={writeToMe} />
          <SwitchDropzone {...{ dropZoneVisible, setDropZoneVisible }} />
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

export default Tools;
