import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell from '../shared/GameShell';

export default function CreditOrNot({ groupColor, isDark }) {
  const carPrice = 10000;
  const [savings, setSavings] = useState(200);
  const [creditRate, setCreditRate] = useState(8);
  const [creditYears, setCreditYears] = useState(5);

  const monthlyPayment = (() => {
    const r = creditRate / 100 / 12;
    const n = creditYears * 12;
    return r > 0 ? (carPrice * r * Math.pow(1+r,n)) / (Math.pow(1+r,n)-1) : carPrice / n;
  })();
  const totalCredit = +(monthlyPayment * creditYears * 12).toFixed(2);
  const interestPaid = +(totalCredit - carPrice).toFixed(2);
  const monthsToSave = Math.ceil(carPrice / savings);
  const yearsToSave = (monthsToSave / 12).toFixed(1);

  return (
    <GameShell title="Кредит или не?" icon="🤔" groupColor={groupColor} isDark={isDark}
      instructions="Искаш кола за 10 000€. Кредит или спестяване? Промени параметрите и сравни!">
      {() => (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: isDark ? '#7F1D1D44' : '#FEE2E2', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>💳 Кредит</h3>
              <div style={{ marginBottom: '0.5rem' }}>
                <label style={{ fontSize: '0.8rem' }}>Лихва: {creditRate}%</label>
                <input type="range" min={3} max={20} value={creditRate} onChange={e => setCreditRate(+e.target.value)}
                  style={{ width: '100%', accentColor: '#EF4444' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem' }}>Срок: {creditYears} г.</label>
                <input type="range" min={1} max={10} value={creditYears} onChange={e => setCreditYears(+e.target.value)}
                  style={{ width: '100%', accentColor: '#EF4444' }} />
              </div>
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #fca5a544' }} />
              <p style={{ fontSize: '0.85rem' }}>Месечна вноска: <strong>{monthlyPayment.toFixed(2)}€</strong></p>
              <p style={{ fontSize: '0.85rem' }}>Общо платено: <strong style={{ color: '#EF4444' }}>{totalCredit.toFixed(2)}€</strong></p>
              <p style={{ fontSize: '0.85rem' }}>Лихва: <strong style={{ color: '#EF4444' }}>{interestPaid.toFixed(2)}€</strong></p>
            </div>
            <div style={{ padding: '1rem', background: isDark ? '#064E3B44' : '#DCFCE7', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>💰 Спестяване</h3>
              <div>
                <label style={{ fontSize: '0.8rem' }}>На месец: {savings}€</label>
                <input type="range" min={50} max={500} step={10} value={savings} onChange={e => setSavings(+e.target.value)}
                  style={{ width: '100%', accentColor: '#16A34A' }} />
              </div>
              <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '1px solid #16a34a44' }} />
              <p style={{ fontSize: '0.85rem' }}>Месеци до цел: <strong>{monthsToSave}</strong></p>
              <p style={{ fontSize: '0.85rem' }}>Години: <strong>{yearsToSave}</strong></p>
              <p style={{ fontSize: '0.85rem' }}>Общо платено: <strong style={{ color: '#16A34A' }}>{carPrice}€</strong></p>
              <p style={{ fontSize: '0.85rem' }}>Лихва: <strong style={{ color: '#16A34A' }}>0€</strong></p>
            </div>
          </div>

          <div style={{ padding: '1rem', background: isDark ? '#1E293B' : '#FEF3C7', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.3rem' }}>
              Разлика: {interestPaid.toFixed(2)}€
            </p>
            <p style={{ fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#666' }}>
              С кредит плащаш <strong>{((totalCredit / carPrice) * 100).toFixed(0)}%</strong> от стойността.
              {interestPaid > 1000 && ' ⚠️ Лихвата е повече от 10% от колата!'}
            </p>
          </div>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem', color: isDark ? '#94A3B8' : '#888', lineHeight: 1.6 }}>
            💡 Кредитът ти дава колата ВЕДНАГА, но плащаш повече. Спестяването е по-евтино, но чакаш. Реши какво е по-важно за теб!
          </p>
        </div>
      )}
    </GameShell>
  );
}
