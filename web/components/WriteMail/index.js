import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import Tools from './Tools';
import { WriteMailContextProvider } from './ContextProvider';
import DropZone from './DropZone';
import HeadTitle from '../HeadTitle';

const InputBody = dynamic(import('./InputBody'), { ssr: false });

const WriteMail = ({ mailToReply }) => {
  const [dropZoneVisible, setDropZoneVisible] = useState(false);

  return (
    <WriteMailContextProvider>
      <HeadTitle title="메일쓰기" />
      <S.WriteArea>
        <Tools dropZoneVisible={dropZoneVisible} setDropZoneVisible={setDropZoneVisible} />
        <InputReceiver defaultReceiver={mailToReply ? mailToReply.MailTemplate.from : null} />
        <InputSubject defaultSubject={mailToReply ? mailToReply.MailTemplate.subject : null} />
        <DropZone visible={dropZoneVisible} />
        <InputBody />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMail;
