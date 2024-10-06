import ProgressComponent from "./ProgressTasks";
import { useSelector } from "react-redux";
import TasksList from "./TasksList";
import FiltrationComponent from "./FiltrationComponent";
import { useState } from "react";
import { MdFilterListAlt } from "react-icons/md";

function Tasks() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };
  return (
    <div className="container p-2  ">
      <div className="">
        <div className=" flex flex-col md:flex-row justify-between md:items-end mt-3 px-2 ">
          <ProgressComponent />

          <div className="flex ">
            <button
              onClick={toggleDrawer}
              className={`py-2 px-2 rounded-lg  font-medium m-auto mt-4 text-lg  hover:bg-gray-500 ${
                darkMode
                  ? "bg-dark-primary text-black"
                  : "bg-light-primary text-black"
              }`}
            >
              <MdFilterListAlt />
            </button>
            <label
              htmlFor="modal-create"
              className={`bg-dark-primary  cursor-pointer py-2 px-4  rounded-lg font-medium text-black w-fit  mt-4 md:m-0 ml-4 hover:bg-gray-500 ${
                darkMode ? "bg-dark-primary " : "bg-light-primary text-white"
              }`}
            >
              Create New task
            </label>
          </div>
        </div>

        <TasksList />

        <FiltrationComponent
          isDrawerOpen={isDrawerOpen}
          toggleDrawer={toggleDrawer}
        />
      </div>
    </div>
  );
}

export default Tasks;
