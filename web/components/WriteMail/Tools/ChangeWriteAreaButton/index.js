import React from 'react';
import { Button } from '@material-ui/core';
import { Loop as LoopIcon } from '@material-ui/icons';
import { changeUrlWithoutRunning } from '../../../../utils/url/change-query';

const ChangeWriteAreaButton = ({ writeToMe }) => {
  const handleToggleClick = () => {
    const view = writeToMe ? 'write' : 'write-to-me';
    changeUrlWithoutRunning({ view });
  };

  return (
    <Button variant="outlined" onClick={handleToggleClick}>
      <LoopIcon fontSize="small" />
      {writeToMe ? '메일쓰기' : '내게쓰기'}
    </Button>
  );
};

export default ChangeWriteAreaButton;
