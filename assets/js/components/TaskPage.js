// TaskPage.js
import React, { Fragment, useEffect, useState } from 'react';
import TaskEditor from './TaskEditor';
import TaskItem from './TaskItem';


const TaskPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if ( isLoaded ) {
      return;
    }

    fetch("/api/task/")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTasks(result.tasks);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  });

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }
  else if (!isLoaded) {
    return <div>Chargement…</div>;
  }
  else {
    return (
      <Fragment>
        <div className="uk-padding uk-background-secondary">
          <h1 className="uk-text-muted">ToBeDone!</h1>
        </div>
        <div className="uk-padding">
          <TaskEditor/>
          <h2>Liste des tâches</h2>
          {tasks.map(task => (
            <TaskItem key={`Task#`+task.id} task={task}/>
          ))}
        </div>
      </Fragment>
    )
  }
}

export default TaskPage;