import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

// src/components/pages/Hero.jsx
const Hero = () => {
  return (
    <>
      <Header />
      <section className="min-h-screen bg-[#2b2b2b] text-amber-100 py-20 flex items-center">
        <div className="container mx-auto px-4">
          <div className="crt-frame p-8 border-2 border-amber-600 bg-black/40 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-4 typewriter">
              Hello, I'm AJ_
            </h1>
            <p className="text-xl mb-6 terminal-text">
              &gt; <span className="text-amber-400">const</span> developer ={" "}
              {"{"}
              name: <span className="text-green-400">'AJ'</span>, skills:{" "}
              <span className="text-green-400">
                ['JavaScript', 'React', 'Node.js', 'TypeScript']
              </span>
              {"}"};
            </p>
            <p className="mb-6 terminal-text">
              &gt; I am a passionate developer with a knack for creating dynamic
              and responsive web applications. My journey in tech has been
              fueled by curiosity and a love for solving complex problems.
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="px-6 py-2 bg-amber-800 hover:bg-amber-700 transition border-2 border-amber-600 cursor-pointer"
              >
                VIEW_PROJECTS.exe
              </a>
              <a
                href="#contact"
                className="px-6 py-2 bg-amber-800 hover:bg-amber-700 transition border-2 border-amber-600 cursor-pointer"
              >
                CONTACT_ME.exe
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
