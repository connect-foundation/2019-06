import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import { Loop as LoopIcon } from '@material-ui/icons';
import { setView } from '../../../../contexts/reducer';
import { AppDispatchContext } from '../../../../contexts';
import WriteMail from '../../../WriteMail';
import WriteMailToMe from '../../../WriteMailToMe';

const ChangeWriteAreaButton = ({ writeToMe }) => {
  const { dispatch } = useContext(AppDispatchContext);

  return (
    <Button
      variant="outlined"
      onClick={() => dispatch(setView(writeToMe ? <WriteMail /> : <WriteMailToMe />))}>
      <LoopIcon fontSize="small" />
      {writeToMe ? '편지쓰기' : '내게쓰기'}
    </Button>
  );
};

export default ChangeWriteAreaButton;
