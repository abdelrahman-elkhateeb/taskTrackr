/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import MemberManagement from "./MemberManagement";
import DisplayMissions from "./DisplayMissions";
import axios from "axios";
import Cookies from "js-cookie";
import Tabs from "./Tabs";

const DetailsSection = ({ project }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState(project.members);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("manager");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const { id } = useParams();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/Projects/members/${id}`);
        setMembers(response.data.members);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, [id]);

  const handleAddMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  const handleDeleteMember = async (member) => {
    const { user } = member;
    const userId = Cookies.get("userId");
    const userEmail = user.email;

    try {
      const response = await axios.delete("http://localhost:5000/api/Projects/remove-member", {
        data: { projectId: id, userEmail, userId },
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMembers((prevMembers) => prevMembers.filter((m) => m.user._id !== member.user._id));
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const handleSubmit = async () => {
    const userId = Cookies.get("userId");
    setLoading(true); 

    try {
      const response = await axios.post("http://localhost:5000/api/Projects/assign-role", {
        projectId: id,
        userEmail: email,
        role,
        userId,
      }, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const newMember = { email, role, user: response.data.user };
        handleAddMember(newMember); 
        setIsModalOpen(false);
        setEmail("");
        setRole("manager");
        setError(null);
      }
    } catch (error) {
      console.error("Error adding member:", error);
      setError("Failed to add member. Please check the email and try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div
      className={`p-4 shadow rounded-3xl w-full container overflow-y-auto border-2 h-screen ${darkMode ? "border-dark-primary" : "border-light-primary"}`}
    >
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />

      <h1 className={`text-2xl font-bold ${darkMode? "text-dark-primary" : "text-light-primary"}`}>{project.title}</h1>
      <p className={`text-lg ml-2 ${darkMode? "text-dark-pHover" : "text-light-pHover"}`}>{project.description}</p>

      {activeTab === "members" && (
        <MemberManagement
          members={members}
          handleDeleteMember={handleDeleteMember}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          email={email}
          setEmail={setEmail}
          role={role}
          setRole={setRole}
          loading={loading}
          handleSubmit={handleSubmit}
          error={error}
          darkMode={darkMode}
        />
      )}

      {activeTab === "missions" && <DisplayMissions missions={project.missions} />}
    </div>
  );
};

export default DetailsSection;
