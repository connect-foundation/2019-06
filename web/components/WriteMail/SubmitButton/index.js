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
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { UPDATE_INIT } from '../ContextProvider/reducer/action-type';
import { Message } from './Message';

const [LOADING, SUCCESS, FAIL] = [0, 1, 2];

const SubmitButton = () => {
  const { receivers, files, subject, text } = useStateForWM();
  const dispatch = useDispatchForWM();

  const [sendMessage, setSendMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
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
        console.log(err);
        setSendMessage(<Message icon={FAIL} msg="메세지 전송 실패" />);
      });
  };

  const handleMenuItemClick = () => {
    setOpen(false);
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
                      <MenuItem onClick={event => handleMenuItemClick(event)}>
                        {<SendIcon fontSize="small" />} 보내기 예약
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </WM_S.RowWrapper>
    </>
  );
};

export default SubmitButton;
