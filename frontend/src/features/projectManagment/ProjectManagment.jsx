// ProjectManagement.js
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get("userId");

    const fetchUserProjects = async () => {
      try {
        if (userId) {
          const response = await axios.get(
            `http://localhost:5000/api/projects/user/${userId}/projects`
          );
          console.log("API response:", response.data);

          setProjects(
            Array.isArray(response.data.projects) ? response.data.projects : []
          );
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
      }
    };

    fetchUserProjects();
  }, []);
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Project Management</h1>
      <button
        onClick={() => navigate("/projectManagment/createProject")}
        className={`py-2 px-4 rounded-lg mb-4 hover:opacity-90 ${
          darkMode ? "bg-dark-primary text-light-primary" : "bg-light-primary text-light-bg"
        }`}
      >
        Create Project
      </button>
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProjectManagement;
