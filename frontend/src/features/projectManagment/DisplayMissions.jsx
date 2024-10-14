/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const DisplayMissions = ({ missions }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      <h2 className={`mt-4 text-xl ${darkMode? "text-dark-primary" : "text-light-primary"}`}>Missions:</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission._id} className={`py-2 ${darkMode? "text-dark-primary" : "text-light-primary"}`}>
            <strong>{mission.title}</strong>: {mission.description} (Status:{" "}
            {mission.status})
          </li>
        ))}
      </ul>
    </>
  );
};

export default DisplayMissions;
