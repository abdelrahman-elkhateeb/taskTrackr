import { useState } from "react";
import AlertModal from "./DeleteTask";
import TaskCard from "./TaskCard";
import { useGetTasksQuery } from "./tasksApi";
import TaskSkeleton from "./TaskSkeleton";

function Tasks() {
  const [taskIdToDelete, setTaskIdToDelete] = useState();
  const { isLoading, data } = useGetTasksQuery();
  if (isLoading)
    return (
      <div className="mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {Array.from({ length: 10 }, (_, index) => (
          <TaskSkeleton key={index} />
        ))}
      </div>
    );
  return (
    <>
      <div className="mt-10  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-4 p-2 rounded-md">
        {data?.tasks?.map((task) => (
          <TaskCard
            key={task._id}
            id={task._id}
            setTaskIdToDelete={setTaskIdToDelete}
            title={task.title}
            completed={task.completed}
            description={task.description}
            dueDate={task.dueDate}
            priority={task.priority}
          />
        ))}
      </div>
      <AlertModal id={taskIdToDelete} />
    </>
  );
}

export default Tasks;
