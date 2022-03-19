import React, { Fragment, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';


const TaskEditor = (props) => {
  const editorRef = useRef();
  const [editorData, setEditorData] = useState({});

  // This will run only once
  useEffect(() => {
    if (!editorRef.current) {
      initEditor();
    }
    return () => {
      editorRef.current.destroy();
      editorRef.current = null;
    }
  }, []);

  // Initialize EditorJS
  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      logLevel: "ERROR",
      minHeight: 60,
      data: editorData,
      onReady: () => {
        editorRef.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        setEditorData(content);
      },
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
      },
    })
  }

  return (
    <Fragment>
      <input type="hidden" name="description" value={JSON.stringify(editorData)}/>
      <div id="editorjs"></div>
    </Fragment>
  );
}

const element = document.querySelector('#inputDescriptionContainer');
ReactDOM.render(<TaskEditor/>, element);
