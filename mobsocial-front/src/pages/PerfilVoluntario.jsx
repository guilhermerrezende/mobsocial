import React, { useState, useEffect } from "react";
import User from "../components/dashboardVoluntario/User";
import { FaBars, FaTimes } from "react-icons/fa";
import Projeto1 from "../assets/images/projeto1.jpg";
import Projeto2 from "../assets/images/projeto3.jpg";
import FT from "../assets/FT.png";
import FT2 from "../assets/FT-2.png";

const PerfilVoluntario = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProjeto, setIsProjeto] = useState(false);
  const [isVoluntario, setIsVoluntario] = useState(false);

  useEffect(() => {
    if (window.location.pathname === "/PerfilVoluntario") {
      setIsProjeto(true);
      setIsVoluntario(true);
    }
  }, []);

  const projetosInscritos = [
    {
      id: 1,
      title: "Feira de Adoção de Animais",
      descricao: `Promovendo a adoção responsável de cães e gatos resgatados, organizando eventos onde pessoas podem encontrar seus novos companheiros.`,
      imagem: Projeto1,
    },
    {
      id: 2,
      title: "Revitalização de Parques",
      descricao: `Transforme parques comunitários plantando árvores, pintando estruturas públicas e revitalizando áreas verdes.`,
      imagem: Projeto2,
    },
    {
      id: 3,
      title: "Reflorestamento Urbano",
      descricao: `Ajude a recuperar áreas verdes urbanas com o plantio de árvores nativas em locais com escassez de vegetação.`,
      imagem: FT,
    },
    {
      id: 4,
      title: "Limpeza de Praias",
      descricao: `Participe da preservação ambiental com ações de limpeza e conscientização nas praias locais.`,
      imagem: FT2,
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md w-full flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-blue-600">MobSocial</h1>
        <button
          className="text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </header>

      <div className="flex w-full max-w-6xl">
        {/* Menu Hambúrguer */}
        <aside
          className={`fixed top-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } h-full transition-transform duration-300`}
        >
          <User isProjeto={isProjeto} isVoluntario={isVoluntario} />
        </aside>

        {/* Overlay para fechar o menu */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        {/* Conteúdo Principal */}
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-blue-600 text-white text-center rounded-lg shadow-md w-full max-w-3xl">
            <h2 className="text-2xl font-semibold py-4">Projetos Inscritos</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 w-full max-w-5xl">
            {projetosInscritos.map((projeto) => (
              <div
                key={projeto.id}
                className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between"
              >
                <img
                  src={projeto.imagem}
                  alt={projeto.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold text-blue-600 mb-2">
                  {projeto.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{projeto.descricao}</p>
                {/* Botão fixo como Inscrito */}
                <button
                  className="w-full py-2 rounded-lg bg-green-500 text-white font-bold hover:bg-green-600 cursor-default"
                  disabled
                >
                  Inscrito
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilVoluntario;
