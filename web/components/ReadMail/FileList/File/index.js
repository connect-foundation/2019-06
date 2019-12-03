import React from 'react';
import * as S from './styled';

const File = ({ file }) => {
  return <S.FileSpan id={file.no}>{file.name}</S.FileSpan>;
};

export default File;
