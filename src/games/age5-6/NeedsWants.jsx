import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const ITEMS = [
  { name: 'Хляб 🍞', type: 'need' }, { name: 'Играчка 🧸', type: 'want' },
  { name: 'Вода 💧', type: 'need' }, { name: 'Бонбони 🍬', type: 'want' },
  { name: 'Зимно яке 🧥', type: 'need' }, { name: 'Стикери ⭐', type: 'want' },
  { name: 'Лекарства 💊', type: 'need' }, { name: 'Видео игра 🎮', type: 'want' },
  { name: 'Обувки 👟', type: 'need' }, { name: 'Балони 🎈', type: 'want' },
];

export default function NeedsWants({ groupColor }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const handleAnswer = (answer) => {
    const correct = ITEMS[current].type === answer;
    if (correct) setScore(s => s + 1);
    setFeedback(correct ? '✅ Правилно!' : `❌ ${ITEMS[current].type === 'need' ? 'Това е НУЖДА!' : 'Това е ЖЕЛАНИЕ!'}`);
    setTimeout(() => {
      setFeedback(null);
      if (current + 1 >= ITEMS.length) setDone(true);
      else setCurrent(c => c + 1);
    }, 1200);
  };

  const restart = () => { setCurrent(0); setScore(0); setFeedback(null); setDone(false); };

  return (
    <GameShell title="Какво ми трябва?" icon="💭" groupColor={groupColor}
      instructions="За всяко нещо реши — НУЖДА е или ЖЕЛАНИЕ? Натисни правилния бутон!">
      {() => done ? (
        <GameResults score={score} maxScore={ITEMS.length} groupColor={groupColor} onRestart={restart} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '0.5rem' }}>{current + 1} / {ITEMS.length}</p>
          <motion.div key={current} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            style={{ fontSize: '3rem', marginBottom: '1.5rem', padding: '2rem', background: '#f8f8f8', borderRadius: '20px' }}>
            {ITEMS[current].name}
          </motion.div>
          {feedback ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
              {feedback}
            </motion.p>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer('need')}
                style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', fontWeight: 700, border: 'none', borderRadius: '12px', background: '#22C55E', color: '#fff', cursor: 'pointer' }}>
                ✅ НУЖДА
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer('want')}
                style={{ padding: '1rem 2.5rem', fontSize: '1.2rem', fontWeight: 700, border: 'none', borderRadius: '12px', background: '#F59E0B', color: '#fff', cursor: 'pointer' }}>
                ⭐ ЖЕЛАНИЕ
              </motion.button>
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
