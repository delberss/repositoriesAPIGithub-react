import { useEffect, useState } from "react";
export default function App() {

  const [repositories, setRepositories] = useState([]);
  const [userGit, setUserGit] = useState('');

  const verRepositorios = () => {
    const FetchData = async () => {
      const response = await fetch(`https://api.github.com/users/${userGit}/repos`);
      const data = await response.json();
      setRepositories(data);
      }
      FetchData();
  }


  useEffect( () => {
    const filtered = repositories.filter( repo => repo.favorite);
    document.title = `Você tem ${filtered.length} repo favoritos`;
  }, [repositories])
  

  const handleFavorite = (id) => {
    const newRepositories = repositories.map( repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    }); 
    setRepositories(newRepositories);
  }

  return (
    <div className="App">
      <>
        <section>
          <label>Seu github</label>
          <input value={userGit} onChange={(e) => setUserGit(e.target.value)} placeholder="Digite seu user"></input>
          <button onClick={verRepositorios}>Ver seus repositorios</button>
        </section>
        <ul> 
          {repositories.map(repo => (
            <li key={repo.id}>
              {repo.name}
              {repo.favorite && <span>(favorito)</span>}
              <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            </li>
          ))}
        </ul>
      </>
      
    </div>
  );
}


