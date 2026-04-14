import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const COINS = [
  { id: 1, value: 0.01, label: '1 цент', color: '#CD7F32' },
  { id: 2, value: 0.02, label: '2 цента', color: '#CD7F32' },
  { id: 3, value: 0.05, label: '5 цента', color: '#CD7F32' },
  { id: 4, value: 0.10, label: '10 цента', color: '#FFD700' },
  { id: 5, value: 0.20, label: '20 цента', color: '#FFD700' },
  { id: 6, value: 0.50, label: '50 цента', color: '#FFD700' },
  { id: 7, value: 1.00, label: '1 евро', color: '#C0C0C0' },
  { id: 8, value: 2.00, label: '2 евро', color: '#C0C0C0' },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function SortCoins({ groupColor }) {
  const [shuffled, setShuffled] = useState(() => shuffle(COINS));
  const [sorted, setSorted] = useState([]);
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const handleClick = (coin) => {
    const expected = COINS[sorted.length];
    if (coin.id === expected.id) {
      const newSorted = [...sorted, coin];
      setSorted(newSorted);
      setShuffled(s => s.filter(c => c.id !== coin.id));
      if (newSorted.length === COINS.length) {
        setScore(8);
        setDone(true);
      }
    }
  };

  const restart = () => { setShuffled(shuffle(COINS)); setSorted([]); setDone(false); setScore(0); };

  return (
    <GameShell title="Сортирай монетите" icon="🪙" groupColor={groupColor}
      instructions="Подреди евро монетите от най-малката до най-голямата стойност! Кликни на правилната монета.">
      {({ setPhase }) => done ? (
        <GameResults score={score} maxScore={8} groupColor={groupColor} onRestart={restart}
          message="Браво! Подреди всички монети правилно! 🎉" />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
            Избери монетата с <strong>следващата най-малка стойност</strong>:
          </p>
          <div style={{ marginBottom: '2rem', padding: '1rem', background: '#f0f9ff', borderRadius: '12px', minHeight: '60px' }}>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Подредени ({sorted.length}/8):</p>
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              {sorted.map(c => (
                <span key={c.id} style={{ background: c.color, color: '#fff', padding: '0.4rem 0.8rem', borderRadius: '99px', fontSize: '0.9rem', fontWeight: 600 }}>
                  {c.label}
                </span>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {shuffled.map(coin => (
              <motion.button key={coin.id} onClick={() => handleClick(coin)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid ' + coin.color, background: coin.color + '22', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, color: '#333' }}>
                <span style={{ fontSize: '1.5rem' }}>🪙</span>
                {coin.label}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
