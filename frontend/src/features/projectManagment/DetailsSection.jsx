import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddMember from "./AddMember";
import DisplayMembers from "./DisplayMembers";
import DisplayMissions from "./DisplayMissions";
import axios from "axios";
import Cookies from "js-cookie";

const DetailsSection = ({ project }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [members, setMembers] = useState(project.members);
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const { id } = useParams();

  const handleAddMember = (newMember) => {
    setMembers([...members, newMember]);
  };

  const handleDeleteMember = async (member) => {
    const { user } = member;
    const userId = Cookies.get("userId");
    const userEmail = user.email;

    try {
      const response = await axios.delete(
        "http://localhost:5000/api/Projects/remove-member",
        {
          data: { projectId: id, userEmail, userId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Update the local state to trigger a re-render
        setMembers((prevMembers) =>
          prevMembers.filter((m) => m.user._id !== member.user._id)
        );
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <div
      className={`p-4 shadow rounded-3xl w-full container overflow-y-auto border-2 h-screen ${
        darkMode ? "border-dark-primary" : "border-light-primary"
      }`}
    >
      <div
        role="tablist"
        className={`tabs tabs-boxed mb-4 w-full text-center ${
          darkMode ? "bg-dark-primary" : "bg-light-primary"
        }`}
      >
        <button
          role="tab"
          className={`tab ${
            activeTab === "missions"
              ? `${
                  darkMode
                    ? "bg-dark-primary text-dark-bg"
                    : "bg-light-primary text-light-bg"
                }`
              : `${
                  darkMode
                    ? "bg-dark-bg text-dark-primary"
                    : "bg-light-bg text-light-primary"
                }`
          }`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </button>
        <button
          role="tab"
          className={`tab ${
            activeTab === "missions"
              ? `${
                  darkMode
                    ? "bg-dark-bg text-dark-primary"
                    : "bg-light-bg text-light-primary"
                }`
              : `${
                  darkMode
                    ? "bg-dark-primary text-dark-bg"
                    : "bg-light-primary text-light-bg"
                }`
          } `}
          onClick={() => setActiveTab("missions")}
        >
          Messions
        </button>
      </div>

      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p className="text-lg">{project.description}</p>

      {activeTab === "members" && (
        <>
          <AddMember onAddMember={handleAddMember} />
          <DisplayMembers
            projectId={id}
            members={members}
            onDeleteMember={handleDeleteMember}
          />
        </>
      )}

      {activeTab === "missions" && (
        <DisplayMissions missions={project.missions} />
      )}
    </div>
  );
};

export default DetailsSection;
