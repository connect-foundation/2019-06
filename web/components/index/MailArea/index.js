import React from 'react';
import * as S from './styled';
import MailTemplate from '../MailTemplate';

const MailArea = () => (
  <S.MailArea>
    <S.Tools>tools</S.Tools>
    <S.MailListArea>mail list area</S.MailListArea>
    <S.MailPagingArea>Paging Area</S.MailPagingArea>
  </S.MailArea>
);

export default MailArea;
