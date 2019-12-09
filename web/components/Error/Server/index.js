import React from 'react';
import S from './styled';
import * as GS from '../../GlobalStyle';
import fixImage from '../../../public/fix.png';

const ServerError = ({ message }) => {
  return (
    <GS.FlexWidthFullWrap>
      <S.FixImage src={fixImage} alt="fix image" />
      <p>죄송합니다. 신속히 고치겠습니다.</p>
      <p>{message}</p>
    </GS.FlexWidthFullWrap>
  );
};

export default ServerError;
