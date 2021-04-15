import React, {useState, useEffect} from 'react';
import "./App.css"
export default function App(){
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    async function fetchData(){
      const response = await fetch("https://api.github.com/users/felipelopes94/repos")
      const data = await response.json();
  
      setRepositories(data);
    }
    fetchData()

  }, []); //ARRAY VAZIO, VAI EXECUTAR UMA VEZ APENAS, PQ NAO DEPENDE DE VALOR NENHUM!
  //  Effect para alterar o Tittle da Pagina
  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    
    document.title = `Voce tem ${filtered.length} Favoritos`;
  }, [repositories]);

  // Funcao para Favoritar
  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      
      return repo.id === id ? {...repo, favorite: !repo.favorite} : repo

    });

    setRepositories(newRepositories);
  }
  
  return(
    <div className="container">
      <h1>REPOSITORIOS DO GIT</h1>
      <ul className="ul">
        {repositories.map(repo => (

          <li className="li" key={repo.id}> 
            {repo.name} 
            {repo.favorite && <span className="favorito">(Favorito)</span>}
            <button className="botao" onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>

        ))}
      </ul>
    </div>

  )
}