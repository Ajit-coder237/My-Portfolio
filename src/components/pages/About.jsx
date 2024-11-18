import React from "react";
import Header from "./Header"; // Adjust the path according to your project structure

const About = () => {
  return (
    <>
      <Header />
      <section id="about" className="bg-[#2b2b2b] text-amber-100 py-20">
        <div className="container mx-auto px-4">
          <div className="crt-frame p-8 border-2 border-amber-600 bg-black/40">
            <h2 className="text-3xl font-bold mb-6 terminal-text">
              &gt; About_Me
            </h2>
            <div className="terminal-text">
              <p className="mb-4">
                &gt; <span className="text-amber-400">whoami</span>
                <br />A passionate developer with expertise in modern web
                technologies.
              </p>
              <p className="mb-4">
                &gt; <span className="text-amber-400">skills.list</span>
                <br />
                <span className="text-green-400">
                  ['JavaScript', 'React', 'Node.js', 'TypeScript',
                  'TailwindCSS']
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
