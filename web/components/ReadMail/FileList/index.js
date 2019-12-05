import React from 'react';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { List, ListItem, Tooltip } from '@material-ui/core';
import fileDownload from 'js-file-download';
import prettyBytes from 'pretty-bytes';
import * as GS from '../../GlobalStyle';
import * as S from './styled';
import request from '../../../utils/request';

const FileList = ({ files }) => {
  const imageList = [];
  const fileList = files.map(file => {
    const isImage = file.type.split('/')[0] === 'image';
    const src = `http://localhost/mail/attachment/${file.no}/preview`;
    if (isImage) {
      imageList.push(
        <S.ImageColumn key={`image${file.no}`}>
          <S.ImageWrapper onClick={() => window.open(src, '_blank')}>
            <S.Image src={src} alt={file.name} />
          </S.ImageWrapper>
          <S.ImageName id={file.no}>{file.name}</S.ImageName>
        </S.ImageColumn>,
      );
    }
    return (
      <Tooltip key={file.no} title={prettyBytes(file.size)} placement="right" open={true}>
        <ListItem
          style={{
            display: 'block',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          button
          id={file.no}>
          {file.name}
        </ListItem>
      </Tooltip>
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
      <List style={{ width: '300px' }}>{fileList}</List>
      <S.ImageGrid>{imageList}</S.ImageGrid>
    </GS.FlexColumnWrap>
  );
};

export default FileList;
