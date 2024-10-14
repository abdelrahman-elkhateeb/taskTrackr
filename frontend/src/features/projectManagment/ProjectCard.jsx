// ProjectCard.js
import { useSelector } from "react-redux";

const ProjectCard = ({ project }) => {
    const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className={`border-2 ${darkMode? "bg-dark-bg border-dark-primary" : "bg-light-bg border-light-primary"} shadow-md rounded-lg p-4 mb-4`}>
      <h2 className={`${darkMode? "text-dark-primary" : "text-light-primary"}  text-lg font-semibold`}>{project.title}</h2>
      <p className= {`${darkMode? "text-dark-primary opacity-60" : "text-light-primary opacity-85"} mb-2`}>{project.description}</p>
      <p className="text-sm text-gray-500">
        Members: {project.members.length} | Missions: {project.missions.length}
      </p>
    </div>
  );
};

export default ProjectCard;
