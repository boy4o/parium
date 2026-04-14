import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const ROUNDS = [
  { item: 'Шоколад 🍫', price: 0.90, paid: 1.00, change: 0.10, fake: [0.10, 0.20, 0.05] },
  { item: 'Сокче 🧃', price: 1.20, paid: 2.00, change: 0.80, fake: [0.80, 0.70, 1.20] },
  { item: 'Кифла 🧁', price: 0.60, paid: 1.00, change: 0.40, fake: [0.30, 0.40, 0.50] },
  { item: 'Книга 📚', price: 4.00, paid: 5.00, change: 1.00, fake: [1.00, 0.50, 1.50] },
  { item: 'Тетрадка 📒', price: 0.40, paid: 0.50, change: 0.10, fake: [0.20, 0.10, 0.15] },
  { item: 'Хляб 🍞', price: 0.95, paid: 2.00, change: 1.05, fake: [1.05, 1.10, 0.95] },
  { item: 'Мляко 🥛', price: 1.50, paid: 5.00, change: 3.50, fake: [3.00, 3.50, 4.50] },
  { item: 'Молив ✏️', price: 0.30, paid: 1.00, change: 0.70, fake: [0.60, 0.70, 0.80] },
];

export default function ChangeDetective({ groupColor }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const r = ROUNDS[round];
  const handleAnswer = (val) => {
    const isCorrect = val === r.change;
    if (isCorrect) setScore(s => s + 1);
    setFeedback(isCorrect ? '✅ Правилно!' : `❌ Грешно! Рестото е ${r.change.toFixed(2)}€`);
    setTimeout(() => {
      setFeedback(null);
      if (round + 1 >= ROUNDS.length) setDone(true);
      else setRound(r => r + 1);
    }, 1500);
  };
  const restart = () => { setRound(0); setScore(0); setFeedback(null); setDone(false); };

  return (
    <GameShell title="Ресто детектив" icon="🔍" groupColor={groupColor}
      instructions="Провери дали рестото е правилно! За всяка покупка избери ПРАВИЛНОТО ресто.">
      {() => done ? (
        <GameResults score={score} maxScore={ROUNDS.length} groupColor={groupColor} onRestart={restart} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888', marginBottom: '0.5rem' }}>{round + 1} / {ROUNDS.length}</p>
          <motion.div key={round} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{r.item}</p>
            <p>Цена: <strong>{r.price.toFixed(2)}€</strong></p>
            <p>Платено: <strong>{r.paid.toFixed(2)}€</strong></p>
            <p style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.5rem' }}>Колко е рестото?</p>
          </motion.div>
          {feedback ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.3rem', fontWeight: 700 }}>{feedback}</motion.p>
          ) : (
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {r.fake.map((val, i) => (
                <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(val)}
                  style={{ padding: '1rem 2rem', fontSize: '1.2rem', fontWeight: 700, border: `2px solid ${groupColor}`, borderRadius: '12px', background: '#fff', cursor: 'pointer', minWidth: '100px' }}>
                  {val.toFixed(2)}€
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
