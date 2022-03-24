// TaskPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const TaskItem = (props) => {
  const [status, setStatus] = useState('created');
  const [taskChanged, setTaskChanged] = useState(false);
  let badge;
  let badgeLabel;

  switch (status) {
    case 'created':
      badge = "Created";
      badgeLabel = "default";
      break;

    case 'started':
      badge = "Started";
      badgeLabel = "warning";
      break;

    case 'paused':
      badge = "Paused";
      badgeLabel = "danger";
      break;

    case 'finished':
      badge = "Finished";
      badgeLabel = "success";
      break;

    default:
      break;
  }

  useEffect(() => {
    if ( !taskChanged ) {
      return;
    }

    axios.put(`/api/task/${props.task.id}`, {
      title: document.getElementById("inputTitle").value,
      description: document.getElementById("inputDescription").value,
      status
    })
    .then(function (response) {
      console.log(response.data);
      setTaskChanged(false);
    })
    .catch(function (error) {
      console.log(error);
      setTaskChanged(false);
    });
  });

  return (
    <div className="uk-margin-large-top uk-card uk-card-default">
      <div className="uk-card-body">
        <div className={`uk-card-badge uk-label uk-label-`+badgeLabel}>{badge}</div>
        <h3 className="uk-card-title">{props.task.title}</h3>
        <div>
          {props.task.description.blocks.map( (block, index) => (
            <div key={`block#`+index}>
              {(() => {
                switch (block.type) {
                  case 'header':
                    return <h2>{block.data.text}</h2>;

                  case 'paragraph':
                    return <p>{block.data.text}</p>;

                  default:
                    break;
                }
              })()}
            </div>
          ))}
        </div>
      </div>
      <div className="uk-margin-medium-top uk-padding-small uk-background-muted">
        <button
          className="uk-button uk-button-small uk-button-default"
          onClick={() => { setStatus('started'); setTaskChanged(true) }}
        >
          <span uk-icon="refresh"></span>
          <span>Début</span>
        </button>
        <button className="uk-button uk-button-small uk-button-default"
          onClick={() => { setStatus('paused'); setTaskChanged(true) }}
        >
          <span uk-icon="close"></span>
          <span>Pause</span>
        </button>
        <button className="uk-button uk-button-small uk-button-default"
          onClick={() => { setStatus('finished'); setTaskChanged(true) }}
        >
          <span uk-icon="check"></span>
          <span>Fin</span>
        </button>
      </div>
    </div>
  )
}

export default TaskItem;
