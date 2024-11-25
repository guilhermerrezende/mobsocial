import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import User from "../components/dashboardVoluntario/User";
import EditarFoto from "../components/Voluntario/EditarFoto";
import editVoluntario from "../services/editVoluntario";
import getVoluntario from "../services/getVoluntario";
import deleteVoluntario from "../services/deleteVoluntario"; // Serviço para deletar
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditVoluntario = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPerfil, setIsPerfil] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    username: "",
    cpf: "",
    telefone: "",
    areasInteresse: "",
    experiencia: "",
  });
  const [errors, setErrors] = useState({});
  const voluntarioId = localStorage.getItem("userId");

  useEffect(() => {
    setIsPerfil(true);

    const fetchUserData = async () => {
      try {
        const response = await getVoluntario(voluntarioId);
        setFormData(response);
      } catch (error) {
        console.error("Erro ao carregar os dados do voluntário:", error);
      }
    };

    fetchUserData();
  }, [voluntarioId]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Nome é obrigatório";
    if (!formData.email) newErrors.email = "Email é obrigatório";
    if (!formData.cpf) newErrors.cpf = "CPF é obrigatório";
    if (!formData.telefone) newErrors.telefone = "Telefone é obrigatório";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await editVoluntario(formData);
        toast.success("Dados atualizados com sucesso!", {
          position: "top-right",
          autoClose: 5000,
        });
      } catch (error) {
        console.error("Erro ao atualizar os dados:", error);
        toast.error("Erro ao atualizar os dados. Tente novamente mais tarde.", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação é permanente e não pode ser desfeita."
    );
    if (confirmDelete) {
      try {
        await deleteVoluntario(voluntarioId);
        toast.success("Conta excluída com sucesso!");
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        toast.error("Erro ao excluir a conta. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ToastContainer />
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
        <aside
          className={`fixed top-0 right-0 z-50 w-64 bg-white shadow-lg transform ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } h-full transition-transform duration-300`}
        >
          <User isPerfil={isPerfil} />
        </aside>

        {menuOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setMenuOpen(false)}
          ></div>
        )}

        <main className="flex-1 p-6 transition-all duration-300">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Alterar Dados</h2>
            <form className="flex flex-col gap-6">
              <EditarFoto />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block font-semibold text-gray-700 mb-2">
                    Nome
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.username && <p className="text-red-500">{errors.username}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.email && <p className="text-red-500">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="cpf" className="block font-semibold text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={(e) => handleInputChange("cpf", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.cpf && <p className="text-red-500">{errors.cpf}</p>}
                </div>

                <div>
                  <label htmlFor="telefone" className="block font-semibold text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    id="telefone"
                    type="text"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  />
                  {errors.telefone && <p className="text-red-500">{errors.telefone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="areasInteresse" className="block font-semibold text-gray-700 mb-2">
                  Áreas de Interesse
                </label>
                <textarea
                  id="areasInteresse"
                  value={formData.areasInteresse}
                  onChange={(e) => handleInputChange("areasInteresse", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows={2}
                ></textarea>
              </div>

              <div>
                <label htmlFor="experiencia" className="block font-semibold text-gray-700 mb-2">
                  Experiência
                </label>
                <textarea
                  id="experiencia"
                  value={formData.experiencia}
                  onChange={(e) => handleInputChange("experiencia", e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Alterar Dados
              </button>

              <button
                type="button"
                onClick={handleDeleteAccount}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Excluir Conta
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditVoluntario;
