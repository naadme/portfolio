import { useState } from 'react';
import { motion } from 'framer-motion';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo">PIYUSH PANBUDE</a>

        <div className="navbar-center">
          <a href="#about" className="navbar-link">ABOUT</a>
          <a href="#contact" className="navbar-link">CONTACT</a>
          <a href="#contact" className="navbar-link">RESUME</a>
        </div>

        <span className="navbar-year">&copy;2025</span>

        <button
          className={`navbar-burger ${menuOpen ? 'navbar-burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${menuOpen ? 'navbar-mobile--open' : ''}`}>
        <a href="#about" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>ABOUT</a>
        <a href="#contact" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>CONTACT</a>
        <a href="#contact" className="navbar-mobile-link" onClick={() => setMenuOpen(false)}>resume</a>
        <span className="navbar-mobile-year">&copy;2025</span>
      </div>
    </motion.nav>
  );
}
