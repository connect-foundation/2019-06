import React from 'react';
import { Button } from '@material-ui/core';

const SwitchDropzone = ({ dropZoneVisible, setDropZoneVisible }) => (
  <Button
    variant="outlined"
    style={{ marginLeft: '10px' }}
    onClick={() => setDropZoneVisible(!dropZoneVisible)}>
    {dropZoneVisible ? '첨부파일 닫기' : '첨부파일 열기'}
  </Button>
);

export default SwitchDropzone;
