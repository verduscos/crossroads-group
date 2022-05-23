import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [commitHistory, setCommitHistory] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/repos/verduscos/crossroads-group/commits")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCommitHistory(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul id="commit-container">
        {commitHistory.map(current => (
          <li key={current.id}>
            {current.commit.committer.name}
            {current.commit.committer.date}
            {current.commit.message}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
