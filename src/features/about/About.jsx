import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import TextReveal from '../text-reveal/TextReveal';
import AnimatedCounter from '../animated-counter/AnimatedCounter';
import './About.css';

const ease = [0.16, 1, 0.3, 1];

const entryVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease, delay: 0.1 + i * 0.08 },
  }),
};

const education = [
  { period: '2025 – Present', name: 'NMIMS University', detail: 'B.Sc. Data Science' },
  { period: '2023 – 2025', name: 'Dahanukar College', detail: 'Commerce' },
];

const experiences = [
  { period: '2025 – Present', name: 'Independent Web Developer', detail: 'Designing and developing premium custom websites for startups, businesses and brands.' },
  { period: '2025', name: 'Graphic Designer', detail: 'SeeAdler Media' },
];

const stats = [
  { value: 4, suffix: '+', label: 'Projects Built' },
  { value: 2, suffix: '', label: 'Client Projects' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 100, suffix: '%', label: 'Custom Built' },
];

const techStack = [
  'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express',
  'MongoDB', 'Firebase', 'Framer Motion', 'GSAP', 'Tailwind CSS',
  'HTML5', 'CSS3', 'Git', 'GitHub', 'Figma', 'Responsive Design',
];

const languages = ['English (Professional)', 'Hindi (Native)', 'Marathi (Native)'];
const interests = ['AI Development', 'Creative Coding', 'Motion Design', 'UI Engineering', 'Design Systems'];

function SkillTags({ items, delayBase }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="about-skill-tags" ref={ref}>
      {items.map((item, i) => (
        <span
          key={item}
          className="about-skill-tag"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'scale(1)' : 'scale(0.8)',
            transition: `opacity 0.4s ease ${delayBase + i * 0.03}s, transform 0.4s ease ${delayBase + i * 0.03}s`,
          }}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.3], ['0%', '100%']);

  return (
    <section id="about" className="about" ref={ref}>
      <div className="about-greeting">
        <motion.h2
          className="about-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <TextReveal delay={0}>Hello there</TextReveal>
          <br />
          <TextReveal delay={0.15}>I&apos;m Piyush Panbude</TextReveal>
        </motion.h2>
      </div>

      <div className="about-description">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
        >
          I design and develop modern, high-performance websites that combine exceptional aesthetics with seamless user experience. I build custom digital experiences for startups, businesses and personal brands with a strong focus on quality, performance and clean engineering.
        </motion.p>
      </div>

      <div className="about-stats" ref={sectionRef}>
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="about-stat"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease, delay: 0.25 + i * 0.08 }}
          >
            <span className="about-stat-number">
              <AnimatedCounter target={stat.value} duration={1.2} suffix={stat.suffix} />
            </span>
            <span className="about-stat-label">{stat.label}</span>
          </motion.div>
        ))}
        <motion.div className="about-stats-line" style={{ width: lineWidth }} />
      </div>

      <motion.div
        className="about-education"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.3 }}
      >
        <span className="about-label">Education</span>
        <div className="about-entries">
          {education.map((entry, i) => (
            <motion.div
              key={i}
              className="about-entry"
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={entryVariants}
            >
              <span className="about-period">{entry.period}</span>
              <span className="about-name">{entry.name}</span>
              <span className="about-detail">{entry.detail}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="about-experience"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.4 }}
      >
        <span className="about-label">Experiences</span>
        <div className="about-entries">
          {experiences.map((entry, i) => (
            <motion.div
              key={i}
              className="about-entry"
              custom={i}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={entryVariants}
            >
              <span className="about-period">{entry.period}</span>
              <span className="about-name">{entry.name}</span>
              <span className="about-detail">{entry.detail}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="about-skills"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.45 }}
      >
        <span className="about-label">Tech Stack</span>
        <SkillTags items={techStack} delayBase={0.5} />
      </motion.div>

      <motion.div
        className="about-skills"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.5 }}
      >
        <span className="about-label">Languages</span>
        <SkillTags items={languages} delayBase={0.55} />
      </motion.div>

      <motion.div
        className="about-skills"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease, delay: 0.55 }}
      >
        <span className="about-label">Currently Exploring</span>
        <SkillTags items={interests} delayBase={0.6} />
      </motion.div>
    </section>
  );
}
