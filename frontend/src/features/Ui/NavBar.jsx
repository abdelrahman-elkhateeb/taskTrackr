import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="flex justify-between p-4 items-center">
      <Link to="/">
        <h4 className="logo">TaskTrackr</h4>
      </Link>

      <ul className="flex gap-4 items-center">
        <li className="cursor-pointer">project management</li>
        <li className="cursor-pointer">login</li>
        <li>
          <DarkModeToggle />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
