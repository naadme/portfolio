import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../magnetic-button/MagneticButton';
import './Footer.css';

const ease = [0.16, 1, 0.3, 1];

const linkVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease, delay: 0.1 + i * 0.1 },
  }),
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <footer className="footer" ref={ref}>
      <div className="footer-inner">
        <div className="footer-left">
          <MagneticButton href="https://github.com/naadme" target="_blank" rel="noopener noreferrer">
            <motion.span
              className="footer-social"
              custom={0}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={linkVariants}
            >
              GITHUB
            </motion.span>
          </MagneticButton>
          <MagneticButton href="https://www.linkedin.com/in/piyush-panbude" target="_blank" rel="noopener noreferrer">
            <motion.span
              className="footer-social"
              custom={1}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={linkVariants}
            >
              LINKEDIN
            </motion.span>
          </MagneticButton>
        </div>

        <div className="footer-right">
          <motion.p
            className="footer-tagline"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
          >
            Let&apos;s Build<br />Something Great.
          </motion.p>
          <motion.p
            className="footer-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.45 }}
          >
            Available for freelance projects.
          </motion.p>
        </div>
      </div>

      <div className="footer-bottom">
        <motion.span
          className="footer-copyright"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          © 2026 Piyush Panbude. All Rights Reserved.
        </motion.span>
      </div>
    </footer>
  );
}
