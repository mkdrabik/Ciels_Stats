import { React } from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div class="header">
      <h1>
        <Link to="/about" className="cname">
          Cecilia Drabik
        </Link>
      </h1>
      <nav class="navbar">
        <ul>
          <li>
            <span>
              <Link to="/account">Gmail</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/stat_form">Log Stats</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/stats">View Stats</Link>
            </span>
          </li>
          <li>
            <span>
              <Link to="/media">Media</Link>
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Header;
