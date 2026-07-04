import React from "react";
import "./ProjectContent.css";

const ProjectContent = ({ project }) => {
  const { number, category, title, description, tech, status } = project;

  return (
    <div className="project-content">
      <span className="project-content__number">{number}</span>

      <span className="project-content__category">{category}</span>

      <h3 className="project-content__title">{title}</h3>

      <p className="project-content__description">{description}</p>

      <div className="project-content__pills">
        {tech.map((item) => (
          <span className="project-content__pill" key={item}>
            {item}
          </span>
        ))}
      </div>

      <div className="project-content__status">
        <span className="project-content__status-dot" />
        <span className="project-content__status-label">{status}</span>
      </div>
    </div>
  );
};

export default ProjectContent;
