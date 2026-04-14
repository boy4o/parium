import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const TRANSACTIONS = [
  { desc: 'Заплата', amount: 1200, type: 'income', suspicious: false },
  { desc: 'Наем', amount: -350, type: 'expense', suspicious: false },
  { desc: 'Такса „Обслужване сметка"', amount: -3.50, type: 'fee', suspicious: false },
  { desc: 'Покупка в Lidl', amount: -42.30, type: 'expense', suspicious: false },
  { desc: 'Такса „Известие по СМС"', amount: -0.80, type: 'fee', suspicious: true, reason: 'Скрита такса! Можеш да я спреш от настройки.' },
  { desc: 'Превод от Иван Петров', amount: 50, type: 'income', suspicious: false },
  { desc: 'Такса „Неактивност на карта"', amount: -5, type: 'fee', suspicious: true, reason: 'Фалшива такса! Такава не съществува.' },
  { desc: 'Покупка в Amazon.de', amount: -29.99, type: 'expense', suspicious: false },
  { desc: 'Застраховка „Gold Premium Plus"', amount: -15, type: 'fee', suspicious: true, reason: 'Скрит продукт! Не си го поръчвал.' },
  { desc: 'ATM теглене', amount: -100, type: 'expense', suspicious: false },
  { desc: 'Такса „Минимален баланс"', amount: -2, type: 'fee', suspicious: true, reason: 'Нелегитимна такса! Проверявай условията.' },
  { desc: 'Комунални сметки', amount: -145, type: 'expense', suspicious: false },
];

export default function BankDetective({ groupColor, isDark }) {
  const [flagged, setFlagged] = useState(new Set());
  const [done, setDone] = useState(false);

  const toggle = (i) => {
    const next = new Set(flagged);
    next.has(i) ? next.delete(i) : next.add(i);
    setFlagged(next);
  };

  const suspicious = TRANSACTIONS.map((t, i) => ({ ...t, idx: i })).filter(t => t.suspicious);
  const correctFlags = suspicious.filter(t => flagged.has(t.idx)).length;
  const wrongFlags = [...flagged].filter(i => !TRANSACTIONS[i].suspicious).length;
  const score = Math.max(0, correctFlags * 2 - wrongFlags);
  const restart = () => { setFlagged(new Set()); setDone(false); };

  return (
    <GameShell title="Банковият детектив" icon="🔍" groupColor={groupColor} isDark={isDark}
      instructions="Провери банковото извлечение! Маркирай ПОДОЗРИТЕЛНИТЕ транзакции (скрити такси, нелегитимни разходи).">
      {() => done ? (
        <div>
          <GameResults score={score} maxScore={suspicious.length * 2} groupColor={groupColor} onRestart={restart} />
          <div style={{ marginTop: '1rem', padding: '1rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '12px' }}>
            <h4>Подозрителни транзакции:</h4>
            {suspicious.map(t => (
              <p key={t.idx} style={{ fontSize: '0.9rem', margin: '0.5rem 0' }}>
                🚩 {t.desc}: {t.reason}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>Кликни върху подозрителните транзакции:</p>
          {TRANSACTIONS.map((t, i) => (
            <motion.div key={i} whileTap={{ scale: 0.98 }} onClick={() => toggle(i)}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem', marginBottom: '0.4rem', borderRadius: '8px', cursor: 'pointer',
                background: flagged.has(i) ? (isDark ? '#7F1D1D' : '#FEE2E2') : (isDark ? '#1E293B' : '#fff'),
                border: `2px solid ${flagged.has(i) ? '#EF4444' : (isDark ? '#334155' : '#E5E7EB')}` }}>
              <span style={{ fontWeight: 500 }}>{flagged.has(i) ? '🚩 ' : ''}{t.desc}</span>
              <span style={{ fontWeight: 700, color: t.amount >= 0 ? '#16A34A' : '#EF4444' }}>
                {t.amount >= 0 ? '+' : ''}{t.amount.toFixed(2)}€
              </span>
            </motion.div>
          ))}
          <button onClick={() => setDone(true)}
            style={{ width: '100%', marginTop: '1rem', padding: '1rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}>
            ✅ Провери
          </button>
        </div>
      )}
    </GameShell>
  );
}
