import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/test">Test</Link>
        </li>
        <li>
          <Link to="/account">Account</Link>
        </li>
        <li>
          <Link to="/agreement">Roommate Agreement Generator</Link>
        </li>
      </ul>
    </nav>
  );
};

export default MainMenu;
