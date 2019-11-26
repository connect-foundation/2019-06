/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { useRouter } from 'next/router';

import * as S from './styled';

const MessageHeader = () => {
  const router = useRouter();
  const [message, setMessage] = useState(router.query.message || '');

  return (
    <S.TopContainer show={message !== ''}>
      <S.Text>{message}</S.Text>
      <HighlightOffIcon
        size="20px"
        style={{ cursor: 'pointer', marginRight: '20px', color: 'white' }}
        onClick={() => setMessage('')}
      />
    </S.TopContainer>
  );
};

export default MessageHeader;
