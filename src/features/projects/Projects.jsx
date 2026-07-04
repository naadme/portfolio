import React from "react";
import ProjectRow from "./ProjectRow";
import projects from "./data";
import "./Projects.css";

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={index}
            reversed={index % 2 !== 0}
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;
