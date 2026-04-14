import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const STOCKS = [
  { name: 'TechCorp', emoji: '💻', basePrice: 50, volatility: 0.08 },
  { name: 'FoodInc', emoji: '🍎', basePrice: 25, volatility: 0.03 },
  { name: 'GreenEnergy', emoji: '🌱', basePrice: 35, volatility: 0.06 },
];

function genPrices(stock, days) {
  const prices = [stock.basePrice];
  for (let i = 1; i < days; i++) {
    const change = (Math.random() - 0.48) * stock.volatility * prices[i-1];
    prices.push(Math.max(1, +(prices[i-1] + change).toFixed(2)));
  }
  return prices;
}

export default function StockMarket({ groupColor, isDark }) {
  const [cash, setCash] = useState(1000);
  const [portfolio, setPortfolio] = useState({});
  const [day, setDay] = useState(0);
  const [prices, setPrices] = useState(() => STOCKS.map(s => genPrices(s, 30)));
  const [done, setDone] = useState(false);
  const totalDays = 30;

  const buy = (idx) => {
    const price = prices[idx][day];
    if (cash >= price) {
      setCash(c => +(c - price).toFixed(2));
      setPortfolio(p => ({ ...p, [idx]: (p[idx] || 0) + 1 }));
    }
  };
  const sell = (idx) => {
    if ((portfolio[idx] || 0) > 0) {
      setCash(c => +(c + prices[idx][day]).toFixed(2));
      setPortfolio(p => ({ ...p, [idx]: p[idx] - 1 }));
    }
  };
  const nextDay = () => {
    if (day + 1 >= totalDays) setDone(true);
    else setDay(d => d + 1);
  };

  const portfolioValue = Object.entries(portfolio).reduce((sum, [idx, qty]) => sum + (prices[idx]?.[day] || 0) * qty, 0);
  const totalValue = +(cash + portfolioValue).toFixed(2);
  const profit = +(totalValue - 1000).toFixed(2);
  const restart = () => { setCash(1000); setPortfolio({}); setDay(0); setPrices(STOCKS.map(s => genPrices(s, 30))); setDone(false); };

  return (
    <GameShell title="Фондовата борса" icon="📈" groupColor={groupColor} isDark={isDark}
      instructions="Имаш 1000€ виртуални. Купувай и продавай акции за 30 дни! Целта: направи повече от 1000€.">
      {() => done ? (
        <GameResults score={profit > 100 ? 10 : profit > 0 ? 7 : 3} maxScore={10} groupColor={groupColor} onRestart={restart}
          message={`Крайна стойност: ${totalValue}€. ${profit >= 0 ? `Печалба: +${profit}€! 📈` : `Загуба: ${profit}€ 📉`}`} />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', padding: '0.8rem', background: isDark ? '#1E293B' : '#f0f9ff', borderRadius: '10px', fontSize: '0.9rem' }}>
            <span>📅 Ден {day + 1}/{totalDays}</span>
            <span>💵 Кеш: {cash.toFixed(2)}€</span>
            <span>💼 Портфейл: {portfolioValue.toFixed(2)}€</span>
            <span style={{ fontWeight: 700, color: totalValue >= 1000 ? '#16A34A' : '#EF4444' }}>Общо: {totalValue.toFixed(2)}€</span>
          </div>
          {STOCKS.map((stock, idx) => {
            const price = prices[idx][day];
            const prev = day > 0 ? prices[idx][day-1] : price;
            const change = +(price - prev).toFixed(2);
            const owned = portfolio[idx] || 0;
            return (
              <div key={idx} style={{ padding: '0.8rem', marginBottom: '0.5rem', background: isDark ? '#1E293B' : '#fff', border: `1px solid ${isDark ? '#334155' : '#E5E7EB'}`, borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '1.2rem' }}>{stock.emoji}</span>
                    <strong style={{ marginLeft: '0.5rem' }}>{stock.name}</strong>
                    <span style={{ marginLeft: '0.5rem', color: '#888' }}>×{owned}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700 }}>{price.toFixed(2)}€</div>
                    <div style={{ fontSize: '0.8rem', color: change >= 0 ? '#16A34A' : '#EF4444' }}>
                      {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(2)}€
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button onClick={() => buy(idx)} disabled={cash < price}
                    style={{ flex: 1, padding: '0.4rem', background: cash >= price ? '#16A34A' : '#ccc', color: '#fff', border: 'none', borderRadius: '6px', cursor: cash >= price ? 'pointer' : 'default', fontWeight: 600 }}>
                    Купи
                  </button>
                  <button onClick={() => sell(idx)} disabled={owned === 0}
                    style={{ flex: 1, padding: '0.4rem', background: owned > 0 ? '#EF4444' : '#ccc', color: '#fff', border: 'none', borderRadius: '6px', cursor: owned > 0 ? 'pointer' : 'default', fontWeight: 600 }}>
                    Продай
                  </button>
                </div>
              </div>
            );
          })}
          <motion.button whileHover={{ scale: 1.02 }} onClick={nextDay}
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
            ⏩ Следващ ден
          </motion.button>
        </div>
      )}
    </GameShell>
  );
}
