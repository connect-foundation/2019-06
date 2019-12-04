import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import fileDownload from 'js-file-download';
import prettyBytes from 'pretty-bytes';
import * as GS from '../../GlobalStyle';
import File from './File';
import * as S from './styled';
import request from '../../../utils/request';

const FileList = ({ files }) => {
  const imageList = [];
  const fileList = files.map(file => {
    console.log(file);
    const isImage = file.type.split('/')[0] === 'image';
    const src = `http://localhost/mail/attachment/${file.no}/preview`;
    if (isImage) {
      imageList.push(
        <S.ImageColumn>
          <S.ImageWrapper onClick={() => window.open(src, '_blank')}>
            <S.Image src={src} alt={file.name} />
          </S.ImageWrapper>
          <S.ImageName id={file.no}>{file.name}</S.ImageName>
        </S.ImageColumn>,
      );
    }
    return (
      <S.FlexColumnItem>
        <File file={file} key={`file-${file.no}`} /> {prettyBytes(file.size)}
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
      <S.ImageGrid>{imageList}</S.ImageGrid>
    </GS.FlexColumnWrap>
  );
};

export default FileList;
