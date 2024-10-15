/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import AddMissionModal from './AddMissionModal'; 
import { CircleX } from 'lucide-react';
import ConfirmationModal from './ConfirmationModal'; 
import Cookies from 'js-cookie';

const DisplayMissions = ({ missions, setReload, reload }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [users, setUsers] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState(null); // Track the mission to delete
  const { id: projectId } = useParams(); 
  const creatorId = Cookies.get('userId');
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userIds = [
          ...new Set(missions.flatMap(mission => [mission.completedBy, mission.createdBy])),
        ];

        const userPromises = userIds.map(userId =>
          axios.get(`http://localhost:5000/api/Users/${userId}`)
            .then(res => res.data)
            .catch(err => {
              console.error(`Error fetching user ${userId}:`, err);
              return null;
            })
        );

        const usersData = await Promise.all(userPromises);
        const usersMap = usersData.reduce((acc, user) => {
          if (user && user.user) {
            acc[user.user._id] = user.user;
          }
          return acc;
        }, {});

        setUsers(usersMap);

      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("There was an error fetching user data. Please try again later.");
      }
    };

    if (missions.length > 0) {
      fetchUsers();
    }
  }, [missions]);

  const handleDeleteMission = async (missionId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/Projects/del-mission`, { data: { projectId, missionId, userId: creatorId} });
      setReload(prev => !prev); 
      setConfirmationModalOpen(false);
      if (response.data.success) {
        setReload(!reload); 
        console.log(reload);
        
      }
    } catch (error) {
      console.error("Error deleting mission:", error);
      alert("There was an error deleting the mission. Please try again later.");
    }
  };

  const confirmDelete = () => {
    if (missionToDelete) {
      handleDeleteMission(missionToDelete._id); 
    }
  };

  return (
    <div className={`p-4 ${darkMode ? "bg-dark-background" : "bg-light-background"} rounded-lg shadow-md`}>
      <h2 className={`mt-4 text-2xl font-bold ${darkMode ? "text-dark-primary" : "text-light-primary"}`}>Missions:</h2>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>Add Mission</button>
      <ul className="space-y-4">
        {missions.map((mission) => (
          <li key={mission._id} className={`p-4 border rounded-lg ${darkMode ? "bg-dark-card text-dark-text" : "bg-light-card text-light-text"} shadow`}>
            <div className="flex justify-between items-center mb-2">
              <strong className="text-xl">{mission.title}</strong>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusStyle(mission.status)}`}>
                {mission.status}
              </span>
            </div>
            <p className="text-gray-700">{mission.description}</p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Completed For:</span> {users[mission.completedBy]?.username || "Loading..."}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Created By:</span> {users[mission.createdBy]?.username || "Loading..."}
            </p>
            {mission.completedAt && (
              <p className="text-sm">
                <span className="font-semibold">Completed At:</span> {new Date(mission.completedAt).toLocaleDateString()}
              </p>
            )}
            <p className="text-sm flex flex-row justify-between">
              <span className="font-semibold">Created At: {new Date(mission.createdAt).toLocaleDateString()} </span> 
              <CircleX className="text-red-600 cursor-pointer" onClick={() => { 
                setMissionToDelete(mission); 
                setConfirmationModalOpen(true); 
              }}/>
            </p>
          </li>
        ))}
      </ul>

      {/* Include the AddMissionModal component */}
      <AddMissionModal modalOpen={modalOpen} setModalOpen={setModalOpen} projectId={projectId} setReload={setReload} reload={reload} />

      {/* Include the ConfirmationModal component */}
      <ConfirmationModal 
        isOpen={confirmationModalOpen} 
        onClose={() => setConfirmationModalOpen(false)} 
        onConfirm={confirmDelete} 
        missionTitle={missionToDelete ? missionToDelete.title : ''} 
      />
    </div>
  );
};

// Function to get status badge styles
const getStatusStyle = (status) => {
  switch (status) {
    case "not started":
      return "bg-red-500 text-white";
    case "in progress":
      return "bg-yellow-500 text-white";
    case "completed":
      return "bg-green-500 text-white";
    default:
      return "";
  }
};

export default DisplayMissions;
