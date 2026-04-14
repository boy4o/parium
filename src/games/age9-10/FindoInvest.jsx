import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const OPTIONS = [
  { name: 'Спестовна сметка', emoji: '🏦', risk: 'Нисък', returnY1: 2, returnY3: 6.1, desc: 'Безрисково, но нисък доход. 2% годишно.' },
  { name: 'Акции на технологична компания', emoji: '📈', risk: 'Висок', returnY1: 25, returnY3: -10, desc: 'Може много да спечелиш, но може и да загубиш.' },
  { name: 'Държавни облигации', emoji: '📜', risk: 'Нисък', returnY1: 4, returnY3: 12.5, desc: 'Стабилен, предвидим доход. 4% годишно.' },
];

export default function FindoInvest({ groupColor }) {
  const [choice, setChoice] = useState(null);
  const [year, setYear] = useState(0);
  const amount = 100;

  const restart = () => { setChoice(null); setYear(0); };

  return (
    <GameShell title="Инвестицията на ФинДо" icon="📊" groupColor={groupColor}
      instructions="ФинДо има 100€ за инвестиране. Избери един от 3 варианта и виж какво ще стане!">
      {() => choice === null ? (
        <div>
          <p style={{ textAlign: 'center', marginBottom: '1rem', fontWeight: 600 }}>ФинДо има 100€. Къде да ги инвестира?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {OPTIONS.map((opt, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02 }} onClick={() => setChoice(i)}
                style={{ padding: '1.2rem', border: `2px solid ${groupColor}`, borderRadius: '12px', background: '#fff', cursor: 'pointer', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '2rem' }}>{opt.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700 }}>{opt.name}</div>
                    <span style={{ fontSize: '0.85rem', color: opt.risk === 'Висок' ? '#DC2626' : '#16A34A', fontWeight: 600 }}>Риск: {opt.risk}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>{opt.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{OPTIONS[choice].emoji}</div>
          <h3>{OPTIONS[choice].name}</h3>
          <div style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: '16px', margin: '1rem 0' }}>
            {year === 0 && (
              <div>
                <p>Начална сума: <strong>100€</strong></p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setYear(1)}
                  style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
                  ⏩ След 1 година
                </motion.button>
              </div>
            )}
            {year === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: OPTIONS[choice].returnY1 >= 0 ? '#16A34A' : '#DC2626' }}>
                  {(amount + OPTIONS[choice].returnY1).toFixed(2)}€
                </p>
                <p>{OPTIONS[choice].returnY1 >= 0 ? '📈' : '📉'} {OPTIONS[choice].returnY1 > 0 ? '+' : ''}{OPTIONS[choice].returnY1}€ ({OPTIONS[choice].returnY1}%)</p>
                <motion.button whileHover={{ scale: 1.05 }} onClick={() => setYear(3)}
                  style={{ marginTop: '1rem', padding: '0.8rem 2rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 700 }}>
                  ⏩ След 3 години
                </motion.button>
              </motion.div>
            )}
            {year === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: OPTIONS[choice].returnY3 >= 0 ? '#16A34A' : '#DC2626' }}>
                  {(amount + OPTIONS[choice].returnY3).toFixed(2)}€
                </p>
                <p>{OPTIONS[choice].returnY3 >= 0 ? '📈' : '📉'} {OPTIONS[choice].returnY3 > 0 ? '+' : ''}{OPTIONS[choice].returnY3}€</p>
                <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                  {choice === 0 && 'Спестовната сметка е безопасна и предвидима. Парите растат бавно, но сигурно!'}
                  {choice === 1 && 'Акциите са рисковани! Може да спечелиш много, но може и да загубиш. Затова — диверсифицирай!'}
                  {choice === 2 && 'Облигациите са стабилни и предвидими. Добър баланс между риск и доходност!'}
                </p>
                <GameResults score={choice === 2 ? 10 : choice === 0 ? 7 : 5} maxScore={10} groupColor={groupColor} onRestart={restart}
                  message={choice === 2 ? 'Отличен избор! Баланс между риск и доходност.' : choice === 0 ? 'Безопасен избор! Но може би облигациите биха дали повече.' : 'Рисково! Виждаш, че акциите могат да паднат. Диверсифицирай!'} />
              </motion.div>
            )}
          </div>
        </div>
      )}
    </GameShell>
  );
}
