import React, {useEffect} from "react";
import background from "../assets/img/backgroundJogo.png";
import logo from "../assets/img/logoGAMELOG2.svg";
import { useDispatch, useSelector } from 'react-redux';
import { fetchJogos } from '../slices/jogosSlice';
import RankItem from '../components/RankItem'

const Ranking = () => {
    const dispatch = useDispatch();
    const { dados: jogos, status } = useSelector((state) => state.jogos);

    useEffect(() => {
        if (status === 'idle') {
        dispatch(fetchJogos());
        }
    }, [status, dispatch]);

    const topJogos = [...jogos].sort((a, b) => a.colocacao - b.colocacao);


    return(
        <div>
            <section style={{backgroundImage: `url(${background})`}} className=" bg-fixed w-full mx-auto my-0 px-10 md:px-64 py-20 font-fira text-white">
                <div className='flex flex-col items-center gap-5 mb-10'>
                <img src={logo} alt="logoGamelog" className="w-16"/>
                <h1 className='text-4xl font-inter font-bold text-center'>Top Ranking</h1>
                </div>
            </section>

            <div class="flex justify-between items-center text-lg lg:text-xl font-inter text-white font-bold mb-4 px-4 bg-indigo-600">
                <div class="w-1/4 text-right">Título</div>
                <div class="hidden md:block w-1/4 text-right">Score</div>
            </div>

            <div>
                {topJogos.map((jogo) => (<RankItem key={jogo.id} jogo={jogo} />))}
            </div>

        </div>

    )
}

export default Ranking;