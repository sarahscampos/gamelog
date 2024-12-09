import React, {useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJogos } from '../slices/jogosSlice';
import RankItem from '../components/RankItem';
import Loading from '../components/Loading';
import { Helmet } from "react-helmet";

const Ranking = () => {
    const dispatch = useDispatch();
    const { dados: jogos, status } = useSelector((state) => state.jogos);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchJogos());
        }
    }, [status, dispatch]);

    if(status === 'loading'){
        return <Loading />
    }

    if(status === 'failed'){
        return <div className="text-red-700 text-center py-10">Erro ao carregar os jogos</div>
    }

    const topJogos = [...jogos].sort((a, b) => a.colocacao - b.colocacao);


    return(
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Ranking</title>
                <link rel="canonical" href="http://mysite.com/example" />
                <meta name="description" content="Página de ranking" />
            </Helmet>
            <div className="flex justify-between items-center w-full mx-auto my-0 px-10 py-10 bg-zinc-600 text-white font-inter">
        <h1 className="text-2xl font-bold">Top Ranking</h1>
        
            </div>
            
            <div class="flex justify-between items-center text-lg lg:text-xl font-inter text-white font-bold mb-4 px-5 bg-indigo-600 py-5">
                <div class="w-1/4 text-right font-fira">Título</div>
                <div class="hidden md:block w-1/4 text-right font-fira ">Score</div>
            </div>

            <div>
                {topJogos.map((jogo) => (<RankItem key={jogo.id} jogo={jogo} />))}
            </div>

        </div>

    )
}

export default Ranking;