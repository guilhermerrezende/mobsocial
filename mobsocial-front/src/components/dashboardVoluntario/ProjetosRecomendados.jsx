import React from "react";
import { useNavigate } from "react-router-dom";

const ProjetosRecomendados = ({ projetos }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projetos.map((projeto, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between w-full max-w-lg mx-auto"
        >
          <img
            src={projeto.imagem}
            alt={projeto.titulo}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <h3 className="text-lg font-bold text-blue-600 mt-4">
            {projeto.titulo}
          </h3>
          <p className="text-gray-600 text-sm mt-2">{projeto.descricao}</p>
          <button
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => {
              if (projeto.link) {
                navigate(projeto.link);
              }
            }}
          >
            Participar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjetosRecomendados;
