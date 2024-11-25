import React, { useState, useEffect } from "react";
import EditarFoto from "../components/Voluntario/EditarFoto";
import ProjetosRecomendados from "../components/dashboardVoluntario/ProjetosRecomendados";
import Cachorrinho from "../assets/Cachorrinho.png";
import Logo from "../assets/LogoAnimal.svg";
import User from "../components/dashboardVoluntario/User";
import { FaBars, FaTimes } from "react-icons/fa"; // Ícones para menu hambúrguer e fechar

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

  const projetosInscritos = [
    {
      title: "Feira de Adoção de Animais",
      descricao: `A "Feira de Adoção de Animais" é um projeto dedicado 
a promover a adoção responsável de cães e gatos 
resgatados, organizando eventos periódicos onde 
as pessoas podem conhecer e adotar seus futuros 
companheiros.`,
      logo: Logo,
      data: `${formatDate(randomDate1)} a ${formatDate(randomDate2)}`,
      imagem: Cachorrinho,
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
          <h1 className="text-4xl font-bold text-blue-600 text-center mb-12">
            Meu Perfil
          </h1>

          <div className="flex flex-col items-center gap-8 w-full">
            {/* Foto e Projetos */}
            <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center w-full max-w-3xl">
              <EditarFoto />
            </div>

            <div className="bg-blue-600 text-white text-center rounded-lg shadow-md w-full max-w-3xl">
              <h2 className="text-2xl font-semibold py-4">Projetos Inscritos</h2>
            </div>

            <div className="w-full max-w-3xl">
              <ProjetosRecomendados projetos={projetosInscritos} isPerfil={true} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PerfilVoluntario;
