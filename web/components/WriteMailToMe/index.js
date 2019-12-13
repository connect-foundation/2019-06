import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import * as S from '../WriteMail/styled';
import InputReceiver from '../WriteMail/InputReceiver';
import InputSubject from '../WriteMail/InputSubject';
import Tools from '../WriteMail/Tools';
import { WriteMailContextProvider } from '../WriteMail/ContextProvider';
import DropZone from '../WriteMail/DropZone';
import sessionStorage from '../../utils/storage';
import HeadTitle from '../HeadTitle';

const InputBody = dynamic(import('../WriteMail/InputBody'), { ssr: false });

const WriteMailToMe = () => {
  const [dropZoneVisible, setDropZoneVisible] = useState(false);

  return (
    <WriteMailContextProvider>
      <HeadTitle title="내게쓰기" />
      <S.WriteArea>
        <Tools
          writeToMe={!!sessionStorage.getUser().email}
          dropZoneVisible={dropZoneVisible}
          setDropZoneVisible={setDropZoneVisible}
        />
        <InputReceiver defaultReceiver={sessionStorage.getUser().email} />
        <InputSubject />
        <DropZone visible={dropZoneVisible} />
        <InputBody />
      </S.WriteArea>
    </WriteMailContextProvider>
  );
};

export default WriteMailToMe;
