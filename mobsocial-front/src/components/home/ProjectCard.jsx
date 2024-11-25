const ProjectCard = ({ image, title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover sm:h-40 md:h-60 lg:h-48"
      />
      <div className="p-4">
        <h3 className="font-bold text-xl text-blue-600">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <button className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-500 w-full">
          Participar
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
