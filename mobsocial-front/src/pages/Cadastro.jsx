import React, { useState } from "react";
import Logo from "../assets/Logo.jpg";
import Voluntario from "../components/cadastro/voluntario";
import Ong from "../components/cadastro/ong";

const Cadastro = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* Div principal com sombra mais intensa */}
      <div
        className="bg-white rounded-lg p-8 w-full max-w-3xl"
        style={{
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.15)", // Sombras mais visíveis
        }}
      >
        {/* Logo e Títulos */}
        <div className="text-center mb-8">
          <img
            src={Logo}
            alt="Logo"
            className="h-28 w-28 rounded-full shadow-md mb-4 mx-auto"
          />
          <h1 className="text-3xl font-bold text-blue-600">Cadastro</h1>
          <p className="text-gray-600">Escolha uma opção para se cadastrar</p>
        </div>

        {/* Botões para seleção */}
        <div className="flex gap-4 justify-center mb-8">
          <button
            onClick={() => setSelectedOption("voluntario")}
            className={`px-6 py-3 text-white rounded-lg font-semibold ${
              selectedOption === "voluntario" ? "bg-blue-600" : "bg-gray-400"
            } hover:bg-blue-700`}
          >
            Voluntário
          </button>
          <button
            onClick={() => setSelectedOption("ong")}
            className={`px-6 py-3 text-white rounded-lg font-semibold ${
              selectedOption === "ong" ? "bg-blue-600" : "bg-gray-400"
            } hover:bg-blue-700`}
          >
            ONG
          </button>
        </div>

        {/* Formulários dinâmicos */}
        <div className="mt-6">
          {selectedOption === "voluntario" && <Voluntario />}
          {selectedOption === "ong" && <Ong />}
        </div>

        {/* Link para login */}
        <p className="mt-6 text-center text-gray-600">
          Já possui conta?{" "}
          <a href="/login" className="text-blue-600 font-bold hover:underline">
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Cadastro;
