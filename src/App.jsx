import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import AgeGroup from './pages/AgeGroup';
import TopicPage from './pages/TopicPage';
import GamePage from './games/GamePage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import './styles/index.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const location = useLocation();    
  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/grupa/:slug" element={<AgeGroup />} />
          <Route path="/grupa/:slug/tema/:topicId" element={<TopicPage />} />
          <Route path="/grupa/:slug/igra/:gameId" element={<GamePage />} />
          <Route path="/uslovia" element={<TermsPage />} />
          <Route path="/poveritlnost" element={<PrivacyPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
