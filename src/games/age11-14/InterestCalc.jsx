import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell from '../shared/GameShell';

export default function InterestCalc({ groupColor, isDark }) {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(10);

  const compoundData = [];
  const simpleData = [];
  let compound = principal;
  for (let y = 0; y <= years; y++) {
    compoundData.push(Math.round(compound));
    simpleData.push(Math.round(principal + principal * (rate/100) * y));
    compound *= (1 + rate/100);
  }
  const maxVal = Math.max(...compoundData, ...simpleData);
  const rule72 = Math.round(72 / rate);

  return (
    <GameShell title="Лихвеният калкулатор" icon="📈" groupColor={groupColor} isDark={isDark}
      instructions="Виж как парите ти растат! Промени сумата, лихвата и годините и наблюдавай магията на сложната лихва.">
      {() => (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Начална сума</label>
              <input type="number" min={100} max={100000} step={100} value={principal} onChange={e => setPrincipal(+e.target.value)}
                style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '2px solid ' + groupColor, fontSize: '1rem', textAlign: 'center', background: isDark ? '#1E293B' : '#fff', color: isDark ? '#E2E8F0' : '#333' }} />
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{principal}€</span>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Лихва %</label>
              <input type="range" min={1} max={20} value={rate} onChange={e => setRate(+e.target.value)}
                style={{ width: '100%', accentColor: groupColor }} />
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{rate}%</span>
            </div>
            <div>
              <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>Години</label>
              <input type="range" min={1} max={30} value={years} onChange={e => setYears(+e.target.value)}
                style={{ width: '100%', accentColor: groupColor }} />
              <span style={{ fontSize: '0.8rem', color: '#888' }}>{years} г.</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: isDark ? '#064E3B' : '#DCFCE7', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.8rem' }}>Сложна лихва</p>
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#16A34A' }}>{compoundData[years].toLocaleString()}€</p>
            </div>
            <div style={{ padding: '1rem', background: isDark ? '#1E293B' : '#F1F5F9', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.8rem' }}>Проста лихва</p>
              <p style={{ fontSize: '1.3rem', fontWeight: 700 }}>{simpleData[years].toLocaleString()}€</p>
            </div>
            <div style={{ padding: '1rem', background: isDark ? '#312E81' : '#EDE9FE', borderRadius: '12px' }}>
              <p style={{ fontSize: '0.8rem' }}>Правило 72</p>
              <p style={{ fontSize: '1.3rem', fontWeight: 700, color: '#7C3AED' }}>~{rule72} г.</p>
              <p style={{ fontSize: '0.7rem' }}>за удвояване</p>
            </div>
          </div>

          <div style={{ background: isDark ? '#1E293B' : '#f8f8f8', padding: '1rem', borderRadius: '12px' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>📊 Растеж по години:</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '150px' }}>
              {compoundData.map((val, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                  <motion.div initial={{ height: 0 }} animate={{ height: `${(val / maxVal) * 120}px` }}
                    transition={{ delay: i * 0.05 }}
                    style={{ width: '100%', background: groupColor, borderRadius: '4px 4px 0 0', minHeight: '4px' }} />
                  {i % Math.ceil(years / 6) === 0 && <span style={{ fontSize: '0.6rem', marginTop: '2px' }}>{i}г</span>}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem', color: '#888' }}>
              <span>Год. 0: {principal.toLocaleString()}€</span>
              <span>Год. {years}: {compoundData[years].toLocaleString()}€</span>
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: '#888' }}>
            💡 Разлика: сложна лихва дава <strong>{(compoundData[years] - simpleData[years]).toLocaleString()}€</strong> повече от проста!
          </p>
        </div>
      )}
    </GameShell>
  );
}
