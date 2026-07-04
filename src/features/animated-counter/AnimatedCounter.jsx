import { useRef, useEffect, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ target, duration = 2, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const end = parseInt(target, 10);
    const startTime = performance.now();
    let rafId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="counter-value">
      {count}{suffix}
    </span>
  );
}
