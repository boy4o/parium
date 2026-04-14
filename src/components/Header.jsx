import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-text">Пари<span>УМ</span></span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/#groups">Възрастови групи</Link></li>
          <li><Link to="/#features">Как работи</Link></li>
          <li><Link to="/#about">За нас</Link></li>
          <li><Link to="/#groups" className="nav-cta">🚀 Започни</Link></li>
        </ul>

        <button className={`nav-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Меню">
          <span /><span /><span />
        </button>
      </nav>
    </header>
  );
}
