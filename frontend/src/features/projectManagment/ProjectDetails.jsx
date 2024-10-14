import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };

    fetchProjectDetails();
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-lg">{project.description}</p>
      {/* Add more project details here */}
      <h2 className="mt-4 text-xl">Missions:</h2>
      <ul>
        {project.missions.map((mission) => (
          <li key={mission._id} className="py-2">
            <strong>{mission.title}</strong>: {mission.description} (Status: {mission.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectDetails;
