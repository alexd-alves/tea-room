// Navbar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
export default function Navbar() {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <button
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span></span>
        </button>
        <div id="navbarSupportedContent">
          <ul>
            <li>
              <NavLink to="/create">Create Player</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
