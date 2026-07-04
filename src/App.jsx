import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './features/navbar/Navbar';
import Hero from './features/hero/Hero';
import Projects from './features/projects/Projects';
import About from './features/about/About';
import Contact from './features/contact/Contact';
import Footer from './features/footer/Footer';
import Cursor from './features/cursor/Cursor';
import ScrollProgress from './features/scroll-progress/ScrollProgress';
import './styles/global.css';

export default function App() {
  const rafRef = useRef(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 811;

    const lenis = new Lenis({
      duration: isMobile ? 1 : 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !isMobile,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
