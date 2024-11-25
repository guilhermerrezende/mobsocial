import axios from "axios";
import { toast } from "react-toastify";

const LoginService = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8001/api/v1/loginVoluntario",
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = response.data;

    if (result) {
      const { accessToken, id, username } = result.data;

      // Armazenar token e ID no localStorage
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", id.toString()); // Garantir que o ID seja armazenado como string
      localStorage.setItem("username", username);

      console.log("Login bem-sucedido. Dados armazenados:");
      console.log("Token:", accessToken);
      console.log("ID:", id);
      console.log("Username:", username);

      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
      });

      return result;
    } else {
      toast.error("Usuário ou senha inválidos", {
        position: "top-right",
        autoClose: 9000,
      });
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    toast.error("Erro ao realizar login. Tente novamente mais tarde.", {
      position: "top-right",
      autoClose: 9000,
    });
  }
};

export default LoginService;
