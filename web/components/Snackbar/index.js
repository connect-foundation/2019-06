import React from 'react';
import { Snackbar } from '@material-ui/core';
import MessageSnackbarContentWrapper from './content';

/**
 * top - center에 등장하는 snackbar
 * @param {Object} snackbar - snackbar를 위한 { state, setState } Object
 * @param {Object} snackbar.snackbarState - state for snackbar
 * @param {Boolean} snackbar.snackbarState.open - snackbarState.open
 * @param {String} snackbar.snackbarState.variant - 'error' || 'success' || 'warning'
 * @param {String} snackbar.snackbarState.contentText - snackbar에 넣을 text
 * @param {Function} snackbar.setSnackbarState - setState for snackbar
 * @param {Number} autoHideDuration - 자동 닫힘 시간 (단위 - ms) default: 5000
 */
const MessageSnackbar = ({ snackbarState, setSnackbarState, autoHideDuration = 5000 }) => {
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
      autoHideDuration={autoHideDuration}
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
