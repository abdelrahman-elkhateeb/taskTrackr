import { useState } from "react";
import AlertModal from "./DeleteTask";
import TaskCard from "./TaskCard";
import { useGetTasksQuery } from "./tasksApi";
import TaskSkeleton from "./TaskSkeleton";
import UpdateTask from "./UpdateTask";
import ProgressComponent from "./ProgressTasks";
import { useSelector } from "react-redux";

function Tasks() {
  const [taskIdToDelete, setTaskIdToDelete] = useState();
  const [taskToEdit, setTaskToEdit] = useState();
  const { isLoading, data } = useGetTasksQuery();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="container p-2 ">
      <div className=" flex flex-col md:flex-row justify-between md:items-end mt-3 px-2 ">
        <ProgressComponent />
        <button
          className={`bg-dark-primary py-2 px-4  rounded-lg font-medium text-black w-fit m-auto mt-4 md:m-0 hover:bg-gray-500 ${
            darkMode ? "bg-dark-primary " : "bg-light-primary text-white"
          }`}
        >
          Create New task
        </button>
      </div>

      <div className=" mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {isLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <TaskSkeleton key={index} />
            ))
          : data?.tasks?.map((task) => (
              <TaskCard
                key={task._id}
                id={task._id}
                setTaskIdToDelete={setTaskIdToDelete}
                title={task.title}
                completed={task.completed}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
                setTaskToEdit={setTaskToEdit}
              />
            ))}
      </div>
      <AlertModal id={taskIdToDelete} />
      <UpdateTask taskEdit={taskToEdit} />
    </div>
  );
}

export default Tasks;
