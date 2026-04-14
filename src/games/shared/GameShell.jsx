import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GameShell.css';

export default function GameShell({ title, icon, groupColor, isDark, instructions, children, onRestart }) {
  const [phase, setPhase] = useState('instructions'); // instructions | playing | results

  return (
    <div className={`game-shell ${isDark ? 'dark' : ''}`} style={{ '--gc': groupColor }}>
      <AnimatePresence mode="wait">
        {phase === 'instructions' && (
          <motion.div key="instructions" className="game-instructions"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div className="game-instructions-icon">{icon}</div>
            <h2>{title}</h2>
            <p>{instructions}</p>
            <button className="game-start-btn" onClick={() => setPhase('playing')}
              style={{ background: groupColor }}>
              ▶ Започни!
            </button>
          </motion.div>
        )}
        {phase === 'playing' && (
          <motion.div key="playing" className="game-play-area"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            {typeof children === 'function' ? children({ setPhase }) : children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GameResults({ score, maxScore, groupColor, onRestart, message }) {
  const percent = Math.round((score / maxScore) * 100);
  const emoji = percent >= 80 ? '🏆' : percent >= 50 ? '👍' : '💪';
  const msg = message || (percent >= 80 ? 'Отлично! Ти си финансов шампион!' : percent >= 50 ? 'Добре се справи! Пробвай пак за по-добър резултат.' : 'Не се притеснявай! Упражнявай се и ще стане по-лесно.');

  return (
    <motion.div className="game-results" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      <div className="results-emoji">{emoji}</div>
      <h2>Резултат: {score}/{maxScore}</h2>
      <div className="results-bar-bg">
        <motion.div className="results-bar-fill" style={{ background: groupColor }}
          initial={{ width: 0 }} animate={{ width: `${percent}%` }} transition={{ duration: 1, ease: 'easeOut' }} />
      </div>
      <p className="results-percent">{percent}%</p>
      <p className="results-message">{msg}</p>
      <button className="game-restart-btn" onClick={onRestart} style={{ background: groupColor }}>
        🔄 Играй пак
      </button>
    </motion.div>
  );
}
