/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const ChangePasswordForm = ({ password }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="mt-4 text-[#202142]">
      <div className="flex flex-col w-full mb-2 space-y-2">
        <div className="w-full">
          <label
            htmlFor="old_password"
            className={`block mb-2 text-sm font-medium  ${
              darkMode ? `text-gray-200` : "text-indigo-900"
            }`}
          >
            Old Password
          </label>
          <input
            type="password"
            id="old_password"
            className={`block w-full p-3 text-sm border rounded-lg outline-none ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-slate-200 border-[1px] text-black border-dark-primary"
            } dark:placeholder-gray-400 dark:text-white`}
            placeholder="Old Password"
            value={password}
            required
          />
        </div>
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="new_password"
          className={`block mb-2 text-sm font-medium  ${
            darkMode ? `text-gray-200` : "text-indigo-900"
          }`}
        >
          New Password
        </label>
        <input
          type="email"
          id="new_password"
          className={`block w-full p-3 text-sm border rounded-lg outline-none ${
            darkMode
              ? "bg-gray-700 text-white"
              : "bg-slate-200 border-[1px] text-black border-dark-primary"
          } dark:placeholder-gray-400 dark:text-white`}
          placeholder="New Password"
          required
        />
      </div>

      {/* <div className="mb-2 w-full">
        <label
          htmlFor="confirm_password"
          className={`block mb-2 text-sm font-medium  ${
            darkMode ? `text-gray-200` : "text-indigo-900"
          }`}
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirm_password"
          className={`block w-full p-3 text-sm border rounded-lg outline-none ${
            darkMode
              ? "bg-gray-700 text-white"
              : "bg-slate-200 border-[1px] text-black border-dark-primary"
          } dark:placeholder-gray-400 dark:text-white`}
          placeholder="Confirm Password"
          required
        />
      </div> */}

      <button
        type="submit"
        className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordForm;
