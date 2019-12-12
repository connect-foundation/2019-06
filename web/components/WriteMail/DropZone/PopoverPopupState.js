import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default function PopoverPopupState({ text, hoverText }) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {popupState => (
        <div>
          <Button
            variant="contained"
            color="primary"
            {...bindTrigger(popupState)}
            style={{ backgroundColor: '#0066FF' }}>
            {text}
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Box p={2}>
              <Typography style={{ maxWidth: '300px' }}>{hoverText}</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
