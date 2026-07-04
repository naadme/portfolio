import React from "react";
import { motion } from "framer-motion";
import ProjectPreview from "./ProjectPreview";
import ProjectContent from "./ProjectContent";
import "./ProjectRow.css";

const rowVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProjectRow = ({ project, index, reversed }) => {
  return (
    <motion.div
      className={`project-row ${reversed ? "project-row--reversed" : ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={rowVariants}
    >
      <div className="project-row__preview">
        <ProjectPreview project={project} reversed={reversed} />
      </div>
      <div className="project-row__content">
        <ProjectContent project={project} />
      </div>
    </motion.div>
  );
};

export default ProjectRow;
