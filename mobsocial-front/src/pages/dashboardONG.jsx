import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import User from "../components/dashboardVoluntario/User";
import ProjetosRecomendados from "../components/dashboardVoluntario/ProjetosRecomendados";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardVoluntario = ({ isVoluntario }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const projetos = [
    {
      titulo: "Reflorestamento Urbano",
      data: "01/2023 a 05/2023",
      descricao: "O projeto Reflorestamento Urbano é uma iniciativa dedicada à revitalização de áreas verdes urbanas.",
    },
    {
      titulo: "Limpeza de Praias",
      data: "06/2023 a 12/2023",
      descricao: "O projeto Limpeza de Praias visa retirar resíduos sólidos e conscientizar a população sobre o impacto ambiental.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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

      <div className="flex flex-1">
        {/* Menu Lateral */}
        <aside
          className={`fixed top-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } h-full transition-transform duration-300`}
        >
          <User isVoluntario={isVoluntario} />
        </aside>

        {/* Conteúdo Principal */}
        <main
          className="flex-1 flex items-center justify-center transition-all duration-300 ml-0"
        >
          <div className="w-full max-w-4xl p-6">
            <SearchBar />
            <section className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Projetos Recomendados
              </h2>
              <ProjetosRecomendados projetos={projetos} />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardVoluntario;