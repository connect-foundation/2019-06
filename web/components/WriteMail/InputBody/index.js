import React, { useEffect } from 'react';
import Editor from 'tui-editor';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'tui-editor/dist/tui-editor.min.css';
import * as WM_S from '../styled';
import { useDispatchForWM } from '../ContextProvider';
import { UPDATE_TEXT } from '../ContextProvider/reducer/action-type';

const toolbarItems = [
  'heading',
  'bold',
  'italic',
  'strike',
  'divider',
  'hr',
  'quote',
  'divider',
  'ul',
  'ol',
  'task',
  'indent',
  'outdent',
  'divider',
  'table',
  'link',
  'divider',
  'code',
  'codeblock',
];
let editor;

const InputBody = () => {
  const dispatch = useDispatchForWM();

  useEffect(() => {
    editor = new Editor({
      initialValue: '',
      el: document.getElementById('editor-section'),
      previewStyle: 'vertical',
      height: '450px',
      initialEditType: 'markdown',
      useCommandShortcut: true,
      exts: ['scrollSync', 'colorSyntax', 'mark', 'table'],
      toolbarItems,
    });

    const handleEditorBlur = () => {
      dispatch({ type: UPDATE_TEXT, payload: { text: editor.getHtml() } });
    };

    editor.on('blur', handleEditorBlur);
  }, [dispatch]);

  return (
    <WM_S.RowWrapper>
      <WM_S.Label>내용</WM_S.Label>
      <div id="editor-section"></div>
    </WM_S.RowWrapper>
  );
};

export default InputBody;
