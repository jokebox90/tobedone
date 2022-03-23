import '../scss/app.scss';
import React, { Fragment, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TaskPage from './components/TaskPage';

const App = () => {
  const [authError, setAuthError] = useState(null);
  const [authTkt, setAuthTkt] = useState(null);
  const [isAuthLoaded, setAuthLoaded] = useState(false);

  // useEffect(() => {
  //   fetch("/login")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setAuthLoaded(true);
  //         setAuthTkt(result.authTkt);
  //       },
  //       (error) => {
  //         setAuthLoaded(true);
  //         setAuthError(error);
  //       }
  //     )
  // });

  if (!isAuthLoaded) {
    setAuthLoaded(true);
    return (
      <div>Authenticate</div>
    )
  }
  else {
    return (
      <TaskPage/>
    )
  }
}

const element = document.querySelector('#app');
ReactDOM.render(<App/>, element);