import ProjectContent from './ProjectContent/ProjectContent';
import ProjectPreview from './ProjectPreview/ProjectPreview';
import './ProjectRow.css';

export default function ProjectRow({ project, index }) {
  const isEven = index % 2 === 0;
  const direction = isEven ? 'info-left' : 'info-right';

  return (
    <article className="project-row" data-direction={direction}>
      <ProjectContent project={project} index={index} />
      <ProjectPreview project={project} />
    </article>
  );
}
