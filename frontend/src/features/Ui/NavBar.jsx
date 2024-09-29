import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./NavBar.css";
import { useSelector } from "react-redux";

function NavBar() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <nav
      className={`flex justify-between p-4 px-8 items-center border-2 rounded-[35px] mt-7 container ${
        darkMode ? "text-dark-text" : "text-light-text"
      }`}
    >
      <Link to="/">
        <h4 className={`logo ${
            darkMode
              ? " text-dark-primary"
              : " text-light-primary"
          }`}>TaskTrackr</h4>
      </Link>

      <ul className="flex gap-4 items-center font-semibold">
        <li className={`cursor-pointer ${
            darkMode
              ? " text-dark-primary"
              : " text-light-primary"
          }`}>project management</li>
        <li
          className={`cursor-pointer px-3 py-1 rounded ${
            darkMode
              ? "bg-dark-primary text-light-text"
              : "bg-light-primary text-dark-text"
          }`}
        >
          login
        </li>
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
