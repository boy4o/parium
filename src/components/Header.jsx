import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-text">Пари<span>УМ</span></span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#groups" onClick={(e) => scrollToSection(e, 'groups')}>Възрастови групи</a></li>
          <li><a href="#features" onClick={(e) => scrollToSection(e, 'features')}>Как работи</a></li>
          <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>За нас</a></li>
          <li><a href="#groups" onClick={(e) => scrollToSection(e, 'groups')} className="nav-cta">🚀 Започни</a></li>
        </ul>

        <button className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
