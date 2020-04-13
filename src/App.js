import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repos, setRepos] = useState([]);

  useEffect(() => {

    api.get('repositories').then(response => {
      setRepos(response.data);      
    });
  }, []);

  async function handleAddRepository() {

    const newRepo = await api.post('repositories', { title: `Any Title @${Date.now()}`, onwer: 'The Repository Onwer' });

    setRepos([...repos, newRepo.data]);
  }

  async function handleRemoveRepository(id) {

    const response = await api.delete(`repositories/${id}`);    

    if(response.status === 204){

      const newRepos = repos.filter(repo => {
          return repo.id !== id
        } 
      )
        setRepos(newRepos);        
    }
  }  

  return (
    <div>
      <ul data-testid="repository-list">

        {repos.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>
        ))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
