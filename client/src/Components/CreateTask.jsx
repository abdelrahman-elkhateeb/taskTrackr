import { useState } from "react";
import Modal from "./Modal";

const CreateTask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // handlers
  const onToggleModal = () => setIsModalOpen(!isModalOpen);
  return (
    <div className="my-6">
      <button
        className={`bg-purple-700 py-2 px-4  rounded-lg font-medium text-white `}
        onClick={onToggleModal}
      >
        Add New Task
      </button>
      <Modal
        isOpen={isModalOpen}
        closeModal={onToggleModal}
        title={"Add New Task"}
      >
        <form className="space-y-2 mt-3">
          <div className="flex flex-col">
            <label
              htmlFor={"title"}
              className="mb-2 font-medium text-sm text-gray-700"
            >
              Title
            </label>
            <input
              className="border-[1px] rounded-lg shadow-md w-full  border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 
        focus:ring-indigo-500 p-3 text-md
        "
              id="title"
              type="text"
              placeholder="Task title"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={"description"}
              className="mb-2 font-medium text-sm text-gray-700"
            >
              Description
            </label>
            <textarea
              className="border-[1px] rounded-lg shadow-md w-full  border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 
        focus:ring-indigo-500 p-3 text-md
        "
              id="description"
              placeholder="Task description"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={"date"}
              className="mb-2 font-medium text-sm text-gray-700"
            >
              Due Date
            </label>
            <input
              className="border-[1px] rounded-lg shadow-md w-full  border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 
        focus:ring-indigo-500 p-3 text-md
        "
              id="date"
              type="date"
              placeholder="Task title"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor={"priority"}
              className="mb-2 font-medium text-sm text-gray-700"
            >
              Priority
            </label>
            <select
              id="priority"
              className="border-[1px] rounded-lg shadow-md w-full  border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-1 
              focus:ring-indigo-500 p-3 text-md
              "
            >
              <option selected disabled>
                Choose a Priority
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="flex items-center space-x-3">
            <button className="w-full p-2 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-800">
              Submit
            </button>
            <button className="w-full p-2 rounded-lg font-medium text-white bg-red-600 hover:bg-red-800" type='reset' onClick={onToggleModal}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CreateTask;
