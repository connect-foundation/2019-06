import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DeleteIcon from '@material-ui/icons/Delete';
import * as WM_S from '../styled';
import { useStateForWM, useDispatchForWM } from '../ContextProvider';

const DropZone = () => {
  const maxSize = 1048576;
  const { files } = useStateForWM();
  const dispatch = useDispatchForWM();

  const onDrop = useCallback(
    acceptedFiles => {
      dispatch({ type: 'updateFiles', files: acceptedFiles });
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
      type: 'updateFiles',
      files: files.filter(f => f.lastModified !== file.lastModified),
    });
  };

  return (
    <>
      <WM_S.RowWrapper>
        <div></div>
        <div>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {!isDragActive && 'Click here or drop a file to upload!'}
            {isDragActive && 'Drop it!'}
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
