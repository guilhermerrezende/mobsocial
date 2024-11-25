import axios from "axios";

const getVoluntario = async () => {
  const voluntarioId = localStorage.getItem("userId"); // Nome consistente

  if (!voluntarioId) {
    console.error("ID do voluntário não encontrado no localStorage.");
    throw new Error("ID do voluntário não encontrado.");
  }

  console.log("Buscando dados do voluntário com ID:", voluntarioId);

  try {
    const response = await axios.get(
      `http://localhost:8001/api/v1/TbUsuarioVoluntario/${voluntarioId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adicionando o token para autenticação
        },
      }
    );
    console.log("Dados recebidos do voluntário:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados do voluntário:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default getVoluntario;