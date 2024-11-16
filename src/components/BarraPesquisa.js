import React, {useCallback, useEffect, useState} from 'react';
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


export const BarraPesquisa = () => {
  const navigate = useNavigate();

  const [dados, setDados] = useState([]);
  async function dadosJson() {
    try {
      const response = await fetch('http://localhost:3000/jogos');
      if (!response.ok) {
        throw new Error('Erro ao carregar o JSON');
      }
      const data = await response.json();
      setDados(data); 
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dadosJson();
  }, []);

  

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const debounce = (func, delay) => {
     let timeoutId;
     return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
     };
  };

  const handleSearch = useCallback(
          debounce((term) => {
             if (term.trim() === '') {
                setSearchResults([]);
             } else {
                const results = dados.filter(item =>
                        item.nome.toLowerCase().includes(term.toLowerCase())
                );
                setSearchResults(results);
             }
          }, 300),
          [dados]
  );

  useEffect(() => {
     handleSearch(searchTerm);
  }, [searchTerm, handleSearch]);

  const handleInputChange = (e) => {
     setSearchTerm(e.target.value);
  };

  if (dados.length === 0) {
    return <p>Carregando...</p>;
  }

  return (
          <div className="flex flex-col items-center bg-transparent p-4 font-fira">
             <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl mb-8">
                <div className="relative">
                   <input
                           type="text"
                           value={searchTerm}
                           onChange={handleInputChange}
                           className="w-full px-5 py-3 pr-20 text-base bg-white border border-gray-200 rounded-md focus:outline-none focus:border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200 font-fira text-indigo-600"
                           placeholder="Explore jogos_"
                   />
                   <div className="absolute right-0 top-0 mt-3 mr-4 flex items-center">
                      
                      <button type="submit" className="text-indigo-500 hover:text-indigo-600">
                         <IoSearch size={20} />
                      </button>
                   </div>
                </div>
             </form>
             {searchResults.length > 0 && (
                     <div className="w-full max-w-2xl bg-white rounded-md shadow-md p-4">
                        <h2 className="text-xl font-bold mb-4 text-cyan-600">Jogos encontrados:</h2>
                        <ul>
                           {searchResults.map(result => (
                                   <li key={result.id} className="mb-2">
                                      <p onClick={()=> navigate(`/jogo/${result.id}`)} className="text-black hover:underline">
                                         {result.nome}
                                      </p>
                                   </li>
                           ))}
                        </ul>
                     </div>
             )}
          </div>
  );
};

export default BarraPesquisa;



