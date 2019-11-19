import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { WriteMailContext } from '../ContextProvider';
import * as WM_S from '../styled';
import { BASE_URL } from '../../../config/axios-config';

const SubmitButton = () => {
  const { receivers } = useContext(WriteMailContext).receiver;
  const { subjectComponent, bodyComponent } = useContext(WriteMailContext);
  const [sendMessage, setSendMessage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    setSendMessage(
      <WM_S.RowWrapper>
        <div></div>
        <div>보내는 중...</div>
      </WM_S.RowWrapper>,
    );

    axios
      .post(
        `${BASE_URL}/mail`,
        {
          to: receivers,
          subject: subjectComponent.current.value,
          text: bodyComponent.current.innerText,
        },
        { withCredentials: true },
      )
      .then(() => {
        setSendMessage(
          <WM_S.RowWrapper>
            <div></div>
            <div>메일 전송 완료</div>
          </WM_S.RowWrapper>,
        );
      })
      .catch(err => {
        console.log(err);
        setSendMessage(
          <WM_S.RowWrapper>
            <div></div>
            <div>메일 전송 실패</div>
          </WM_S.RowWrapper>,
        );
      });
    console.log(receivers);
    console.log(subjectComponent.current.value);
    console.log(bodyComponent.current.innerText);
  };

  const handleMenuItemClick = () => {
    console.log('보내기 예약 클릭');
    console.log(receivers);
    console.log(subjectComponent.current.value);
    console.log(bodyComponent.current.innerText);
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
