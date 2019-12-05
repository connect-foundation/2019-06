import React from 'react';
import { Snackbar } from '@material-ui/core';
import MessageSnackbarContentWrapper from './content';

/**
 * top - center에 등장하는 snackbar
 * @param {Object} snackbar - snackbar를 위한 { state, setState } Object
 * @param {Boolean} snackbar.snackbarOpen
 * @param {String} snackbar.snackbarVariant - 'error' || 'success' || 'info'
 * @param {String} snackbar.snackbarContent - snackbar에 넣을 text
 * @param {Function} snackbar.snackbarClose - 스낵바를 받아줄 close 함수를 넣어주세요
 * @param {Number} snackbar.autoHideDuration - 자동 닫힘 시간 (단위 - ms) default: 5000
 */
const MessageSnackbar = ({
  snackbarOpen,
  snackbarVariant,
  snackbarContent,
  snackbarClose,
  autoHideDuration = 5000,
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackbarOpen}
      autoHideDuration={autoHideDuration}
      onClose={snackbarClose}>
      <MessageSnackbarContentWrapper
        onClose={snackbarClose}
        variant={snackbarVariant}
        message={snackbarContent}
      />
    </Snackbar>
  );
};

export const snackbarInitState = {
  snackbarOpen: false,
  snackbarVariant: 'error',
  snackbarContent: '',
  snackbarClose: null,
};

export const SNACKBAR_VARIANT = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
};

export const getSnackbarState = (variant, contentText) => {
  return {
    snackbarOpen: true,
    snackbarVariant: variant,
    snackbarContent: contentText,
  };
};

export default MessageSnackbar;
