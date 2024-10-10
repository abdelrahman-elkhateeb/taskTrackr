import SearchTasks from "../Ui/SearchTasks";

const FiltrationBox = () => {
  return (
    <div className="mt-10 bg-gray-700 rounded-lg p-2 max-w-sm ">
      <div className="p-2 ">
        <SearchTasks />

        <div className="my-4">
          Priority
          <div className="divider"></div>
          <div className="form-control ">
            <label className="label cursor-pointer w-full">
              <span className="label-text mr-28 font-black text-lg">Low</span>
              <input type="radio" name="priority" className="checkbox checkbox-accent" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text  font-black text-lg">Medium</span>
              <input type="radio" name="priority" className="checkbox checkbox-accent" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-28 font-black text-lg">High</span>
              <input type="radio" name="priority" className="checkbox checkbox-accent" />
            </label>
          </div>
        </div>
        <div className="my-4">
          Status
          <div className="divider"></div>
          <div className="form-control ">
            <label className="label cursor-pointer w-full">
              <span className="label-text mr-28 font-black text-lg">
                Completed
              </span>
              <input type="checkbox" className="checkbox checkbox-accent" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text  font-black text-lg">
                In Progress
              </span>
              <input type="checkbox" className="checkbox checkbox-accent" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltrationBox;
