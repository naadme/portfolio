import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import './ScrollProgress.css';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 811);
  }, []);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: isMobile ? 300 : 200,
    damping: isMobile ? 50 : 40,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-progress">
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX, transformOrigin: '0%' }}
      />
    </div>
  );
}
