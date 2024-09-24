const ProgressComponent = () => {
  return (
    <div className="my-6">
      <h2 className="mb-3">
        <span className="text-2xl font-bold">My Tasks</span>
        <span className="mx-3 text-gray-500 text-lg">10/16 Completed</span>
      </h2>
      <div className="w-96 h-8 bg-gray-400 rounded-md">
        <div
          className="h-8 bg-purple-700 rounded-md "
          style={{ width: "70%" }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressComponent;
