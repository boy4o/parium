import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const ASSETS = [
  { name: 'S&P 500 ETF', emoji: '📊', risk: 'medium', yearReturn: () => -10 + Math.random() * 30 },
  { name: 'Облигации', emoji: '📜', risk: 'low', yearReturn: () => 1 + Math.random() * 5 },
  { name: 'Злато', emoji: '🥇', risk: 'medium', yearReturn: () => -5 + Math.random() * 15 },
  { name: 'Крипто', emoji: '₿', risk: 'high', yearReturn: () => -40 + Math.random() * 100 },
  { name: 'Имоти (REIT)', emoji: '🏠', risk: 'medium', yearReturn: () => 2 + Math.random() * 12 },
];

export default function Portfolio({ groupColor, isDark }) {
  const [allocs, setAllocs] = useState([30, 20, 15, 10, 25]);
  const [done, setDone] = useState(false);
  const [results, setResults] = useState(null);
  const total = allocs.reduce((s, v) => s + v, 0);

  const update = (i, v) => { const n = [...allocs]; n[i] = v; setAllocs(n); };
  const invest = () => {
    const invested = 10000;
    const yearResults = ASSETS.map((a, i) => {
      const amount = invested * (allocs[i] / 100);
      const ret = a.yearReturn();
      return { name: a.name, emoji: a.emoji, invested: amount, returnPct: +ret.toFixed(1), final: +(amount * (1 + ret/100)).toFixed(2) };
    });
    const totalFinal = yearResults.reduce((s, r) => s + r.final, 0);
    setResults({ yearResults, totalFinal, profit: +(totalFinal - invested).toFixed(2) });
    setDone(true);
  };
  const restart = () => { setAllocs([30, 20, 15, 10, 25]); setDone(false); setResults(null); };

  return (
    <GameShell title="Инвестиционен портфейл" icon="💼" groupColor={groupColor} isDark={isDark}
      instructions="Имаш 10 000€ виртуални. Разпредели ги между различни активи и виж какъв е резултатът след 1 година!">
      {() => done && results ? (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            {results.yearResults.map((r, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem', marginBottom: '0.3rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '8px' }}>
                <span>{r.emoji} {r.name} ({r.invested.toFixed(0)}€)</span>
                <span style={{ fontWeight: 700, color: r.returnPct >= 0 ? '#16A34A' : '#EF4444' }}>
                  {r.returnPct >= 0 ? '+' : ''}{r.returnPct}% → {r.final.toFixed(0)}€
                </span>
              </div>
            ))}
          </div>
          <GameResults score={results.profit > 500 ? 10 : results.profit > 0 ? 7 : 3} maxScore={10} groupColor={groupColor} onRestart={restart}
            message={`Крайна стойност: ${results.totalFinal.toFixed(2)}€. ${results.profit >= 0 ? `Печалба: +${results.profit.toFixed(2)}€ 📈` : `Загуба: ${results.profit.toFixed(2)}€ 📉`}. Опитай различни разпределения!`} />
        </div>
      ) : (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontWeight: 700, color: total === 100 ? '#16A34A' : '#EF4444' }}>
              Общо: {total}% {total !== 100 && `(трябва 100%)`}
            </span>
          </div>
          {ASSETS.map((a, i) => (
            <div key={a.name} style={{ marginBottom: '0.6rem', padding: '0.6rem', background: isDark ? '#1E293B' : '#f8f8f8', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{a.emoji} {a.name} <span style={{ fontSize: '0.75rem', color: a.risk === 'high' ? '#EF4444' : a.risk === 'medium' ? '#F59E0B' : '#16A34A' }}>({a.risk})</span></span>
                <span style={{ fontWeight: 700, color: groupColor }}>{allocs[i]}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={allocs[i]} onChange={e => update(i, +e.target.value)}
                style={{ width: '100%', accentColor: groupColor }} />
            </div>
          ))}
          <button onClick={invest} disabled={total !== 100}
            style={{ width: '100%', padding: '1rem', background: total === 100 ? groupColor : '#888', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: total === 100 ? 'pointer' : 'default' }}>
            📈 Инвестирай!
          </button>
        </div>
      )}
    </GameShell>
  );
}
