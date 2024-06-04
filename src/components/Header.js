import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div class="h12">
      <h1 class="h13">Cecilia Drabik</h1>
      <nav class="navbar">
        <ul>
          <li>
            <a>
              <Link to="/stat_form">Log Stats</Link>
            </a>
          </li>
          <li>
            <a>
              <Link to="/about">About</Link>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
