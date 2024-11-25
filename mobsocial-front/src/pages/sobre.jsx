import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/Logo.jpg"; // Importe o logo da aplicação
import BackgroundImage from "../assets/images/background.jpg"; // Substitua pelo caminho correto, se necessário
import User from "../components/dashboardVoluntario/User"; // Importando o componente User

const Sobre = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Cabeçalho com menu */}
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
        {/* Menu lateral */}
        <aside
          className={`fixed top-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } h-full transition-transform duration-300`}
        >
          <User isDash={false} isProjeto={false} isPerfil={false} isVoluntario={false} />
        </aside>

        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <main
          className={`flex flex-col items-center flex-1 p-6 transition-all duration-300 mx-auto ${
            menuOpen ? "ml-64" : "ml-16"
          }`}
        >
          {/* Imagem de fundo e título */}
          <div
            className="relative w-full h-60 bg-cover bg-center rounded-lg shadow-md mb-10"
            style={{
              backgroundImage: `url(${BackgroundImage})`,
            }}
          >
            <div className="absolute inset-0 bg-blue-600 bg-opacity-60 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Sobre o MobSocial</h2>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="container mx-auto max-w-5xl px-4 lg:px-6">
            <div className="flex flex-col items-center mb-6">
              <img
                src={Logo}
                alt="MobSocial Logo"
                className="w-36 h-36 object-contain mb-4"
              />
              <p className="text-lg text-gray-700 text-center mt-4">
                Nossa missão é ajudar instituições a arrecadar recursos e ajuda
                para promover o bem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nossa Missão */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Nossa Missão
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  O MobSocial foi criado para conectar instituições, ONGs e
                  projetos sociais com pessoas dispostas a ajudar. Através de
                  nossa plataforma, promovemos o engajamento em ações sociais e
                  facilitamos a arrecadação de recursos, materiais e ajuda
                  voluntária para projetos que transformam vidas e comunidades.
                </p>
              </div>

              {/* Quem Somos */}
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                  Quem Somos
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  O MobSocial é um projeto desenvolvido por alunos do curso de
                  Engenharia de Software da <strong>UniEvangélica - Anápolis</strong>.
                  Inspirados pelo desejo de promover o bem e incentivar ações
                  sociais, criamos uma plataforma acessível para unir quem quer
                  ajudar a quem precisa.
                </p>
                <p className="mt-4">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:equipemobsocial@gmail.com"
                    className="text-blue-600 hover:underline"
                  >
                    equipemobsocial@gmail.com
                  </a>
                </p>
                <p>
                  <strong>Telefone:</strong> (62) 99382-2772
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Rodapé */}
      <footer className="bg-dark text-white text-center py-3 mt-5">
        <p className="mb-0">© 2024 MobSocial. Todos os direitos reservados.</p>
        <a href="#politica" className="text-white text-decoration-underline">
          Política de Privacidade
        </a>
        <span> | </span>
        <a href="#termos" className="text-white text-decoration-underline">
          Termos de Serviço
        </a>
      </footer>
    </div>
  );
};

export default Sobre;
