import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const PRODUCTS = [
  { name: 'Хляб', emoji: '🍞', price: 1.00 }, { name: 'Мляко', emoji: '🥛', price: 1.50 },
  { name: 'Банани', emoji: '🍌', price: 1.80 }, { name: 'Шоколад', emoji: '🍫', price: 1.00 },
  { name: 'Сокче', emoji: '🧃', price: 0.80 }, { name: 'Ябълки', emoji: '🍎', price: 1.20 },
  { name: 'Тетрадка', emoji: '📒', price: 0.50 }, { name: 'Кифла', emoji: '🧁', price: 0.60 },
];
const BUDGET = 5;

export default function FindoShop({ groupColor }) {
  const [cart, setCart] = useState([]);
  const [done, setDone] = useState(false);
  const spent = cart.reduce((s, i) => s + i.price, 0);
  const remaining = +(BUDGET - spent).toFixed(2);

  const addToCart = (product) => {
    if (spent + product.price <= BUDGET) setCart([...cart, product]);
  };
  const removeFromCart = (idx) => setCart(cart.filter((_, i) => i !== idx));
  const finish = () => setDone(true);
  const restart = () => { setCart([]); setDone(false); };

  return (
    <GameShell title="Магазинчето на ФинДо" icon="🏪" groupColor={groupColor}
      instructions={`Имаш ${BUDGET}€! Купи продукти от магазина, без да надхвърлиш бюджета. Кликни на продукт за да го добавиш.`}>
      {() => done ? (
        <GameResults score={cart.length} maxScore={PRODUCTS.length} groupColor={groupColor} onRestart={restart}
          message={`Купи ${cart.length} неща за ${spent.toFixed(2)}€! Остатък: ${remaining.toFixed(2)}€. Добро пазаруване! 🛒`} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', padding: '1rem', background: groupColor + '15', borderRadius: '12px' }}>
            <span style={{ fontWeight: 700 }}>💰 Бюджет: {remaining.toFixed(2)}€</span>
            <span style={{ fontWeight: 600 }}>🛒 Кошница: {cart.length}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.8rem', marginBottom: '1.5rem' }}>
            {PRODUCTS.map((p, i) => (
              <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => addToCart(p)} disabled={remaining < p.price}
                style={{ padding: '1rem', border: `2px solid ${remaining >= p.price ? groupColor : '#ddd'}`, borderRadius: '12px', background: '#fff', cursor: remaining >= p.price ? 'pointer' : 'not-allowed', opacity: remaining >= p.price ? 1 : 0.5, textAlign: 'center' }}>
                <div style={{ fontSize: '2rem' }}>{p.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{p.name}</div>
                <div style={{ color: groupColor, fontWeight: 700 }}>{p.price.toFixed(2)}€</div>
              </motion.button>
            ))}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: '1rem', background: '#f8f8f8', borderRadius: '12px', marginBottom: '1rem' }}>
              <strong>Кошница:</strong>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {cart.map((item, i) => (
                  <span key={i} onClick={() => removeFromCart(i)} style={{ background: '#fff', border: '1px solid #ddd', borderRadius: '8px', padding: '0.3rem 0.6rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    {item.emoji} {item.price.toFixed(2)}€ ✕
                  </span>
                ))}
              </div>
              <p style={{ marginTop: '0.5rem', fontWeight: 600 }}>Общо: {spent.toFixed(2)}€</p>
            </div>
          )}
          <button onClick={finish} style={{ width: '100%', padding: '1rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, cursor: 'pointer' }}>
            ✅ Приключи пазаруването
          </button>
        </div>
      )}
    </GameShell>
  );
}
