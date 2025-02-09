import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoLogInOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logoGAMELOG2.svg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/loginSlice";



export const Header = () => {
  const user = useSelector((state) => state.auth?.user);

  const navLinks = [
    {
      title: "Listas",
      link: `/listas/${user.username}`,
    },
    {
      title: "Ranking",
      link: "/Ranking",
    },
    {
      title: "Login",
      link: "/login",
      icon: <IoLogInOutline size={"1.4rem"} />,
    },
  ];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleMenu = () => {
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout()); 
    navigate("/login"); // vai pro login dps do logout
  };

  return (
    <>
      <div className="bg-cyan-600">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/">
                <img src={logo} alt="logoGamelog" className="w-10" />
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {user ? (
                  <>
                    <Link
                      to={`/perfil/${user.username}`}
                      className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
                    >
                      Perfil
                    </Link>
                    {navLinks.slice(0, 2).map((link, index) => (
                      <Link
                        key={index}
                        to={link.link}
                        className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
                      >
                        {link.title}
                        {link.icon && <span>{link.icon}</span>}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-red-600 px-3 py-2 rounded-md text-md font-medium"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  navLinks.slice(2).map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
                    >
                      {link.title}
                      {link.icon && <span>{link.icon}</span>}
                    </Link>
                  ))
                )}

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="inline-flex items-center gap-1 text-white transition-all duration-300 hover:bg-indigo-600 px-3 py-2 rounded-md text-md font-medium"
                  >
                    Administração
                  </Link>
                )}
              </div>
            </div>

            {/* Menu hambúrguer */}
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                onClick={handleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-800 focus-ring-white"
              >
                <span className="sr-only">Open Main Menu</span>
                {open === true ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </div>
        {open && (
          <div className="md:hidden bg-cyan-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <Link
                    to={`/perfil/${user._id}`}
                    className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Perfil
                  </Link>
                  {navLinks.slice(0, 2).map((link, index) => (
                    <Link
                      key={index}
                      to={link.link}
                      className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                    >
                      {link.title}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="text-white hover:bg-red-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                navLinks.slice(2).map((link, index) => (
                  <Link
                    key={index}
                    to={link.link}
                    className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    {link.title}
                  </Link>
                ))
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-white hover:bg-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Administração
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
