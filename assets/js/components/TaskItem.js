// TaskPage.js
import React, { useState } from 'react';


const TaskItem = (props) => {
  const [status, setStatus] = useState('created');
  let badge = null;

  switch (status) {
    case 'created':
      badge = <div className="uk-card-badge uk-label uk-label-default">Created</div>;
      break;

    case 'started':
      badge = <div className="uk-card-badge uk-label uk-label-warning">Started</div>;
      break;

    case 'paused':
      badge = <div className="uk-card-badge uk-label uk-label-danger">Paused</div>;
      break;

    case 'finished':
      badge = <div className="uk-card-badge uk-label uk-label-success">Finished</div>;
      break;

    default:
      break;
  }

  return (
    <div className="uk-margin-large-top uk-card uk-card-default">
      <div className="uk-card-body">
        {badge}
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
          onClick={() => setStatus('started')}
        >
          <span uk-icon="refresh"></span>
          <span>Début</span>
        </button>
        <button className="uk-button uk-button-small uk-button-default"
          onClick={() => setStatus('paused')}
        >
          <span uk-icon="close"></span>
          <span>Pause</span>
        </button>
        <button className="uk-button uk-button-small uk-button-default"
          onClick={() => setStatus('finished')}
        >
          <span uk-icon="check"></span>
          <span>Fin</span>
        </button>
      </div>
    </div>
  )
}

export default TaskItem;
