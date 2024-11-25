import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import User from "../components/dashboardVoluntario/User";
import ProjetosRecomendados from "../components/dashboardVoluntario/ProjetosRecomendados";
import { FaBars, FaTimes } from "react-icons/fa"; // Ícones para menu hambúrguer e fechar
import FT from "../assets/FT.png";
import FT2 from "../assets/FT-2.png";
import Project1 from "../assets/Project1.svg";
import Project2 from "../assets/Project2.svg";

const DashboardVoluntario = (isVoluntario) => {
  const [isDash, setIsDash] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado do menu hambúrguer

  useEffect(() => {
    if (window.location.pathname === "/Dashboard-Voluntario") {
      setIsDash(true);
    }
  }, []);

  const randomDate1 = new Date(
    +new Date() - Math.floor(Math.random() * 10000000000)
  );
  const randomDate2 = new Date(
    +new Date() - Math.floor(Math.random() * 10000000000)
  );

  const formatDate = (date) => {
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${year}`;
  };

  const projetos = [
    {
      titulo: "Reflorestamento Urbano",
      data: `${formatDate(randomDate1)} a ${formatDate(randomDate2)}`,
      imagem: FT,
      logo: Project1,
      descricao: `O projeto Reflorestamento Urbano é uma iniciativa dedicada à revitalização de áreas verdes urbanas, focada no plantio de árvores nativas em áreas com escassez de vegetação.`,
    },
    {
      titulo: "Limpeza de Praias",
      data: `${formatDate(randomDate1)} a ${formatDate(randomDate2)}`,
      logo: Project2,
      imagem: FT2,
      descricao: `O projeto "Apoio Escolar para Crianças" tem como objetivo oferecer reforço escolar gratuito a crianças em situação de vulnerabilidade social.`,
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">MobSocial</h1>
        <button
          className="text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      <div className="flex">
        {/* Menu Hambúrguer */}
        <aside
          className={`fixed top-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } h-full transition-transform duration-300`}
        >
          <User isDash={isDash} isVoluntario={isVoluntario} />
        </aside>

        {/* Overlay para fechar o menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

      {/* Conteúdo Principal */}
      <main
        className={`flex flex-col items-center flex-1 p-6 transition-all duration-300 ${
          menuOpen ? "ml-64" : "ml-16"
        }`}
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          <SearchBar />
          <section className="mt-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
              Projetos Recomendados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              <ProjetosRecomendados projetos={projetos} />
            </div>
          </section>
        </div>
      </main>

      </div>
    </div>
  );
};

export default DashboardVoluntario;
