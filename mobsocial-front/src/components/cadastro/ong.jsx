import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CadastrarServiceONG } from "../../services/cadastro";

const Ong = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    cnpj: "",
    razaoSocial: "",
    nomeFantasia: "",
    site: "",
    descricao: "",
    areasAtuacao: "",
    responsavel: "",
    numeroDeIndentificacaoDaOng: "",
    endereco: "",
    complemento: "",
    cidade: "",
    estado: "",
    cep: "",
    telefone: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = Object.keys(formData);
    const newErrors = requiredFields.reduce((acc, field) => {
      if (!formData[field]) acc[field] = `${field} é obrigatório`;
      return acc;
    }, {});

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      const result = await CadastrarServiceONG(formData);
      if (result) {
        toast.success("ONG cadastrada com sucesso!");
        setFormData({
          email: "",
          username: "",
          password: "",
          cnpj: "",
          razaoSocial: "",
          nomeFantasia: "",
          site: "",
          descricao: "",
          areasAtuacao: "",
          responsavel: "",
          numeroDeIndentificacaoDaOng: "",
          endereco: "",
          complemento: "",
          cidade: "",
          estado: "",
          cep: "",
          telefone: "",
        });
      }
    } catch (error) {
      toast.error("Erro ao cadastrar. Tente novamente.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Cadastro de ONG
        </h2>

        {Object.keys(formData).map((field) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="font-semibold text-gray-700 capitalize">
              {field}
            </label>
            <input
              id={field}
              type={field.includes("senha") ? "password" : "text"}
              value={formData[field]}
              onChange={(e) => handleInputChange(field, e.target.value)}
              className={`border ${
                errors[field] ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300`}
              placeholder={`Digite seu ${field}`}
            />
            {errors[field] && (
              <span className="text-red-500 text-sm">{errors[field]}</span>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Ong;
