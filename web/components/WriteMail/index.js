import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as S from './styled';
import InputReceiver from './InputReceiver';
import InputSubject from './InputSubject';
import Tools from './Tools';
import { WriteMailContextProvider } from './ContextProvider';
import DropZone from './DropZone';

const InputBody = dynamic(import('./InputBody'), { ssr: false });

const WriteMail = ({ mailToReply }) => {
  const [dropZoneVisible, setDropZoneVisible] = useState(false);
  const { from, subject } = mailToReply.MailTemplate;

  return (
    <WriteMailContextProvider>
      <S.WriteArea>
        <Tools dropZoneVisible={dropZoneVisible} setDropZoneVisible={setDropZoneVisible} />
        <InputReceiver defaultReceiver={from} />
        <InputSubject defaultSubject={subject} />
        <DropZone visible={dropZoneVisible} />
        <InputBody />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMail;
