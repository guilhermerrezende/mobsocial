import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Img1 from "../assets/images/projeto1-1.jpg";
import Img2 from "../assets/images/projeto1-2.jpg";
import Img3 from "../assets/images/projeto1-3.jpg";
import User from "../components/dashboardVoluntario/User"; // Importando o componente User

const ProjetoRevitalizacao = () => {
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
        {menuOpen && (
          <aside
            className="fixed top-0 right-0 z-50 w-64 bg-white shadow-lg transform h-full transition-transform duration-300"
          >
            <User isProjeto={true} /> {/* Incluído para consistência */}
          </aside>
        )}

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
          <div className="container mx-auto max-w-5xl px-4 lg:px-6">
            {/* Informações do Projeto */}
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 bg-white p-6 shadow-md rounded-lg">
                <h2 className="text-3xl font-bold text-blue-600 mb-4">
                  Revitalização de Parque
                </h2>
                <p className="text-lg text-gray-700 mb-4">
                  Ajude a revitalizar parques comunitários e traga mais vida
                  para a comunidade!
                </p>
                <p className="mb-2">
                  <strong>Descrição:</strong> Esse projeto visa plantar árvores,
                  pintar estruturas públicas e revitalizar áreas verdes de
                  parques comunitários. É uma oportunidade de fazer parte da
                  transformação do espaço urbano.
                </p>
                <p className="mb-2">
                  <strong>Data:</strong> 15 de Dezembro de 2024
                </p>
                <p className="mb-2">
                  <strong>Local:</strong> Parque da Amizade, Centro, Belo
                  Horizonte - MG
                </p>
                <p className="mb-2">
                  <strong>Número de Vagas:</strong> 25 voluntários
                </p>
              </div>

              {/* Informações da ONG */}
              <div className="w-full lg:w-1/3 bg-white p-6 shadow-md rounded-lg">
                <h4 className="text-2xl font-bold text-blue-600 mb-4">
                  ONG Responsável
                </h4>
                <p className="mb-2">
                  <strong>Nome:</strong> Verde para Todos
                </p>
                <p className="mb-2">
                  <strong>E-mail:</strong>{" "}
                  <a
                    href="mailto:contato@verdeparatodos.org"
                    className="text-blue-600 hover:underline"
                  >
                    contato@verdeparatodos.org
                  </a>
                </p>
                <p className="mb-2">
                  <strong>Telefone:</strong> (31) 98765-4321
                </p>
                <p className="mb-2">
                  <strong>Instagram:</strong>{" "}
                  <a
                    href="https://instagram.com/verdeparatodos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    @verdeparatodos
                  </a>
                </p>
                <p>
                  <strong>Site:</strong>{" "}
                  <a
                    href="https://verdeparatodos.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    www.verdeparatodos.org
                  </a>
                </p>
              </div>
            </div>

            {/* Galeria de Fotos */}
            <div className="mt-10">
              <h4 className="text-2xl font-bold text-blue-600 mb-4">
                Galeria de Fotos do Projeto
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <img
                  src={Img1}
                  alt="Foto 1"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img
                  src={Img2}
                  alt="Foto 2"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <img
                  src={Img3}
                  alt="Foto 3"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
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

export default ProjetoRevitalizacao;
