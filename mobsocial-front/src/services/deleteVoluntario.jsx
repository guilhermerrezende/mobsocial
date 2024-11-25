import axios from "axios";

const deleteVoluntario = async (voluntarioId) => {
  if (!voluntarioId) {
    console.error("ID do voluntário não encontrado.");
    throw new Error("ID do voluntário não encontrado.");
  }

  try {
    const response = await axios.delete(
      `http://localhost:8001/api/v1/TbUsuarioVoluntario/${voluntarioId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log("Conta excluída com sucesso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    throw error;
  }
};

export default deleteVoluntario;
