
const FiltrationBox = () => {

  return (
    <div className="mt-10 bg-gray-700 rounded-lg p-2 max-w-sm ">
      <div className="p-2 ">
        <form className="max-w-md mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-white  border  rounded-lg  outline-none focus:border-dark-primary bg-gray-700 border-gray-600 dark:placeholder-gray-400 dark:text-white  "
              placeholder="Search"
              required
            />

            <button
              type="submit"
              className="text-black absolute end-2.5 bottom-2.5 bg-dark-primary hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-dark-primary dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        <div className="my-4">
          Priority
          <div className="divider"></div>
          <div className="form-control ">
            <label className="label cursor-pointer w-full">
              <span className="label-text mr-28 font-black text-lg">Low</span>
              <input type="checkbox" className="checkbox checkbox-accent" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text  font-black text-lg">Medium</span>
              <input type="checkbox" className="checkbox checkbox-accent" />
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text mr-28 font-black text-lg">High</span>
              <input type="checkbox" className="checkbox checkbox-accent" />
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
