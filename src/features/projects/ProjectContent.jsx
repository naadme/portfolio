import React from "react";
import "./ProjectContent.css";

const ProjectContent = ({ project }) => {
  const { number, category, title, description, tech, status, website } =
    project;

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

      {website ? (
        <a
          className="project-content__status project-content__status--visit"
          href={website}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="project-content__visit-label">Visit Website</span>
          <span className="project-content__visit-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
      ) : (
        <div className="project-content__status">
          <span className="project-content__status-dot" />
          <span className="project-content__status-label">{status}</span>
        </div>
      )}
    </div>
  );
};

export default ProjectContent;
