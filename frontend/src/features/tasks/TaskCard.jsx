/* eslint-disable react/prop-types */
import { MdDelete, MdEdit } from "react-icons/md";

const TaskCard = ({
  title,
  priority,
  description,
  completed,
  dueDate,
  id,
  setTaskIdToDelete,
}) => {
  return (
    <>
      <div className="card bg-gray-700 max-w-sm shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <h2 className="card-title text-slate-300">{title}</h2>
            <span
              className={` ${
                priority === "low"
                  ? "bg-green-500"
                  : priority === "medium"
                  ? "bg-yellow-500"
                  : "bg-red-400"
              }  text-black py-1 px-4 rounded-full`}
            >
              {priority}
            </span>
          </div>
          <p className="text-sm">{description}</p>
          <div className="flex my-2 text-xs">
            <p className=" text-slate-400 ">
              Due-Date :{new Date(dueDate).toLocaleDateString()}{" "}
            </p>
            <span
              className={`${
                completed ? "bg-indigo-600" : "bg-blue-700"
              } text-white py-1 px-4 rounded-full`}
            >
              {completed ? "Completed" : "In Progress"}
            </span>
          </div>
          <div className="card-actions ">
            <button className="bg-teal-400 hover:bg-teal-600 text-gray-700 p-2 rounded-md">
              <MdEdit />
            </button>
            <label
              htmlFor="alert"
              className=" bg-red-400 hover:bg-red-600 text-gray-700 p-2 rounded-md"
              onClick={() => setTaskIdToDelete(id)}
            >
              <MdDelete />
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
