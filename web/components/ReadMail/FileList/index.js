import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import fileDownload from 'js-file-download';
import * as GS from '../../GlobalStyle';
import File from './File';
import * as S from './styled';
import request from '../../../utils/request';

const FileList = ({ files }) => {
  const fileList = files.map(file => (
    <S.FlexColumnItem>
      <File file={file} key={file.no} />
    </S.FlexColumnItem>
  ));

  const handleDownloadClick = async e => {
    e.preventDefault();
    let { id, innerText } = e.target;
    if (!id || id === '') {
      return;
    }

    id = Number(id);
    if (!Number.isInteger(id)) {
      return;
    }

    const { isError, data } = await request.get(`/mail/attachment/${id}/download`, {
      responseType: 'arraybuffer',
    });

    if (isError) {
      return;
    }
    fileDownload(data, innerText);
  };

  const { length } = fileList;
  return (
    <GS.FlexColumnWrap onClick={handleDownloadClick}>
      <S.FlexColumnHeader>
        <AttachFileIcon />
        첨부파일 {length}개
      </S.FlexColumnHeader>

      {fileList}
    </GS.FlexColumnWrap>
  );
};

export default FileList;
