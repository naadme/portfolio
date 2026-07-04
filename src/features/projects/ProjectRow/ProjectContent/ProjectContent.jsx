import './ProjectContent.css';

const statusLabels = {
  live: 'Live Website',
  development: 'In Development',
  private: 'Private Client Project',
  waiting: 'Client Review',
  launching: 'Launching Soon',
};

export default function ProjectContent({ project, index }) {
  const { category, title, description, tags, status = 'development' } = project;

  return (
    <div className="project-content">
      <span className="project-number">
        {String(index + 1).padStart(2, '0')}
      </span>

      <span className="project-category">{category}</span>

      <h3 className="project-title">{title}</h3>

      <p className="project-description">{description}</p>

      <div className="project-tags">
        {tags.map((tag) => (
          <span key={tag} className="project-tag">
            {tag}
          </span>
        ))}
      </div>

      <span className={`project-status project-status--${status}`}>
        <span className="project-status-dot" />
        {statusLabels[status]}
      </span>
    </div>
  );
}
