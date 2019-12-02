import React from 'react';
import { Snackbar } from '@material-ui/core';
import MessageSnackbarContentWrapper from './content';

const MessageSnackbar = ({ snackbarState, setSnackbarState }) => {
  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbarState.open}
      autoHideDuration={5000}
      onClose={handleClose}>
      <MessageSnackbarContentWrapper
        onClose={handleClose}
        variant={snackbarState.variant}
        message={snackbarState.contentText}
      />
    </Snackbar>
  );
};

export default MessageSnackbar;
