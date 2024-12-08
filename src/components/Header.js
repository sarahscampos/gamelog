import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogInOutline} from "react-icons/io5";
import { Link } from "react-router-dom";
import logo from "../assets/img/logoGAMELOG2.svg";
import BarraPesquisa from "./BarraPesquisa";
import { useSelector } from 'react-redux';

const navLinks = [
  {
    title: "Listas",
    link: "/listas",
  },
  {
    title: "Ranking",
    link: "/",
  },
  {
    title: "Login",
    link: "/login",
    icon: <IoLogInOutline size={'1.4rem'} />,
  },
  {
    title: "Perfil",
    link: "/perfil/1",
  },
  {/*so por enquanto*/}
]


export const Header = () => {
 //indigo-500

 const user = useSelector((state) => state.cadastro.user);

 const [open, setOpen] = useState(false);
 const handleMenu = () => {
  setOpen((prev) => !prev);
 }

  return (
    <>
      <div className="bg-cyan-600">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
              <img src={logo} alt="logoGamelog" className="w-10"/>
              
              </Link>
              
            </div>
            
            <div className="hidden md:block">
  <div className="ml-10 flex items-baseline space-x-4">
    {
      user ? 
      (
        navLinks.slice(0, 2).map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
          >
            {link.title} 
            {link.icon && <span>{link.icon}</span>}
          </Link>
        ))
      ) :
      (
        navLinks.map((link, index) => (
          <Link
            key={index}
            to={link.link}
            className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
          >
            {link.title} 
            {link.icon && <span>{link.icon}</span>}
          </Link>
        ))
      )
    }
  </div>
</div>


            {/*menu hamburguer*/}
            <div className="-mr-2 flex md:hidden">
              <button type="button" onClick={handleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-white  hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus-ring-white">
                <span className="sr-only">Open Main Menu</span>
                {open === true ? <FaTimes /> : <FaBars />}
              </button>

            </div>

          </div>

        </div>
        {open ? (
          <div className="md:hidden bg-cyan-700">
            <div className="ox-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link, index) => (<Link key={index} to={link.link} className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium">{link.title}</Link>))}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );


}

export default Header;