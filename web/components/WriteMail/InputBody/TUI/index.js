import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import { Editor } from '@toast-ui/react-editor';

const TUI = () => (
  <Editor
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="450px"
    initialEditType="markdown"
    useCommandShortcut={true}
    exts={['scrollSync', 'colorSyntax', 'mark', 'table']}
    toolbarItems={[
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
    ]}
  />
);

export default TUI;
