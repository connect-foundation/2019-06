import React, { useCallback } from 'react';
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
import * as WM_S from '../styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';
import { UPDATE_FILES } from '../ContextProvider/reducer/action-type';

const MB = 1024 * 1024;
const maxSize = 20 * MB;

const DropZone = () => {
  const { files } = useStateForWM();
  const dispatch = useDispatchForWM();

  const onDrop = useCallback(
    acceptedFiles => {
      dispatch({ type: UPDATE_FILES, payload: { files: acceptedFiles } });
    },
    [dispatch],
  );

  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    onDrop,
    minSize: 0,
    maxSize,
    multiple: true,
  });

  const delBtnHandler = file => {
    dispatch({
      type: UPDATE_FILES,
      payload: { files: files.filter(f => f.lastModified !== file.lastModified) },
    });
  };

  return (
    <>
      <WM_S.RowWrapper>
        <div></div>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? 'Drop it!' : 'Click here or drop a file to upload!'}
          </div>
        </div>
      </WM_S.RowWrapper>
      <WM_S.RowWrapper>
        <div></div>
        <div>
          <Grid item xs={12} md={6}>
            <div>
              <List>
                {files.length > 0 &&
                  files.map((file, idx) => (
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
                          onClick={() => delBtnHandler(file)}>
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
    </>
  );
};

export default DropZone;
