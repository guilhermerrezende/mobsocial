import axios from 'axios';

const editVoluntario = async (voluntarioId, data) => {
  try {
    const response = await axios.put(`http://localhost:8001/api/v1/TbUsuarioVoluntario/${voluntarioId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating volunteer data:", error);
    throw error;
  }
};

export default editVoluntario;