import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation on click
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
  };

  return (
    <header className="bg-amber-900 text-amber-100 py-4 font-mono border-b-4 border-amber-600">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold typewriter">&gt; AJ_Dev_</h1>
        <ul className="flex space-x-6">
          {/* Update list items to use onClick for navigation */}
          <li>
            <button
              onClick={() => handleNavigation("/")}
              className="hover:text-amber-400 transition"
            >
              &gt; Home
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/pages/about")}
              className="hover:text-amber-400 transition"
            >
              &gt; About
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/pages/projects")}
              className="hover:text-amber-400 transition"
            >
              &gt; Projects
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/pages/blog")}
              className="hover:text-amber-400 transition"
            >
              &gt; Blog
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigation("/pages/contact")}
              className="hover:text-amber-400 transition"
            >
              &gt; Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
