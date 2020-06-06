import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      title: "ConceitosNodeJs-GoStack " + Date.now(),
      url: "https://github.com/mbmachado/ConceitosNodeJS-GoStack",
      techs: ["NodeJs", "Jest", "ExpressJS"]
    }

    const { data } = await api.post('repositories', repository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const i = repositories.findIndex(obj => obj.id = id);
    const newRepositories = Array.from(repositories);
    newRepositories.splice(i, 1);
    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(({ data }) => {
      setRepositories(data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
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
