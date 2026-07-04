import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./Projects.css";

const ease = [0.16, 1, 0.3, 1];

const projects = [
  {
    id: "01",
    category: "Logistics Website",
    title: "Hindustan Courier & Cargo Services",
    description:
      "A premium logistics website designed for a real courier company with modern branding, smooth interactions and a conversion-focused user experience.",

    desktop: "/projects/hindustan-desktop.jpg",
    mobile: "/projects/hindustan-mobile.jpg",

    tags: ["React", "Vite", "Framer Motion"],

    status: "Private Client Project"
  },

  {
    id: "02",
    category: "Marketing Agency",
    title: "NextWave Studio",
    description:
      "A modern marketing agency website focused on premium visuals, clean typography and high-end animations.",

    desktop: "/projects/nextwave-desktop.jpg",
    mobile: "/projects/nextwave-mobile.jpg",

    tags: ["React", "GSAP", "Motion"],

    status: "Private Client Project"
  },

  {
    id: "03",
    category: "Healthcare",
    title: "Chawala Dental Clinic",
    description:
      "Professional healthcare website designed to build trust while keeping appointments and services easily accessible.",

    desktop: "/projects/chawala-desktop.jpg",
    mobile: "/projects/chawala-mobile.jpg",

    tags: ["React", "Responsive", "SEO"],

    status: "Waiting For Client Approval"
  },

  {
    id: "04",
    category: "E-Commerce",
    title: "Online Store",
    description:
      "Custom full-stack online store with premium UI and responsive shopping experience.",

    desktop: "/projects/store-desktop.jpg",
    mobile: "/projects/store-mobile.jpg",

    tags: ["Python", "Flask", "SQLite"],

    status: "In Development"
  }
];

export default function Projects() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  return (
    <section
      id="projects"
      className="projects"
      ref={ref}
    >
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.8,
          ease
        }}
      >
        Selected work
      </motion.h2>

      <div className="projects-list">
        {projects.map((project, index) => {
          const reverse = index % 2 === 1;

          return (
            <motion.div
              key={project.id}
              className="project-row"
              data-direction={reverse ? "reverse" : "normal"}
              initial={{
                opacity: 0,
                y: 60
              }}
              whileInView={{
                opacity: 1,
                y: 0
              }}
              viewport={{
                once: true,
                amount: 0.3
              }}
              transition={{
                duration: 0.9,
                ease
              }}
            >
              {!reverse && (
                <>
                  <ProjectPreview project={project} />
                  <ProjectContent project={project} />
                </>
              )}

              {reverse && (
                <>
                  <ProjectContent project={project} />
                  <ProjectPreview project={project} />
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ProjectContent({ project }) {
  return (
    <div className="project-content">
      <span className="project-number">
        {project.id}
      </span>

      <span className="project-category">
        {project.category}
      </span>

      <h3 className="project-title">
        {project.title}
      </h3>

      <p className="project-description">
        {project.description}
      </p>

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="project-tag"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="project-status">
        <span className="project-status-dot"></span>
        {project.status}
      </div>
    </div>
  );
}

function ProjectPreview({ project }) {
  return (
    <div className="project-preview">

      <div className="project-device project-macbook">

        <div className="project-macbook-screen">
          <img
            src={project.desktop}
            alt={project.title}
          />
        </div>

        <div className="project-laptop-base"></div>

      </div>

      <div className="project-device project-phone">

        <div className="project-phone-screen">
          <img
            src={project.mobile}
            alt={project.title}
          />
        </div>

      </div>

    </div>
  );
}