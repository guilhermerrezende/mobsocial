import React from "react";
import ProjectCard from "./ProjectCard";

// Importando as imagens
import Projeto1 from "../../assets/images/projeto1.jpg";
import Projeto2 from "../../assets/images/projeto2.jpg";
import Projeto3 from "../../assets/images/projeto3.jpg";
import Projeto4 from "../../assets/images/projeto4.jpg";
import Projeto5 from "../../assets/images/projeto5.jpg";
import Projeto6 from "../../assets/images/projeto6.jpg";
import Projeto7 from "../../assets/images/projeto7.jpg";
import Projeto8 from "../../assets/images/projeto8.jpg";
import Projeto9 from "../../assets/images/projeto9.jpg";

const Projetos = () => {
  const projetos = [
    {
      image: Projeto1,
      title: "Reflorestamento Urbano",
      description:
        "Iniciativa para revitalização de áreas urbanas por meio do plantio de árvores nativas.",
    },
    {
      image: Projeto2,
      title: "Educação para Crianças",
      description:
        "Apoio escolar gratuito para crianças em situação de vulnerabilidade social.",
    },
    {
      image: Projeto3,
      title: "Limpeza de Rios",
      description:
        "Mutirão para a limpeza de rios e conscientização sobre a importância da água limpa.",
    },
    {
      image: Projeto4,
      title: "Coleta de Resíduos",
      description:
        "Projeto para promover a coleta seletiva e o descarte correto de resíduos.",
    },
    {
      image: Projeto5,
      title: "Horta Comunitária",
      description:
        "Iniciativa para criar hortas comunitárias e promover alimentação saudável.",
    },
    {
      image: Projeto6,
      title: "Pintura de Escolas",
      description:
        "Voluntários se reúnem para pintar escolas e melhorar o ambiente escolar.",
    },
    {
      image: Projeto7,
      title: "Apoio a Idosos",
      description:
        "Visitas a asilos para oferecer apoio emocional e atividades recreativas.",
    },
    {
      image: Projeto8,
      title: "Proteção Animal",
      description:
        "Projeto voltado para o resgate e cuidado de animais abandonados.",
    },
    {
      image: Projeto9,
      title: "Conscientização Ambiental",
      description:
        "Campanhas educativas para incentivar práticas sustentáveis no dia a dia.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projetos.map((projeto, index) => (
        <ProjectCard
          key={index}
          image={projeto.image}
          title={projeto.title}
          description={projeto.description}
        />
      ))}
    </div>
  );
};

export default Projetos;
