import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const CATS = [
  { name: 'Храна', emoji: '🍎', min: 30, max: 150 },
  { name: 'Транспорт', emoji: '🚌', min: 0, max: 80 },
  { name: 'Забавления', emoji: '🎮', min: 0, max: 120 },
  { name: 'Дрехи', emoji: '👕', min: 0, max: 100 },
  { name: 'Абонаменти', emoji: '📱', min: 0, max: 50 },
  { name: 'Спестявания', emoji: '💰', min: 0, max: 200 },
];
const INCOME = 500;

export default function MyBudget({ groupColor, isDark }) {
  const [values, setValues] = useState([80, 30, 40, 20, 10, 100]);
  const [done, setDone] = useState(false);
  const total = values.reduce((s, v) => s + v, 0);
  const remaining = INCOME - total;
  const savingsRate = Math.round((values[5] / INCOME) * 100);
  const score = remaining >= 0 ? (savingsRate >= 20 ? 10 : savingsRate >= 10 ? 7 : 4) : 1;

  const update = (i, v) => { const n = [...values]; n[i] = v; setValues(n); };
  const restart = () => { setValues([80, 30, 40, 20, 10, 100]); setDone(false); };

  return (
    <GameShell title="Моят месечен бюджет" icon="💰" groupColor={groupColor} isDark={isDark}
      instructions={`Имаш ${INCOME}€ джобни/стипендия на месец. Разпредели ги умно по категории!`}>
      {() => done ? (
        <GameResults score={score} maxScore={10} groupColor={groupColor} onRestart={restart}
          message={remaining >= 0 ? `Спестявания: ${values[5]}€ (${savingsRate}%). ${savingsRate >= 20 ? 'Перфектно! Спазваш правилото 50/30/20!' : 'Добре, но опитай да спестиш поне 20%.'}` : `Бюджетът е надхвърлен с ${Math.abs(remaining)}€!`} />
      ) : (
        <div>
          <div style={{ background: remaining >= 0 ? (isDark ? '#064E3B' : '#DCFCE7') : (isDark ? '#7F1D1D' : '#FEE2E2'), padding: '1rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center' }}>
            <span style={{ fontWeight: 700 }}>{remaining >= 0 ? `✅ Остават: ${remaining}€` : `❌ Дефицит: ${Math.abs(remaining)}€`}</span>
          </div>
          {CATS.map((cat, i) => (
            <div key={cat.name} style={{ marginBottom: '0.8rem', padding: '0.6rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>{cat.emoji} {cat.name}</span>
                <span style={{ fontWeight: 700, color: groupColor }}>{values[i]}€</span>
              </div>
              <input type="range" min={cat.min} max={cat.max} step={5} value={values[i]}
                onChange={e => update(i, +e.target.value)} style={{ width: '100%', accentColor: groupColor }} />
            </div>
          ))}
          <button onClick={() => setDone(true)} disabled={remaining < 0}
            style={{ width: '100%', padding: '1rem', background: remaining >= 0 ? groupColor : '#888', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: remaining >= 0 ? 'pointer' : 'default' }}>
            ✅ Потвърди
          </button>
        </div>
      )}
    </GameShell>
  );
}
