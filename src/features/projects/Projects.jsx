import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Projects.css';

const ease = [0.16, 1, 0.3, 1];

const projects = [
  {
    name: 'NextWave Studio',
    description: 'PREMIUM MARKETING AGENCY | WEB DESIGN',
    image: '/projects/nextwave.png',
    height: 'short',
    link: 'https://github.com/piyush-4',
  },
  {
    name: 'Hindustan Courier',
    description: 'INTERNATIONAL SHIPPING PLATFORM | FULL STACK',
    image: '/projects/hindustan.jpeg',
    height: 'tall',
    link: 'https://github.com/piyush-4',
  },
  {
    name: 'Chawala Dental Clinic',
    description: 'DENTAL CARE WEBSITE | HEALTHCARE',
    image: '/projects/chawala.jpg',
    height: 'short',
    link: 'https://github.com/piyush-4',
  },
  {
    name: 'Online Store',
    description: 'E-COMMERCE PLATFORM | FLASK & PYTHON',
    image: '/projects/store.png',
    height: 'tall',
    link: 'https://github.com/piyush-4',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
      delay: 0.1 + i * 0.12,
    },
  }),
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="work" className="projects" ref={ref}>
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease }}
      >
        Selected work
      </motion.h2>

      <div className="projects-grid">
        {projects.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className={`project-card ${project.height === 'tall' ? 'project-card--tall' : 'project-card--short'}`}
            custom={i}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={cardVariants}
          >
            <div className="project-card-image">
              <img src={project.image} alt={project.name} loading="lazy" />
            </div>
            <div className="project-card-info">
              <h3 className="project-card-name">{project.name}</h3>
              <p className="project-card-desc">{project.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
