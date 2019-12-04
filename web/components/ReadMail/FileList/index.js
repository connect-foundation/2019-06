import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import fileDownload from 'js-file-download';
import prettyBytes from 'pretty-bytes';
import * as GS from '../../GlobalStyle';
import File from './File';
import * as S from './styled';
import request from '../../../utils/request';

const FileList = ({ files }) => {
  const fileList = files.map(file => {
    const isImage = file.type.split('/')[0] === 'image';
    const src = `http://localhost/mail/attachment/${file.no}/preview`;
    return (
      <S.FlexColumnItem>
        <File file={file} key={`file-${file.no}`} /> {prettyBytes(file.size)}
        {isImage && <img src={src} alt={file.name} style={{ width: '50px', hegiht: '50px  ' }} />}
      </S.FlexColumnItem>
    );
  });

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
