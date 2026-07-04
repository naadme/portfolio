import MacBookMockup from './MacBookMockup/MacBookMockup';
import PhoneMockup from './PhoneMockup/PhoneMockup';
import './ProjectPreview.css';

export default function ProjectPreview({ project }) {
  return (
    <div className="project-preview">
      <MacBookMockup screenshot={project.desktopImage} />
      <PhoneMockup screenshot={project.mobileImage} />
    </div>
  );
}
