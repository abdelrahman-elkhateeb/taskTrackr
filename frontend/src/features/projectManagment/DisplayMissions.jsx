import { useSelector } from "react-redux";

const DisplayMissions = ({ missions }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <>
      <h2 className="mt-4 text-xl">Missions:</h2>
      <ul>
        {missions.map((mission) => (
          <li key={mission._id} className="py-2">
            <strong>{mission.title}</strong>: {mission.description} (Status:{" "}
            {mission.status})
          </li>
        ))}
      </ul>
    </>
  );
};

export default DisplayMissions;
