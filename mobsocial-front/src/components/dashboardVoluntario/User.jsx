import React, { useContext } from "react";
import { UserPhotoContext } from "../../context/UserPhotoContext";
import UserIcon from "../../assets/user.svg";
import { Link } from "react-router-dom";

const User = ({ isProjeto, isPerfil, isDash, isVoluntario }) => {
  const { userPhoto } = useContext(UserPhotoContext);

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-lg flex flex-col p-6 items-center gap-6">
      <img
        src={userPhoto || UserIcon}
        alt="User"
        className="h-32 w-32 rounded-full border-2 border-gray-300"
      />
      <div className="text-gray-700 w-full flex flex-col gap-4">
        <Link
          to="/EditVoluntario"
          className={`${
            isPerfil && "bg-blue-600 text-white font-bold"
          } border border-gray-300 rounded-lg p-4 text-center hover:bg-blue-600 hover:text-white`}
        >
          Meu Perfil
        </Link>
        {isVoluntario && (
          <Link
            to="/PerfilVoluntario"
            className={`${
              isProjeto && "bg-blue-600 text-white font-bold"
            } border border-gray-300 rounded-lg p-4 text-center hover:bg-blue-600 hover:text-white`}
          >
            Projetos Inscritos
          </Link>
        )}
        <Link
          to="/Dashboard-Voluntario"
          className={`${
            isDash && "bg-blue-600 text-white font-bold"
          } border border-gray-300 rounded-lg p-4 text-center hover:bg-blue-600 hover:text-white`}
        >
          Dashboard
        </Link>
        <Link
          to="#"
          className="border border-gray-300 rounded-lg p-4 text-center hover:bg-blue-600 hover:text-white"
        >
          Suporte
        </Link>
        <Link
          to="#"
          className="border border-gray-300 rounded-lg p-4 text-center hover:bg-blue-600 hover:text-white"
        >
          Sobre nós
        </Link>
      </div>
    </div>
  );
};

export default User;
