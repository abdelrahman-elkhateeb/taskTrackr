/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const ProfileDataForm = ({ username, email, gender }) => {
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  return (
    <div className="mt-4 text-[#202142]">
      <div className="flex flex-col w-full mb-2 space-y-2">
        <div className="w-full">
          <label
            htmlFor="user_name"
            className={`block mb-2 text-sm font-medium  ${
              darkMode ? `text-gray-200` : "text-indigo-900"
            }`}
          >
            Your Username
          </label>
          <input
            type="text"
            id="user_name"
            className={`block w-full p-3 text-sm border rounded-lg outline-none ${
              darkMode
                ? "bg-gray-700 text-white"
                : "bg-slate-200 border-[1px] text-black border-dark-primary"
            } dark:placeholder-gray-400 dark:text-white`}
            placeholder="Your Username"
            value={username}
            required
          />
        </div>
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="email"
          className={`block mb-2 text-sm font-medium  ${
            darkMode ? `text-gray-200` : "text-indigo-900"
          }`}
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className={`block w-full p-3 text-sm border rounded-lg outline-none ${
            darkMode
              ? "bg-gray-700 text-white"
              : "bg-slate-200 border-[1px] text-black border-dark-primary"
          } dark:placeholder-gray-400 dark:text-white`}
          placeholder="your.email@mail.com"
          value={email}
          required
        />
      </div>

      <div className="mb-2 w-full">
        <label
          htmlFor="gender"
          className={`block mb-2 text-sm font-medium  ${
            darkMode ? `text-gray-200` : "text-indigo-900"
          }`}
        >
          Your Gender
        </label>

        <div className="flex gap-4 w-full">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              id="gender-male"
              name="gender"
              value="male"
              className={`p-2 focus:ring-indigo-500 ${
                darkMode ? "bg-gray-700 text-white" : "bg-slate-200 text-black"
              }`}
              required
              checked={gender === "male"}
            />
            <span className={darkMode ? "text-white" : "text-black"}>Male</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              id="gender-female"
              name="gender"
              value="female"
              className={`p-2 focus:ring-indigo-500 ${
                darkMode ? "bg-gray-700 text-white" : "bg-slate-200 text-black"
              }`}
              required
              checked={gender === "female"}
            />
            <span className={darkMode ? "text-white" : "text-black"}>
              Female
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
      >
        Update Profile
      </button>
    </div>
  );
};

export default ProfileDataForm;
