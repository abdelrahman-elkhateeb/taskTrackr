/* eslint-disable react/prop-types */
const FiltrationComponent = ({ isDrawerOpen, toggleDrawer }) => {
  return (
    <div className={`drawer drawer-end ${isDrawerOpen ? "open" : ""}`}>
      <input
        id="my-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">{/* Page content here */}</div>
      <div className="drawer-side">
        <label
          aria-label="close sidebar"
          className="drawer-overlay"
          onClick={toggleDrawer}
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            Priority
            <div className="form-control ">
              <label className="label cursor-pointer w-full">
                <span className="label-text mr-28 font-black">Low</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-24 font-black">Medium</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-28 font-black">High</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
          </li>
          <li>
            Status
            <div className="form-control ">
              <label className="label cursor-pointer w-full">
                <span className="label-text mr-28 font-black">Completed</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
            <div className="form-control ">
              <label className="label cursor-pointer w-full">
                <span className="label-text mr-28 font-black">In Progress</span>
                <input type="checkbox" className="checkbox" />
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FiltrationComponent;
