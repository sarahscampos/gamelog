import React from 'react'
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>

    <h1 className="text-3xl font-bold underline">Home</h1>
    <Link to="/jogo">Jogo</Link>
    </>
  );
}

export default Home;