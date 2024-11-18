import React from "react";
import Header from "./Header"; // Adjust the path according to your project structure

const Projects = () => {
  const projects = [
    {
      title: "Project_1",
      description: "A full-stack application built with React and Node.js",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://github.com/Ajit-coder237/Employee-Management-System",
    },
    // Add more projects here
  ];

  return (
    <>
      <Header />
      <section id="projects" className="bg-[#2b2b2b] text-amber-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 terminal-text">
            &gt; Projects_
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border-2 border-amber-600 p-6 hover:border-amber-400 transition"
              >
                <h3 className="text-xl font-bold mb-2">&gt; {project.title}</h3>
                <p className="mb-4 text-amber-200">{project.description}</p>
                <div className="flex gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-amber-900 text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  className="text-amber-400 hover:underline"
                >
                  {">"} View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;
