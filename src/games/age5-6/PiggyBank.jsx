import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

export default function PiggyBank({ groupColor }) {
  const [coins, setCoins] = useState(0);
  const [total, setTotal] = useState(0);
  const goal = 5;
  const [done, setDone] = useState(false);

  const addCoin = (value) => {
    const newTotal = +(total + value).toFixed(2);
    setTotal(newTotal);
    setCoins(c => c + 1);
    if (newTotal >= goal) setDone(true);
  };

  const restart = () => { setCoins(0); setTotal(0); setDone(false); };

  const percent = Math.min((total / goal) * 100, 100);

  return (
    <GameShell title="Касичката на ФинДо" icon="🐷" groupColor={groupColor}
      instructions="Пълни касичката с монети! Целта ти е да събереш 5.00€. Кликай на монетите!">
      {() => done ? (
        <GameResults score={coins} maxScore={coins} groupColor={groupColor} onRestart={restart}
          message={`Ура! 🎉 Събра ${total.toFixed(2)}€ с ${coins} монети! Касичката е пълна!`} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
            style={{ fontSize: '5rem', marginBottom: '1rem' }}>🐷</motion.div>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: groupColor }}>{total.toFixed(2)}€ / {goal.toFixed(2)}€</p>
          <div style={{ width: '100%', height: '20px', background: '#E5E7EB', borderRadius: '99px', margin: '1rem 0', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${percent}%` }} style={{ height: '100%', background: groupColor, borderRadius: '99px' }} />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' }}>{coins} монети пуснати</p>
          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{v: 0.10, l: '10¢'}, {v: 0.20, l: '20¢'}, {v: 0.50, l: '50¢'}, {v: 1, l: '1€'}, {v: 2, l: '2€'}].map(c => (
              <motion.button key={c.v} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => addCoin(c.v)}
                style={{ width: '70px', height: '70px', borderRadius: '50%', border: `3px solid ${groupColor}`, background: groupColor + '15', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', color: '#333' }}>
                {c.l}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
