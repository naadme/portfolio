import { motion } from 'framer-motion';
import TextReveal from '../text-reveal/TextReveal';
import './Hero.css';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-gradient" />

      <div className="hero-name">
        <div className="hero-line">
          <span className="hero-letter-sweep">PIYUSH</span>
        </div>

        <div className="hero-line">
          <span className="hero-letter-sweep hero-letter-sweep-delay">
            PANBUDE
          </span>
        </div>
      </div>

      <motion.div
        className="hero-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
          delay: 2.2,
        }}
      >
        <TextReveal delay={2.2} as="span">
          Building digital experiences.
        </TextReveal>
      </motion.div>

      <motion.div
        className="hero-scroll-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.8 }}
      >
        <div className="hero-scroll-line" />
        <span>SCROLL</span>
      </motion.div>
    </section>
  );
}