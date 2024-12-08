import React from 'react'
import { Link, useNavigate } from "react-router-dom";

const RankItem = ({jogo}) => {

    const navigate = useNavigate();

    return(
        <div>
            <div className='flex justify-between items-center space-x-7 py-4 px-6 border-b border-gray-300 font-inter'>
                <div className='text-xl font-semibold text-gray-800'>{jogo.colocacao}</div>

            <div className='flex flex-grow space-x-4 lg:space-x-20 px-7 py-3 drop-shadow-md' 
            onClick={() => navigate(`/jogo/${jogo.id}`)}>
                <img
                    src={jogo.capa}
                    alt={`Capa do jogo ${jogo.nome}`}
                    className='w-40 h-52 mb-1 ring-solid ring-2 ring-indigo-600 rounded-sm lg:w-52 lg:h-72  cursor-pointer hover:scale-105 transition'
                />
                <div className='flex text-gray-800 space-x-4 font-semibold text-lg lg:text-xl cursor-pointer hover:underline'>
                    <div>{jogo.nome}</div>
                </div>

            </div>
                <div className='hidden md:block ml-auto flex-col text-gray-800 text-xl font-semibold'>
                    <div className='text-yellow-500 text-2xl lg:text-3xl'>★</div>
                    <div className='text-center'>{jogo.nota}</div>
                </div>
            </div>
        </div>
    )
}

export default RankItem;