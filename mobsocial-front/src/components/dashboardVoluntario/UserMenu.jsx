import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserIcon from "../../assets/user.svg";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 right-4 z-50 p-2 bg-blue-600 text-white rounded-full md:hidden"
      >
        ☰
      </button>
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-40 w-64`}
      >
        <div className="flex flex-col items-center p-6">
          <img
            src={UserIcon}
            alt="User"
            className="h-20 w-20 rounded-full mb-4 border-2 border-gray-300"
          />
          <Link to="/EditVoluntario" className="w-full py-2 px-4 text-center text-blue-600 hover:bg-blue-100 rounded-md">
            Meu Perfil
          </Link>
          <Link to="/PerfilVoluntario" className="w-full py-2 px-4 text-center text-blue-600 hover:bg-blue-100 rounded-md">
            Projetos Inscritos
          </Link>
          <Link to="/Dashboard-Voluntario" className="w-full py-2 px-4 text-center text-blue-600 hover:bg-blue-100 rounded-md">
            Dashboard
          </Link>
          <Link to="#" className="w-full py-2 px-4 text-center text-blue-600 hover:bg-blue-100 rounded-md">
            Suporte
          </Link>
          <Link to="#" className="w-full py-2 px-4 text-center text-blue-600 hover:bg-blue-100 rounded-md">
            Sobre nós
          </Link>
          <button className="w-full py-2 px-4 text-center text-red-500 hover:bg-red-100 rounded-md">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default UserMenu;