import { useEffect, useRef } from 'react';
import './Cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId;
    let isVisible = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        dotX = mouseX;
        dotY = mouseY;
        ringX = mouseX;
        ringY = mouseY;
      }
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label, img');
      if (target) {
        dot.classList.add('cursor-dot--hidden');
        ring.classList.add('cursor-ring--hover');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label, img');
      if (target) {
        dot.classList.remove('cursor-dot--hidden');
        ring.classList.remove('cursor-ring--hover');
      }
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

      const isHovering = ring.classList.contains('cursor-ring--hover');
      const scale = isHovering ? 1.15 : 0.5;
      ring.style.transform = `translate(${ringX - 44}px, ${ringY - 44}px) scale(${scale})`;
    };

    dot.style.opacity = '0';
    ring.style.opacity = '0';
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <svg
          className="cursor-ring-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </div>
    </>
  );
}
