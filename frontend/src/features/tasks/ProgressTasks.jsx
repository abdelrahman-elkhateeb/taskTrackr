import { useSelector } from "react-redux";

const ProgressComponent = () => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="max-w-sm sm:px-2">
      <h2 className="mb-3">
        <span className="text-2xl font-bold">My Tasks</span>
        <span className="mx-3 text-gray-500 text-lg">10/16 Completed</span>
      </h2>
      <div className="w-sm  bg-gray-500 rounded-md">
        <div
          className={`h-8  rounded-md  ${
            darkMode
              ? "bg-dark-primary text-dark-text"
              : "bg-light-primary text-light-text"
          }`}
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressComponent;
