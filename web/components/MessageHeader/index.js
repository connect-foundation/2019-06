/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import * as S from './styled';
import { AppDisapthContext, AppStateContext } from '../../contexts';
import { setMessage } from '../../contexts/reducer';

const MessageHeader = () => {
  const { state } = useContext(AppStateContext);
  const { dispatch } = useContext(AppDisapthContext);

  return (
    <S.TopContainer show={state.message !== ''}>
      <S.Text>{state.message}</S.Text>
      <HighlightOffIcon
        size="20px"
        style={{ cursor: 'pointer', marginRight: '20px', color: 'white' }}
        onClick={() => dispatch(setMessage(''))}
      />
    </S.TopContainer>
  );
};

export default MessageHeader;
