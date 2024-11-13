import React from 'react'
import { Link } from "react-router-dom";
import Header from '../components/Header';

export const Home = () => {
  return (
    <>
    <Header/>
    <h1 className="text-3xl font-bold underline">Home</h1>
    <Link to="/jogo">Jogo</Link>
    </>
  );
}

export default Home;