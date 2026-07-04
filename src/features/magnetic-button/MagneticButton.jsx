import { useRef, useCallback, useEffect, useState } from 'react';
import './MagneticButton.css';

export default function MagneticButton({ children, className = '', href, ...props }) {
  const ref = useRef(null);
  const rafRef = useRef(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 811);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isMobile) return;
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    el.style.transform = 'translate(0, 0)';
  }, []);

  const Tag = href ? 'a' : 'span';

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
}
