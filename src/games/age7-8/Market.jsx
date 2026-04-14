import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const SHOPPING_LIST = [
  { name: 'Хляб', emoji: '🍞', price: 1.00 }, { name: 'Мляко', emoji: '🥛', price: 1.50 },
  { name: 'Яйца', emoji: '🥚', price: 2.50 }, { name: 'Масло', emoji: '🧈', price: 2.00 },
  { name: 'Сирене', emoji: '🧀', price: 3.50 }, { name: 'Домати', emoji: '🍅', price: 1.80 },
];
const BUDGET = 10;

export default function Market({ groupColor }) {
  const [bought, setBought] = useState([]);
  const [done, setDone] = useState(false);
  const spent = bought.reduce((s, i) => s + i.price, 0);
  const remaining = +(BUDGET - spent).toFixed(2);
  const allBought = bought.length === SHOPPING_LIST.length;

  const buy = (item) => {
    if (!bought.find(b => b.name === item.name) && remaining >= item.price) {
      const next = [...bought, item];
      setBought(next);
      if (next.length === SHOPPING_LIST.length) setDone(true);
    }
  };
  const restart = () => { setBought([]); setDone(false); };

  return (
    <GameShell title="Пазарът" icon="🛒" groupColor={groupColor}
      instructions={`Имаш ${BUDGET}€ и списък с ${SHOPPING_LIST.length} продукта. Купи ВСИЧКИ, без да надхвърлиш бюджета! Ще успееш ли?`}>
      {() => done ? (
        <GameResults score={bought.length} maxScore={SHOPPING_LIST.length} groupColor={groupColor} onRestart={restart}
          message={`Купи всичко за ${spent.toFixed(2)}€! Остават ${remaining.toFixed(2)}€. Браво! 🎉`} />
      ) : (
        <div>
          <div style={{ background: groupColor + '15', padding: '1rem', borderRadius: '12px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontWeight: 700 }}>💰 {remaining.toFixed(2)}€ остават</span>
            <span>✅ {bought.length}/{SHOPPING_LIST.length}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
            {SHOPPING_LIST.map((item) => {
              const isBought = bought.find(b => b.name === item.name);
              const canAfford = remaining >= item.price;
              return (
                <motion.button key={item.name} whileHover={!isBought && canAfford ? { scale: 1.03 } : {}} whileTap={!isBought && canAfford ? { scale: 0.97 } : {}}
                  onClick={() => buy(item)} disabled={!!isBought || !canAfford}
                  style={{ padding: '1.2rem', border: `2px solid ${isBought ? '#22C55E' : canAfford ? groupColor : '#ddd'}`, borderRadius: '12px', background: isBought ? '#DCFCE7' : '#fff', cursor: isBought || !canAfford ? 'default' : 'pointer', textAlign: 'center', opacity: !canAfford && !isBought ? 0.4 : 1 }}>
                  <div style={{ fontSize: '2rem' }}>{item.emoji}</div>
                  <div style={{ fontWeight: 600 }}>{item.name}</div>
                  <div style={{ color: groupColor, fontWeight: 700 }}>{item.price.toFixed(2)}€</div>
                  {isBought && <div style={{ color: '#22C55E', fontWeight: 700, marginTop: '0.3rem' }}>✅ Купено</div>}
                </motion.button>
              );
            })}
          </div>
          {!allBought && remaining < Math.min(...SHOPPING_LIST.filter(i => !bought.find(b => b.name === i.name)).map(i => i.price)) && (
            <p style={{ textAlign: 'center', color: '#EF4444', fontWeight: 600, marginTop: '1rem' }}>
              ⚠️ Недостатъчно пари за останалите! Опитай пак.
              <button onClick={restart} style={{ display: 'block', margin: '1rem auto', padding: '0.5rem 2rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>🔄 Отново</button>
            </p>
          )}
        </div>
      )}
    </GameShell>
  );
}
