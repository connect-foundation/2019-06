import React, { useCallback, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Avatar,
  IconButton,
  Grid,
} from '@material-ui/core';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DeleteIcon from '@material-ui/icons/Delete';
import prettyBytes from 'pretty-bytes';
import * as WM_S from '../styled';
import * as S from './styled';
import { useDispatchForWM, useStateForWM } from '../ContextProvider';
import { UPDATE_FILES } from '../ContextProvider/reducer/action-type';
import UNAVAILABLE_EXTENSION from '../../../utils/unavailable-extension';
import { AppDispatchContext } from '../../../contexts/index';
import { getSnackbarState, SNACKBAR_VARIANT } from '../../Snackbar';
import { handleSnackbarState } from '../../../contexts/reducer';
import PopoverPopupState from './PopoverPopupState';

const MB = 1000 ** 2;
const FILE_MAX_SIZE = 10 * MB;
const FILE_MAX_COUNT = 5;
const PRETTY_FILE_MAX_SIZE = prettyBytes(FILE_MAX_SIZE);
const FILEUPLOAD_ERROR = {
  OVER_FILE_COUNT: '업로드 가능한 최대 파일의 갯수는 5개 입니다.',
  OVER_FILE_TOTAL_SIZE: '업로드 가능한 총 파일크기는 10MB 입니다.',
  UNAVAILABLE_EXTENSION: '허용하지 않는 확장자 입니다.',
};

const UNAVAILABLE_EXTENSION_STRING = Object.keys(UNAVAILABLE_EXTENSION).join(', ');

const addFileSize = (a, b) => a + b.size;
const add = (a, b) => a + b;

const checkOverSize = sizes => {
  const sum = sizes.reduce(add, 0);
  return sum <= FILE_MAX_SIZE;
};

const checkExtension = fileNames => {
  const errors = [];
  for (const fileName of fileNames) {
    const splitedFileName = fileName.split('.');
    let extension = splitedFileName[splitedFileName.length - 1];
    extension = extension.toLowerCase();
    if (UNAVAILABLE_EXTENSION[extension]) {
      errors.push(fileName);
    }
  }
  if (errors.length > 0) {
    throw ` ${errors.join('  ')}`;
  }

  return true;
};

const DropZone = ({ visible }) => {
  const { dispatch: appDispatch } = useContext(AppDispatchContext);
  const { files } = useStateForWM();
  const dispatch = useDispatchForWM();
  const totalFileSize = files.reduce(addFileSize, 0);

  const onDrop = useCallback(
    newFiles => {
      const totalFileCount = files.length + newFiles.length;
      if (FILE_MAX_COUNT < totalFileCount) {
        appDispatch(
          handleSnackbarState(
            getSnackbarState(SNACKBAR_VARIANT.ERROR, FILEUPLOAD_ERROR.OVER_FILE_COUNT),
          ),
        );
        return;
      }

      const fileNames = newFiles.map(file => file.name);

      try {
        checkExtension(fileNames);
      } catch (error) {
        appDispatch(
          handleSnackbarState(
            getSnackbarState(
              SNACKBAR_VARIANT.ERROR,
              FILEUPLOAD_ERROR.UNAVAILABLE_EXTENSION + error,
            ),
          ),
        );
        return;
      }

      const nextFiles = [...files, ...newFiles];
      const fileSizes = nextFiles.map(file => file.size);
      if (!checkOverSize(fileSizes)) {
        appDispatch(
          handleSnackbarState(
            getSnackbarState(SNACKBAR_VARIANT.ERROR, FILEUPLOAD_ERROR.OVER_FILE_TOTAL_SIZE),
          ),
        );
        return;
      }

      dispatch({ type: UPDATE_FILES, payload: { files: nextFiles } });
    },
    [appDispatch, dispatch, files],
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    minSize: 0,
    multiple: true,
  });

  const delBtnHandler = number => {
    dispatch({
      type: UPDATE_FILES,
      payload: { files: files.filter((file, index) => index !== number) },
    });
  };

  return (
    <div style={{ display: visible ? 'block' : 'none' }}>
      <WM_S.RowWrapper>
        <div></div>
        <div>
          <S.FlexRowWrap>
            <S.FlexItem>
              <PopoverPopupState
                text={'업로드 불가능한 확장자 보기'}
                hoverText={UNAVAILABLE_EXTENSION_STRING}
              />
            </S.FlexItem>
            <S.FlexItem>
              <S.FileUploadInfo>
                파일 업로드 갯수 : {files.length} / {FILE_MAX_COUNT}
              </S.FileUploadInfo>
              <S.FileUploadInfo>
                파일 업로드 용량 : {prettyBytes(totalFileSize)} / {PRETTY_FILE_MAX_SIZE}
              </S.FileUploadInfo>
            </S.FlexItem>
          </S.FlexRowWrap>
          <S.UploadArea {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
              ? '마우스 버튼을 놓으세요!'
              : '여기를 클릭하시거나 파일을 드래그해서 업로드 하세요!'}
          </S.UploadArea>
        </div>
      </WM_S.RowWrapper>
      {files.length > 0 ? (
        <WM_S.RowWrapper>
          <div></div>
          <div>
            <Grid item xs={12} md={12}>
              <div>
                <List>
                  {files.map((file, idx) => (
                    <ListItem key={idx}>
                      <ListItemAvatar>
                        <Avatar>
                          <AttachmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={file.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => delBtnHandler(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
          </div>
        </WM_S.RowWrapper>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DropZone;
