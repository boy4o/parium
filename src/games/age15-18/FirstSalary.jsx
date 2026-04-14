import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const CATS = [
  { name: 'Наем', emoji: '🏠', min: 200, max: 500 },
  { name: 'Храна', emoji: '🍎', min: 100, max: 400 },
  { name: 'Сметки', emoji: '🔌', min: 50, max: 200 },
  { name: 'Транспорт', emoji: '🚌', min: 0, max: 150 },
  { name: 'Забавления', emoji: '🎭', min: 0, max: 200 },
  { name: 'Дрехи', emoji: '👕', min: 0, max: 100 },
  { name: 'Абонаменти', emoji: '📱', min: 0, max: 50 },
  { name: 'Спестявания', emoji: '💰', min: 0, max: 400 },
];
const NET = 1200;

export default function FirstSalary({ groupColor, isDark }) {
  const [vals, setVals] = useState([350, 250, 120, 50, 80, 30, 15, 240]);
  const [done, setDone] = useState(false);
  const total = vals.reduce((s, v) => s + v, 0);
  const rem = NET - total;
  const savRate = Math.round((vals[7] / NET) * 100);
  const score = rem >= 0 ? (savRate >= 20 ? 10 : savRate >= 10 ? 7 : 4) : 1;
  const update = (i, v) => { const n = [...vals]; n[i] = v; setVals(n); };
  const restart = () => { setVals([350, 250, 120, 50, 80, 30, 15, 240]); setDone(false); };

  return (
    <GameShell title="Първата заплата" icon="💼" groupColor={groupColor} isDark={isDark}
      instructions={`Получаваш ${NET}€ нето заплата. Разпредели парите умно — и не забравяй спестяванията!`}>
      {() => done ? (
        <GameResults score={score} maxScore={10} groupColor={groupColor} onRestart={restart}
          message={rem >= 0 ? `Спестявания: ${vals[7]}€ (${savRate}%). ${savRate >= 20 ? 'Перфектно управление!' : 'Опитай поне 20% спестявания.'}` : `Дефицит ${Math.abs(rem)}€! Намали разходите.`} />
      ) : (
        <div>
          <div style={{ background: rem >= 0 ? (isDark ? '#064E3B' : '#DCFCE7') : (isDark ? '#7F1D1D' : '#FEE2E2'), padding: '0.8rem', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center', fontWeight: 700 }}>
            {rem >= 0 ? `✅ Остават: ${rem}€` : `❌ Дефицит: ${Math.abs(rem)}€`}
          </div>
          {CATS.map((c, i) => (
            <div key={c.name} style={{ marginBottom: '0.6rem', padding: '0.5rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span>{c.emoji} {c.name}</span><span style={{ fontWeight: 700, color: groupColor }}>{vals[i]}€</span>
              </div>
              <input type="range" min={c.min} max={c.max} step={5} value={vals[i]} onChange={e => update(i, +e.target.value)}
                style={{ width: '100%', accentColor: groupColor }} />
            </div>
          ))}
          <button onClick={() => setDone(true)} disabled={rem < 0}
            style={{ width: '100%', padding: '1rem', background: rem >= 0 ? groupColor : '#888', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: rem >= 0 ? 'pointer' : 'default' }}>
            ✅ Потвърди бюджета
          </button>
        </div>
      )}
    </GameShell>
  );
}
