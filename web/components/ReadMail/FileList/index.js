import React from 'react';
import styled from 'styled-components';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { makeStyles } from '@material-ui/core/styles';
import * as GS from '../../GlobalStyle';
import File from './File';

const useStyles = makeStyles(theme => ({
  root: {
    '& > svg': {
      margin: theme.spacing(2),
    },
  },
}));

const FileList = ({ files }) => {
  const fileList = files.map(file => <File file={file} />);
  const { length } = fileList;
  const classes = useStyles();
  return (
    <GS.FlexColumnWrap>
      <AttachFileIcon> </AttachFileIcon>
      <div className={classes.root}>첨부파일 {length}개</div>
      {fileList}
    </GS.FlexColumnWrap>
  );
};

export default FileList;
