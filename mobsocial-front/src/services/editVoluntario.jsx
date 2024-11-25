import axios from "axios";

const editVoluntario = async (data) => {
  const voluntarioId = localStorage.getItem("userId"); // Recupera o ID

  if (!voluntarioId) {
    console.error("ID do voluntário não encontrado no localStorage.");
    throw new Error("ID do voluntário não encontrado.");
  }

  console.log("ID recebido para edição:", voluntarioId);
  console.log("Dados enviados para edição:", data);

  try {
    const response = await axios.put(
      `http://localhost:8001/api/v1/TbUsuarioVoluntario/${voluntarioId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Resposta da API ao editar voluntário:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar dados:", error);
    throw error;
  }
};

export default editVoluntario;
