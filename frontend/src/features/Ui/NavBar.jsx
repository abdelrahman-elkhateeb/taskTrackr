import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./NavBar.css";
import { useSelector } from "react-redux";

function NavBar() {
  const darkMode = useSelector((state) => state.darkMode.darkMode);
  return (
    <nav
      className={`flex justify-between p-4 items-center border-b-2 ${
        darkMode ? "text-dark-text" : "text-light-text"
      }`}
    >
      <Link to="/">
        <h4 className="logo">TaskTrackr</h4>
      </Link>

      <ul className="flex gap-4 items-center font-semibold">
        <li className="cursor-pointer">project management</li>
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
