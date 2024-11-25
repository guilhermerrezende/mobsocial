import React, { useState } from "react";
import Logo from "../assets/Logo.jpg";
import { FormControl, Input } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("voluntario"); // Estado para o tipo de usuário
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = async () => {
    let hasError = false;

    // Validação de e-mail
    if (!email) {
      setEmailError(true);
      hasError = true;
    } else {
      setEmailError(false);
    }

    // Validação de senha
    if (!password) {
      setPasswordError(true);
      hasError = true;
    } else {
      setPasswordError(false);
    }

    if (!hasError) {
      const login = { email, password };
      const endpoint =
        userType === "voluntario"
          ? "http://localhost:8001/api/v1/loginVoluntario"
          : "http://localhost:8001/api/v1/loginONG"; // Seleção de endpoint baseado no tipo de usuário

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(login),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));

          toast.success("Login realizado com sucesso!", {
            position: "top-right",
          });

          // Redireciona para o dashboard correspondente
          if (userType === "voluntario") {
            window.location.href = "http://localhost:5173/Dashboard-Voluntario";
          } else {
            window.location.href = "http://localhost:5173/DashboardONG";
          }
        } else {
          toast.error("Erro ao fazer login. Verifique suas credenciais.", {
            position: "top-right",
          });
        }
      } catch (error) {
        console.error("Erro na requisição", error);
        toast.error("Erro ao conectar com o servidor.", {
          position: "top-right",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img
            src={Logo}
            onClick={() => {
              window.location.href = "/";
            }}
            className="w-24 h-24 cursor-pointer"
            alt="Logo"
          />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bem-vindo ao MobSocial
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              E-mail
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              placeholder="Digite seu e-mail"
              className={`w-full px-4 py-2 border rounded-lg ${
                emailError ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">
                Por favor, insira um e-mail válido.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              placeholder="Digite sua senha"
              className={`w-full px-4 py-2 border rounded-lg ${
                passwordError ? "border-red-500" : "border-gray-300"
              } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">
                A senha é obrigatória.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-lg shadow-md"
          >
            Entrar
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Não tem uma conta?{" "}
            <a
              href="/cadastro"
              className="text-blue-600 hover:underline focus:outline-none"
            >
              Cadastre-se!
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
