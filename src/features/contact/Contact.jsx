import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import MagneticButton from '../magnetic-button/MagneticButton';
import TextReveal from '../text-reveal/TextReveal';
import './Contact.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const ease = [0.16, 1, 0.3, 1];

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className="contact-inner">
        <motion.h2
          className="contact-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <TextReveal>Let&apos;s talk</TextReveal>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
        >
          <MagneticButton href="mailto:piyushpanbude2107@gmail.com">
            <span className="contact-email">piyushpanbude2107@gmail.com</span>
          </MagneticButton>
        </motion.div>
        <motion.p
          className="contact-location"
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
        >
          Goregaon (E), Mumbai
        </motion.p>
      </div>
    </section>
  );
}
