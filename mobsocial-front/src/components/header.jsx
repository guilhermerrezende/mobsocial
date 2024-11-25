import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold text-blue-600">MobSocial</h1>
      <div className="hidden md:flex gap-4">
        <Link to="/login" className="py-2 px-4 text-blue-600 hover:bg-blue-100 rounded-md">
          Login
        </Link>
        <Link to="/cadastro" className="py-2 px-4 text-blue-600 hover:bg-blue-100 rounded-md">
          Cadastro
        </Link>
      </div>
    </header>
  );
};

export default Header;
