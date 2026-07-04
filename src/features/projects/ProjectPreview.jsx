import React from "react";
import { motion } from "framer-motion";
import MacBookMockup from "./MacBookMockup";
import PhoneMockup from "./PhoneMockup";
import "./ProjectPreview.css";

const previewVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const macVariants = {
  rest: { y: 0 },
  hover: {
    y: -8,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const phoneVariants = {
  rest: { y: 0 },
  hover: {
    y: -16,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProjectPreview = ({ project, reversed }) => {
  return (
    <motion.div
      className={`project-preview ${
        reversed ? "project-preview--right" : "project-preview--left"
      }`}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={previewVariants}
    >
      <motion.div className="project-preview__mac" variants={macVariants}>
        <MacBookMockup image={project.desktopImage} alt={`${project.title} desktop preview`} />
      </motion.div>

      <motion.div
        className={`project-preview__phone ${
          reversed
            ? "project-preview__phone--right"
            : "project-preview__phone--left"
        }`}
        variants={phoneVariants}
      >
        <PhoneMockup image={project.mobileImage} alt={`${project.title} mobile preview`} />
      </motion.div>
    </motion.div>
  );
};

export default ProjectPreview;
