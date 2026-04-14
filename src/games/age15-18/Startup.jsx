import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const EVENTS = [
  { month: 1, text: '📰 Местен вестник пише за бизнеса ти!', effect: { customers: 5, revenue: 200 } },
  { month: 2, text: '⚡ Цената на тока се увеличи!', effect: { costs: 50 } },
  { month: 3, text: '🌟 Клиент остави 5-звезден отзив!', effect: { customers: 8, revenue: 300 } },
  { month: 4, text: '🏗️ Ремонт на улицата — по-малко клиенти.', effect: { customers: -3, revenue: -100 } },
  { month: 5, text: '📱 Направи Instagram и получи поръчки!', effect: { customers: 10, revenue: 400 } },
  { month: 6, text: '🏖️ Лято — клиентите са на почивка.', effect: { customers: -5, revenue: -200 } },
];

export default function Startup({ groupColor, isDark }) {
  const [month, setMonth] = useState(0);
  const [cash, setCash] = useState(2000);
  const [customers, setCustomers] = useState(10);
  const [monthlyRev, setMonthlyRev] = useState(500);
  const [monthlyCost, setMonthlyCost] = useState(350);
  const [log, setLog] = useState([]);
  const [done, setDone] = useState(false);
  const [choices, setChoices] = useState([]);

  const nextMonth = (investChoice) => {
    let rev = monthlyRev;
    let cost = monthlyCost;
    let cust = customers;
    const event = EVENTS[month];

    if (event) {
      if (event.effect.customers) cust = Math.max(0, cust + event.effect.customers);
      if (event.effect.revenue) rev += event.effect.revenue;
      if (event.effect.costs) cost += event.effect.costs;
    }
    if (investChoice === 'marketing') { cost += 100; rev += 150; cust += 3; }
    if (investChoice === 'quality') { cost += 50; rev += 80; cust += 1; }

    const profit = rev - cost;
    const newCash = +(cash + profit).toFixed(2);
    setLog(l => [...l, { month: month + 1, rev, cost, profit, cash: newCash, event: event?.text }]);
    setCash(newCash);
    setCustomers(cust);
    setMonthlyRev(rev);
    setMonthlyCost(cost);
    setChoices(c => [...c, investChoice]);

    if (month + 1 >= 6 || newCash <= 0) setDone(true);
    else setMonth(m => m + 1);
  };
  const restart = () => { setMonth(0); setCash(2000); setCustomers(10); setMonthlyRev(500); setMonthlyCost(350); setLog([]); setDone(false); setChoices([]); };

  return (
    <GameShell title="Стартъп" icon="🚀" groupColor={groupColor} isDark={isDark}
      instructions="Управлявай стартъп за 6 месеца! Начален капитал: 2000€. Преживей и бъди на печалба!">
      {() => done ? (
        <div>
          <div style={{ marginBottom: '1rem', padding: '1rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '12px' }}>
            {log.map((l, i) => (
              <div key={i} style={{ marginBottom: '0.5rem', padding: '0.5rem', borderBottom: '1px solid #E5E7EB55' }}>
                <strong>Месец {l.month}:</strong> {l.event && <span style={{ fontSize: '0.85rem' }}>{l.event}</span>}
                <div style={{ fontSize: '0.85rem', display: 'flex', gap: '1rem' }}>
                  <span style={{ color: '#16A34A' }}>+{l.rev}€</span>
                  <span style={{ color: '#EF4444' }}>-{l.cost}€</span>
                  <span style={{ fontWeight: 700, color: l.profit >= 0 ? '#16A34A' : '#EF4444' }}>{l.profit >= 0 ? '+' : ''}{l.profit}€</span>
                </div>
              </div>
            ))}
          </div>
          <GameResults score={cash > 2000 ? 10 : cash > 0 ? 6 : 2} maxScore={10} groupColor={groupColor} onRestart={restart}
            message={cash > 2000 ? `Крайно салдо: ${cash.toFixed(2)}€. Страхотен бизнес! 📈` : cash > 0 ? `Оцеля с ${cash.toFixed(2)}€, но може по-добре.` : 'Бизнесът фалира... Опитай различна стратегия!'} />
        </div>
      ) : (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
            <div style={{ padding: '0.6rem', background: isDark ? '#1E293B' : '#f0f9ff', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.7rem' }}>Каса</p><p style={{ fontWeight: 700, color: cash >= 0 ? '#16A34A' : '#EF4444' }}>{cash.toFixed(0)}€</p>
            </div>
            <div style={{ padding: '0.6rem', background: isDark ? '#1E293B' : '#f0f9ff', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.7rem' }}>Клиенти</p><p style={{ fontWeight: 700 }}>{customers}</p>
            </div>
            <div style={{ padding: '0.6rem', background: isDark ? '#1E293B' : '#f0f9ff', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.7rem' }}>Месец</p><p style={{ fontWeight: 700 }}>{month + 1}/6</p>
            </div>
          </div>
          {EVENTS[month] && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: '0.8rem', background: isDark ? '#312E81' : '#FEF3C7', borderRadius: '10px', marginBottom: '1rem', textAlign: 'center', fontWeight: 600 }}>
              {EVENTS[month].text}
            </motion.div>
          )}
          <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: '0.8rem' }}>Какво да направиш този месец?</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { id: 'none', label: '⏸️ Нищо специално', desc: 'Пести и продължи.' },
              { id: 'marketing', label: '📢 Инвестирай в маркетинг (+100€)', desc: 'Повече клиенти и приходи.' },
              { id: 'quality', label: '✨ Подобри качеството (+50€)', desc: 'По-доволни клиенти.' },
            ].map(c => (
              <motion.button key={c.id} whileHover={{ scale: 1.02 }} onClick={() => nextMonth(c.id)}
                style={{ padding: '1rem', border: `2px solid ${groupColor}`, borderRadius: '10px', background: isDark ? '#1E293B' : '#fff', cursor: 'pointer', textAlign: 'left', color: isDark ? '#E2E8F0' : '#333' }}>
                <strong>{c.label}</strong><p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>{c.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
