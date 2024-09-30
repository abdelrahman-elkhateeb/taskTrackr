import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useState } from "react";
import { useSelector } from "react-redux";

function NavBar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav
      className={`flex justify-between p-4 px-8 items-center border-2 rounded-[35px] mt-7 container mx-auto ${
        darkMode ? "text-dark-text" : "text-light-text"
      }`}
    >
      {/* Logo */}
      <Link to="/">
        <h4
          className={`logo text-2xl font-bold ${
            darkMode ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          TaskTrackr
        </h4>
      </Link>

      {/* Hamburger Icon for Mobile */}
      <div
        className="md:hidden flex flex-col gap-1.5 cursor-pointer"
        onClick={toggleSidebar}
      >
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
        <span
          className={`w-6 h-0.5 ${
            darkMode ? "bg-dark-primary" : "bg-light-primary"
          }`}
        ></span>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <ul className="flex flex-col gap-6 p-8 text-lg">
          <li
            className={`cursor-pointer ${
              darkMode ? "text-dark-primary" : "text-light-primary"
            }`}
          >
            project management
          </li>
          <Link
            to={"/login"}
            className={`cursor-pointer px-4 py-2 rounded-lg ${
              darkMode
                ? "bg-dark-primary text-light-text"
                : "bg-light-primary text-dark-text"
            }`}
          >
            login
          </Link>
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>

      {/* Main Nav for Desktop */}
      <ul className="hidden md:flex gap-6 items-center text-lg font-semibold">
        <li
          className={`cursor-pointer ${
            darkMode ? "text-dark-primary" : "text-light-primary"
          }`}
        >
          project management
        </li>
        <Link
          to={"/login"}
          className={`cursor-pointer px-4 py-2 rounded-lg ${
            darkMode
              ? "bg-dark-primary text-light-text"
              : "bg-light-primary text-dark-text"
          }`}
        >
          login
        </Link>
        <li>
          <DarkModeToggle />
        </li>
      </ul>

      {/* Backdrop for sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </nav>
  );
}

export default NavBar;
