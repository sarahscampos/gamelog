import React from 'react';
import Carousel from "react-multi-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeJogoToList } from "../slices/listasSlice";

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1990 },
      items: 8
    },
    desktop: {
      breakpoint: { max: 1990, min: 1200 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1200, min: 750 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 750, min: 550 },
      items: 3
    },
    mobileS: {
      breakpoint: { max: 550, min: 0 },
      items: 2
    }
  
  };

  
  const CarrosselEdit = ({jogos, id}) => {
    const dispatch = useDispatch();
    const remove = (idJogo, idLista) => {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
      console.log(id);
      dispatch(removeJogoToList({ idJogo: idJogo, idLista: idLista }))
      .then(() => {
      })
      .catch((error) => {
        console.error("Erro ao remover o jogo à lista:", error);
      });
    }

    const navigate = useNavigate();
    
    
    return (
        <>
        <Carousel responsive={responsive} removeArrowOnDeviceType={["mobile"]} className='p-5'>
        {jogos.map((item, index) => (
            <div key={index} className='w-40 drop-shadow-md cursor-pointer hover:scale-105 transition lg:w-56 flex flex-col items-center' onClick={() => navigate(`/jogo/${item.id}`)}>
            <img src={item.capa} alt="logoGamelog" className='w-40 h-52 mb-1 ring-solid ring-2 ring-indigo-600 rounded-sm lg:w-52 lg:h-72' />
            <p className='text-center font-fira text-base'>{item.nome}</p>
            <button
              className="mt-5 text-lg flex items-center gap-2 px-8 py-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-400 font-inter transition"
              onClick={(e) => {
                e.stopPropagation(); // Evita a navegação ao clicar no botão
                remove(item.id, id);
              }}
            >
              Remover
            </button>
            </div>
            
        ))}
        </Carousel>
        </>
    )
}

export default CarrosselEdit;