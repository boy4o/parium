import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const GOALS = [
  { name: 'LEGO комплект', emoji: '🧱', price: 20 },
  { name: 'Велосипед', emoji: '🚲', price: 80 },
  { name: 'Книга', emoji: '📚', price: 8 },
  { name: 'Видео игра', emoji: '🎮', price: 40 },
];

export default function SavingPlan({ groupColor }) {
  const [goalIdx, setGoalIdx] = useState(null);
  const [weekly, setWeekly] = useState(2);
  const [saved, setSaved] = useState(0);
  const [week, setWeek] = useState(0);
  const [done, setDone] = useState(false);

  const goal = goalIdx !== null ? GOALS[goalIdx] : null;
  const weeksNeeded = goal ? Math.ceil(goal.price / weekly) : 0;

  const saveWeek = () => {
    const newSaved = +(saved + weekly).toFixed(2);
    setSaved(newSaved);
    setWeek(w => w + 1);
    if (newSaved >= goal.price) setDone(true);
  };
  const restart = () => { setGoalIdx(null); setWeekly(2); setSaved(0); setWeek(0); setDone(false); };

  return (
    <GameShell title="Спестовният план" icon="📋" groupColor={groupColor}
      instructions="Избери цел и направи план за спестяване! Всяка седмица пускай монети в касичката.">
      {() => done ? (
        <GameResults score={week} maxScore={week} groupColor={groupColor} onRestart={restart}
          message={`🎉 Купи си ${goal.emoji} ${goal.name} за ${week} седмици! Спестяването работи!`} />
      ) : goalIdx === null ? (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ marginBottom: '1rem' }}>Избери целта си:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {GOALS.map((g, i) => (
              <motion.button key={i} whileHover={{ scale: 1.05 }} onClick={() => setGoalIdx(i)}
                style={{ padding: '1.5rem', border: `2px solid ${groupColor}`, borderRadius: '16px', background: '#fff', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem' }}>{g.emoji}</div>
                <div style={{ fontWeight: 700 }}>{g.name}</div>
                <div style={{ color: groupColor, fontWeight: 700, fontSize: '1.2rem' }}>{g.price}€</div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{goal.emoji}</div>
          <h3>{goal.name} — {goal.price}€</h3>
          <div style={{ margin: '1rem 0' }}>
            <label style={{ fontWeight: 600 }}>Спестяване на седмица: {weekly}€</label>
            <input type="range" min="1" max="10" value={weekly} onChange={e => setWeekly(+e.target.value)}
              style={{ width: '100%', marginTop: '0.5rem', accentColor: groupColor }} />
            <p style={{ color: '#888', fontSize: '0.9rem' }}>Ще ти трябват {weeksNeeded} седмици</p>
          </div>
          <div style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: groupColor }}>{saved.toFixed(2)}€ / {goal.price}€</p>
            <div style={{ width: '100%', height: '12px', background: '#E5E7EB', borderRadius: '99px', overflow: 'hidden', marginTop: '0.5rem' }}>
              <motion.div animate={{ width: `${Math.min((saved / goal.price) * 100, 100)}%` }}
                style={{ height: '100%', background: groupColor, borderRadius: '99px' }} />
            </div>
            <p style={{ fontSize: '0.85rem', color: '#888', marginTop: '0.5rem' }}>Седмица {week}</p>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={saveWeek}
            style={{ padding: '1rem 3rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>
            💰 Спести {weekly}€ (Седмица {week + 1})
          </motion.button>
        </div>
      )}
    </GameShell>
  );
}
