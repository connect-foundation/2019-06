import React from "react";
import * as GS from "../../GlobalStyle";

const UserError = ({ message }) => {
  return (
    <GS.FlexCenterWrap>
      <p>{message}</p>
    </GS.FlexCenterWrap>
  );
};

export default UserError;
