import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProjectCard from "./ProjectCard";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router";
import CreateProject from "./CreateProject";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  // const darkMode = useSelector((state) => state.darkMode.darkMode);
  // const navigate = useNavigate();
  const userId = Cookies.get("userId");

  const fetchUserProjects = async () => {
    try {
      if (userId) {
        const response = await axios.get(
          `http://localhost:5000/api/projects/user/${userId}/projects`
        );

        setProjects(
          Array.isArray(response.data.projects) ? response.data.projects : []
        );
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };

  const handleProjectDeleted = (projectId) => {
    setProjects(projects.filter((project) => project._id !== projectId)); 
  };

  useEffect(() => {
    fetchUserProjects();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <section className="container mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Project Management</h1>
      <CreateProject onProjectCreated={fetchUserProjects} />{" "}
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project._id} 
              project={project}
              onProjectDeleted={handleProjectDeleted}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectManagement;
