/* eslint-disable react/prop-types */
import male from "../../../public/male.svg";
import female from "../../../public/female.svg";
const ProfileImage = ({ gender }) => {
  return (
    <div className="flex flex-col items-center lg:space-x-12 space-y-5 sm:flex-row sm:space-y-0">
      <img
        className="object-cover w-32 h-32 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
        src={`${gender === "male" ? male : female}`}
        alt="Bordered avatar"
      />
      <div className="flex flex-col space-y-5 w-full sm:w-auto">
        <button
          type="button"
          className="w-full py-3.5 px-3 text-base font-medium text-indigo-100 bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
        >
          Change picture
        </button>
        <button
          type="button"
          className="w-full py-3.5 text-base px-2 font-medium text-indigo-900 bg-red-200 rounded-lg border border-indigo-200 hover:bg-red-300 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
        >
          Delete picture
        </button>
      </div>
    </div>
  );
};

export default ProfileImage;
