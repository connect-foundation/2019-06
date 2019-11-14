import React, { useContext } from 'react';
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
import { sendMailContext } from '../context';
import GS from '../styled';

const SubmitButton = () => {
  const { receivers } = useContext(sendMailContext).receiver;
  const { subjectComponent, bodyComponent } = useContext(sendMailContext);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleClick = () => {
    console.info('보내기 클릭');
    console.log(receivers);
    console.log(subjectComponent.current.value);
    console.log(bodyComponent.current.innerText);
  };

  const handleMenuItemClick = event => {
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
    <GS.RowWrapper>
      <div></div>
      <div>
        <ButtonGroup variant="outlined" color="default" ref={anchorRef}>
          <Button onClick={handleClick}>보내기</Button>
          <Button color="default" size="small" onClick={handleToggle}>
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
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
    </GS.RowWrapper>
  );
};

export default SubmitButton;
