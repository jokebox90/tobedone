import React, { Fragment, useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import axios from 'axios';


const TaskEditor = (props) => {
  const editorRef = useRef();
  const [editorData, setEditorData] = useState({});
  const [title, setTitle] = useState("");

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
  };

  const saveTask = e => {
    e.preventDefault();

    axios.post('/api/task', {
      title: document.getElementById("inputTitle").value,
      description: document.getElementById("inputDescription").value
    })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return (
    <div className="uk-card uk-card-default uk-card-body">
      <form className="uk-form" onSubmit={e => saveTask(e)}>
        <div className="uk-margin-bottom">
          <label htmlFor="inputtitle">Titre</label>
          <input className="uk-input" type="text" name="title" id="inputTitle" required />
        </div>
        <input type="hidden" name="description" id="inputDescription" value={JSON.stringify(editorData)} />
        <div id="editorjs"></div>

        <button className="uk-button uk-button-primary uk-button-small uk-width-1-1" type="submit">
          Enregistrer
        </button>
      </form>
    </div>
  );
}

export default TaskEditor;
