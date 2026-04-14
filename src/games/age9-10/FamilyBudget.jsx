import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const CATEGORIES = [
  { name: 'Жилище', emoji: '🏠', min: 200, max: 600, recommended: 400 },
  { name: 'Храна', emoji: '🍎', min: 100, max: 500, recommended: 350 },
  { name: 'Сметки', emoji: '🔌', min: 80, max: 250, recommended: 150 },
  { name: 'Транспорт', emoji: '🚗', min: 30, max: 200, recommended: 100 },
  { name: 'Забавления', emoji: '🎭', min: 0, max: 300, recommended: 100 },
  { name: 'Спестявания', emoji: '💰', min: 0, max: 500, recommended: 200 },
];
const INCOME = 1800;

export default function FamilyBudget({ groupColor }) {
  const [values, setValues] = useState(CATEGORIES.map(c => c.recommended));
  const [done, setDone] = useState(false);
  const total = values.reduce((s, v) => s + v, 0);
  const remaining = INCOME - total;

  const update = (i, val) => { const next = [...values]; next[i] = val; setValues(next); };
  const finish = () => setDone(true);
  const restart = () => { setValues(CATEGORIES.map(c => c.recommended)); setDone(false); };

  const savingsPercent = Math.round((values[5] / INCOME) * 100);
  const score = remaining >= 0 ? (savingsPercent >= 15 ? 10 : savingsPercent >= 10 ? 7 : 5) : 2;

  return (
    <GameShell title="Семейният бюджет" icon="📊" groupColor={groupColor}
      instructions={`Семейство Петрови печели ${INCOME}€/мес. Разпредели парите по категории! Бюджетът не може да надхвърли дохода.`}>
      {() => done ? (
        <GameResults score={score} maxScore={10} groupColor={groupColor} onRestart={restart}
          message={remaining >= 0 ? `Бюджет: ${total}€, Спестявания: ${values[5]}€ (${savingsPercent}%). ${savingsPercent >= 15 ? 'Отлично управление!' : 'Опитай да спестиш повече!'}` : `Бюджетът надхвърля дохода с ${Math.abs(remaining)}€! Трябва да намалиш разходите.`} />
      ) : (
        <div>
          <div style={{ background: remaining >= 0 ? '#DCFCE7' : '#FEE2E2', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', textAlign: 'center' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
              {remaining >= 0 ? `✅ Остават: ${remaining}€` : `❌ Надхвърлен с: ${Math.abs(remaining)}€`}
            </span>
            <span style={{ display: 'block', fontSize: '0.85rem', color: '#666' }}>Доход: {INCOME}€ | Разходи: {total}€</span>
          </div>
          {CATEGORIES.map((cat, i) => (
            <div key={cat.name} style={{ marginBottom: '1rem', padding: '0.8rem', background: '#f8f8f8', borderRadius: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600 }}>{cat.emoji} {cat.name}</span>
                <span style={{ fontWeight: 700, color: groupColor }}>{values[i]}€</span>
              </div>
              <input type="range" min={cat.min} max={cat.max} step={10} value={values[i]}
                onChange={e => update(i, +e.target.value)}
                style={{ width: '100%', accentColor: groupColor }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#aaa' }}>
                <span>{cat.min}€</span><span>{cat.max}€</span>
              </div>
            </div>
          ))}
          <motion.button whileHover={{ scale: 1.02 }} onClick={finish} disabled={remaining < 0}
            style={{ width: '100%', padding: '1rem', background: remaining >= 0 ? groupColor : '#ccc', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: remaining >= 0 ? 'pointer' : 'default' }}>
            ✅ Потвърди бюджета
          </motion.button>
        </div>
      )}
    </GameShell>
  );
}
