import React, { useEffect } from 'react';
import TUIViewer from 'tui-editor/dist/tui-editor-Viewer';
import 'codemirror/lib/codemirror.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'tui-editor/dist/tui-editor.min.css';

const Viewer = ({ html, text }) => {
  useEffect(() => {
    const editor = new TUIViewer({
      initialValue: html || text,
      el: document.getElementById('editor-section'),
      viewer: true,
    });
  }, [html, text]);

  return <div id="editor-section"></div>;
};

export default Viewer;
