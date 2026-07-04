import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function TextReveal({ children, className = '', delay = 0, as = 'div' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Tag = motion[as] || motion.div;

  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <Tag ref={ref} className={className} style={{ overflow: 'hidden', display: 'inline-block' }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <span
            style={{
              display: 'inline-block',
              transform: isInView ? 'translateY(0)' : 'translateY(100%)',
              transition: `transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay + i * 0.04}s`,
              willChange: 'transform',
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}
