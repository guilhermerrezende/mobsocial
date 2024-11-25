import React, { useState, useEffect, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import User from "../components/dashboardVoluntario/User";
import editVoluntario from "../services/editVoluntario";
import getVoluntario from "../services/getVoluntario";
import deleteVoluntario from "../services/deleteVoluntario"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { UserPhotoContext } from "../context/UserPhotoContext"; // Importando o contexto de foto de perfil

const EditVoluntario = () => {
  const { setUserPhoto } = useContext(UserPhotoContext); // Acessando a função para atualizar a foto no contexto
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
    fotoPerfil: "", // Foto de perfil
  });
  const [photo, setPhoto] = useState(null); // Armazenando a foto selecionada
  const [selectedFile, setSelectedFile] = useState("Nenhum arquivo escolhido");
  const [errors, setErrors] = useState({});
  const voluntarioId = localStorage.getItem("userId");

  useEffect(() => {
    setIsPerfil(true);

    const fetchUserData = async () => {
      try {
        const response = await getVoluntario(voluntarioId);
        setFormData(response);
        
        // Atualizando a foto no contexto global, se disponível
        if (response.fotoPerfil) {
          setUserPhoto(response.fotoPerfil); 
        }
      } catch (error) {
        console.error("Erro ao carregar os dados do voluntário:", error);
      }
    };

    fetchUserData();
  }, [voluntarioId, setUserPhoto]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSelectedFile(selectedFile.name); // Exibe o nome do arquivo selecionado
      setPhoto(selectedFile); // Atualiza a foto
    }
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

  const handlePhotoSubmit = async () => {
    const formDataPhoto = new FormData();
    formDataPhoto.append("photo", photo);

    try {
      const response = await axios.post(
        `http://localhost:8001/api/v1/TbUsuarioVoluntario/uploadPhoto/${voluntarioId}`,
        formDataPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(response.data.message);
      setFormData((prev) => ({
        ...prev,
        fotoPerfil: response.data.data.fotoPerfil,
      }));
      
      // Atualiza a foto no contexto global
      setUserPhoto(response.data.data.fotoPerfil); 
    } catch (error) {
      console.error("Erro ao enviar a foto:", error);
      toast.error("Erro ao enviar a foto. Tente novamente mais tarde.");
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
              {/* Exibe a foto atual */}
              <div className="flex justify-center mb-4">
                <img
                  src={`http://localhost:8001${formData.fotoPerfil}`}
                  alt="Foto de Perfil"
                  className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="file-upload"
                  className="relative text-gray-700 cursor-pointer py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Alterar Foto
                </label>
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {photo && (
                  <button
                    type="button"
                    onClick={handlePhotoSubmit}
                    className="ml-2 mt-2 p-2 bg-blue-600 text-white rounded-lg"
                  >
                    Salvar Foto
                  </button>
                )}
              </div>

              {/* Campos de Dados */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="username"
                    className="block font-semibold text-gray-700 mb-2"
                  >
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
                />
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
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="p-3 bg-blue-600 text-white rounded-lg"
                >
                  Alterar Dados
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  className="p-3 bg-red-500 text-white rounded-lg"
                >
                  Excluir Conta
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditVoluntario;