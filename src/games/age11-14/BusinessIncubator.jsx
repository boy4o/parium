import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const STEPS = [
  { title: '1. Избери продукт', options: [
    { name: '🧁 Домашни кексчета', cost: 2, price: 5, demand: 'high' },
    { name: '🎨 Направи картичка', cost: 0.5, price: 3, demand: 'medium' },
    { name: '💻 Уеб дизайн', cost: 0, price: 15, demand: 'low' },
  ]},
  { title: '2. Избери локация', options: [
    { name: '🏫 Пред училище', rent: 0, traffic: 'high' },
    { name: '🏪 Онлайн (Instagram)', rent: 0, traffic: 'medium' },
    { name: '🏬 Наем на щанд на базар', rent: 20, traffic: 'very high' },
  ]},
  { title: '3. Маркетинг', options: [
    { name: '📱 Социални мрежи (безплатно)', cost: 0, reach: 50 },
    { name: '📄 Листовки (5€)', cost: 5, reach: 100 },
    { name: '🎨 Плакат + листовки (10€)', cost: 10, reach: 200 },
  ]},
];

export default function BusinessIncubator({ groupColor, isDark }) {
  const [step, setStep] = useState(0);
  const [choices, setChoices] = useState([]);
  const [done, setDone] = useState(false);

  const choose = (idx) => {
    const next = [...choices, idx];
    setChoices(next);
    if (next.length >= STEPS.length) setDone(true);
    else setStep(s => s + 1);
  };

  const restart = () => { setStep(0); setChoices([]); setDone(false); };

  const calcResults = () => {
    if (choices.length < 3) return {};
    const product = STEPS[0].options[choices[0]];
    const location = STEPS[1].options[choices[1]];
    const marketing = STEPS[2].options[choices[2]];
    const demandMultiplier = { high: 20, medium: 12, low: 5 };
    const trafficMultiplier = { 'very high': 1.5, high: 1.2, medium: 0.8 };
    const sales = Math.round(demandMultiplier[product.demand] * trafficMultiplier[location.traffic] * (1 + marketing.reach / 200));
    const revenue = sales * product.price;
    const costs = sales * product.cost + location.rent + marketing.cost;
    const profit = revenue - costs;
    return { sales, revenue, costs, profit, product, location, marketing };
  };

  return (
    <GameShell title="Бизнес инкубаторът" icon="🚀" groupColor={groupColor} isDark={isDark}
      instructions="Създай свой бизнес! Избери продукт, локация и маркетинг стратегия — виж дали ще сте на печалба!">
      {() => done ? (() => {
        const r = calcResults();
        const score = r.profit > 50 ? 10 : r.profit > 20 ? 7 : r.profit > 0 ? 5 : 2;
        return (
          <div>
            <div style={{ background: isDark ? '#1E293B' : '#f8f8f8', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem' }}>
              <h3 style={{ marginBottom: '1rem' }}>📊 Резултати от бизнеса:</h3>
              <p>📦 Продажби: <strong>{r.sales} бр.</strong></p>
              <p>💵 Приходи: <strong style={{ color: '#16A34A' }}>{r.revenue.toFixed(2)}€</strong></p>
              <p>💸 Разходи: <strong style={{ color: '#EF4444' }}>{r.costs.toFixed(2)}€</strong></p>
              <p style={{ fontSize: '1.3rem', marginTop: '0.5rem' }}>
                {r.profit >= 0 ? '📈' : '📉'} Печалба: <strong style={{ color: r.profit >= 0 ? '#16A34A' : '#EF4444' }}>{r.profit.toFixed(2)}€</strong>
              </p>
            </div>
            <GameResults score={score} maxScore={10} groupColor={groupColor} onRestart={restart}
              message={r.profit > 50 ? 'Отличен бизнес! Високи продажби и добра печалба!' : r.profit > 0 ? 'На печалба си! Опитай различни комбинации за по-добър резултат.' : 'На загуба... Опитай различен продукт или маркетинг!'} />
          </div>
        );
      })() : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>Стъпка {step + 1} от {STEPS.length}</p>
          <h3 style={{ marginBottom: '1rem' }}>{STEPS[step].title}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {STEPS[step].options.map((opt, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02 }} onClick={() => choose(i)}
                style={{ padding: '1.2rem', border: `2px solid ${groupColor}`, borderRadius: '12px', background: isDark ? '#1E293B' : '#fff', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: '1rem', color: isDark ? '#E2E8F0' : '#333' }}>
                {opt.name}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
