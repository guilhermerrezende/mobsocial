import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Checkbox } from "@mui/material";
import { FaBars, FaTimes } from "react-icons/fa";
import { UserPhotoContext } from "../context/UserPhotoContext";
import User from "../components/dashboardVoluntario/User";
import EditarFoto from "../components/Voluntario/EditarFoto";
import editVoluntario from "../services/editVoluntario";

const EditVoluntario = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPerfil, setIsPerfil] = useState(false);
  const { voluntarioId } = useParams();
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [disponibilidade, setDisponibilidade] = useState([]);
  const [areasInteresse, setAreasInteresse] = useState([]);
  const [experiencia, setExperiencia] = useState("");
  const { userPhoto } = useContext(UserPhotoContext);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (window.location.pathname === "/EditVoluntario") {
      setIsPerfil(true);
    }
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};
    if (!nome) newErrors.nome = "Nome é obrigatório";
    if (!cpf) newErrors.cpf = "CPF é obrigatório";
    if (!disponibilidade.length) newErrors.disponibilidade = "Disponibilidade é obrigatória";
    if (!areasInteresse.length) newErrors.areasInteresse = "Áreas de interesse são obrigatórias";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const formData = {
        nome,
        cpf,
        disponibilidade: disponibilidade.join(", "),
        areasInteresse: areasInteresse.join(", "),
        experiencia,
      };
      try {
        const updatedData = await editVoluntario(voluntarioId, formData);
        console.log("Dados atualizados:", updatedData);
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
      }
    }
  };

  const disponibilidadeOptions = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
  const areasInteresseOptions = ["Educação", "Saúde", "Meio Ambiente", "Tecnologia", "Cultura"];

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
          <User isPerfil={isPerfil} />
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
          className={`flex-1 p-6 transition-all duration-300 ${
            menuOpen ? "ml-64" : "ml-16"
          }`}
        >
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Alterar Dados</h2>
            <form className="flex flex-col gap-6">
              <EditarFoto />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block font-semibold text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    id="nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Digite seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
                </div>

                {/* CPF */}
                <div>
                  <label htmlFor="cpf" className="block font-semibold text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Digite seu CPF"
                  />
                  {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
                </div>
              </div>

              {/* Disponibilidade */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Disponibilidade</label>
                <div className="grid grid-cols-2 gap-2">
                  {disponibilidadeOptions.map((dia) => (
                    <label key={dia} className="flex items-center">
                      <Checkbox
                        checked={disponibilidade.includes(dia)}
                        onChange={(e) =>
                          setDisponibilidade((prev) =>
                            e.target.checked
                              ? [...prev, dia]
                              : prev.filter((d) => d !== dia)
                          )
                        }
                      />
                      {dia}
                    </label>
                  ))}
                </div>
                {errors.disponibilidade && <p className="text-red-500 text-sm">{errors.disponibilidade}</p>}
              </div>

              {/* Áreas de Interesse */}
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Áreas de Interesse</label>
                <div className="flex flex-wrap gap-3">
                  {areasInteresseOptions.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() =>
                        setAreasInteresse((prev) =>
                          prev.includes(area)
                            ? prev.filter((a) => a !== area)
                            : [...prev, area]
                        )
                      }
                      className={`py-2 px-4 rounded-lg border ${
                        areasInteresse.includes(area)
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-200 text-gray-700 border-gray-300"
                      } hover:bg-blue-500 hover:text-white transition`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
                {errors.areasInteresse && <p className="text-red-500 text-sm mt-2">{errors.areasInteresse}</p>}
              </div>

              {/* Experiência */}
              <div>
                <label htmlFor="experiencia" className="block font-semibold text-gray-700 mb-2">
                  Experiência
                </label>
                <textarea
                  id="experiencia"
                  value={experiencia}
                  onChange={(e) => setExperiencia(e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Descreva sua experiência"
                  rows={3}
                ></textarea>
              </div>

              {/* Botão de Alterar Dados */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Alterar Dados
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditVoluntario;
