import React from 'react';
import * as GS from '../../GlobalStyle';

const UserError = ({ message }) => {
  return (
    <GS.FlexWidthFullWrap>
      <p>{message}</p>
    </GS.FlexWidthFullWrap>
  );
};

export default UserError;
