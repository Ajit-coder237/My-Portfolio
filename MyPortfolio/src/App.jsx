import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/pages/Hero";
import About from "./components/pages/About";
import Projects from "./components/pages/Projects";
import Contact from "./components/pages/Contact";
import Blog from "./components/pages/Blogs";
import Admin from "./components/pages/Admin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/pages/about" element={<About />} />
        <Route path="/pages/projects" element={<Projects />} />
        <Route path="/pages/contact" element={<Contact />} />
        <Route path="/pages/admin" element={<Admin />} />
        <Route path="/pages/blog" element={<Blog />} /> {/* Add Blog route */}
      </Routes>
    </Router>
  );
};

export default App;
