import { Link, useNavigate } from "react-router-dom";
import BarraPesquisa from '../components/BarraPesquisa';
import Carrossel from '../components/Carrossel';
import background from "../assets/img/backgroundJogo.png";
import logo from "../assets/img/logoGAMELOG2.svg";
import "react-multi-carousel/lib/styles.css";
import {Helmet} from "react-helmet";

const UserInfo = ({ user }) => {
  return (
    <div className="p-4">
      {user ? (
        <p>Bem-vindo, {user}!</p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="text-center underline decoration-solid font-bold">Novo por aqui?</p>
          <Link to="/cadastro" className="bg-indigo-600 p-3 rounded-md font-inter font-bold hover:bg-indigo-700 transition-all duration-300">
            Cadastre-se
          </Link>
        </div>
      )}
    </div>
  );
};

export const Home = ({dados, idUsuarioLogado}) => {
  const user = idUsuarioLogado;

  const navigate = useNavigate();

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>GameLog</title>
        <link rel="canonical" href="http://mysite.com/example" />
        <meta name="description" content="Página principal" />
    </Helmet>


    <section style={{backgroundImage: `url(${background})`}} className=" bg-fixed w-full mx-auto my-0 px-10 md:px-64 py-20 font-fira text-white">

      <div className='flex flex-col items-center gap-5 mb-10'>
        <img src={logo} alt="logoGamelog" className="w-16"/>
        <h1 className='text-4xl font-inter font-bold text-center'>GAMELOG</h1>
      </div>
      <BarraPesquisa dados={dados}/>

      <div className='flex flex-col items-center gap-4'>
        <p className='text-center'>Conecte-se, organize seus jogos e compartilhe suas experiências com a comunidade gamer.</p>
        <UserInfo user={user} />
      </div>

    </section>

    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos Populares</h2>
      <Carrossel jogos={dados}/>
  
      
    </section>


    <section className='mt-16'>
      <h2 className='text-3xl font-inter font-bold text-center text-cyan-800'>Jogos em Alta</h2>
      <Carrossel jogos={dados}/>
  
      
    </section>

    </>
  );
}

export default Home;