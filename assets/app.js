/*
* Welcome to your app's main JavaScript file!
*
* We recommend including the built version of this JavaScript file
* (and its CSS file) in your base layout (base.html.twig).
*/

import './scss/app.scss';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';

// loads the Icon plugin
UIkit.use(Icons);

const editor = new EditorJS({
  /**
  * Id of Element that should contain the Editor
  */
  holder: 'editorjs',

  /**
  * Available Tools list.
  * Pass Tool's class or Settings object for each Tool you want to use
  */
  tools: {
    header: Header,
    list: List,
    checklist: Checklist,
  },
})

