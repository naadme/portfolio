import React from "react";
import { motion } from "framer-motion";
import ProjectRow from "./ProjectRow";
import projects from "./data";
import "./Projects.css";

const ease = [0.16, 1, 0.3, 1];

const Projects = () => {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-header">
        <motion.h2
          className="projects-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease }}
        >
          Selected Work
        </motion.h2>
        <motion.p
          className="projects-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          A collection of websites and digital experiences I&apos;ve designed and developed.
        </motion.p>
      </div>
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
