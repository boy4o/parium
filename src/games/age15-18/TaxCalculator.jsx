import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell from '../shared/GameShell';

export default function TaxCalculator({ groupColor, isDark }) {
  const [bruto, setBruto] = useState(1500);
  const osig = +(bruto * 0.1378).toFixed(2);
  const danOsnova = +(bruto - osig).toFixed(2);
  const ddfl = +(danOsnova * 0.10).toFixed(2);
  const neto = +(bruto - osig - ddfl).toFixed(2);
  const employerOsig = +(bruto * 0.1892).toFixed(2);
  const totalCost = +(bruto + employerOsig).toFixed(2);

  return (
    <GameShell title="Данъчният калкулатор" icon="🧮" groupColor={groupColor} isDark={isDark}
      instructions="Виж как бруто заплатата се превръща в нето! Промени бруто заплатата и наблюдавай.">
      {() => (
        <div>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <label style={{ fontWeight: 700, fontSize: '1.1rem' }}>Бруто заплата:</label>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <input type="range" min={500} max={5000} step={50} value={bruto} onChange={e => setBruto(+e.target.value)}
                style={{ width: '60%', accentColor: groupColor }} />
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: groupColor }}>{bruto}€</span>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            {[
              { label: 'Бруто заплата', val: bruto, color: '#3B82F6', icon: '💰' },
              { label: 'Осигуровки (13.78%)', val: -osig, color: '#EF4444', icon: '🏥' },
              { label: 'Данъчна основа', val: danOsnova, color: '#8B5CF6', icon: '📋' },
              { label: 'ДДФЛ (10%)', val: -ddfl, color: '#EF4444', icon: '🏛️' },
              { label: 'НЕТО заплата', val: neto, color: '#16A34A', icon: '✅', bold: true },
            ].map((row, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', marginBottom: '0.4rem', borderRadius: '10px',
                  background: row.bold ? (isDark ? '#064E3B' : '#DCFCE7') : (isDark ? '#1E293B' : '#f8f8f8'),
                  fontSize: row.bold ? '1.1rem' : '1rem' }}>
                <span style={{ fontWeight: row.bold ? 700 : 500 }}>{row.icon} {row.label}</span>
                <span style={{ fontWeight: 700, color: row.color }}>
                  {row.val >= 0 ? '' : '-'}{Math.abs(row.val).toFixed(2)}€
                </span>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: isDark ? '#312E81' : '#EDE9FE', borderRadius: '12px' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.5rem' }}>👔 Работодателят плаща допълнително:</p>
            <p>Осигуровки от работодател (18.92%): <strong>{employerOsig}€</strong></p>
            <p style={{ marginTop: '0.3rem' }}>Общ разход за работодателя: <strong style={{ color: '#7C3AED' }}>{totalCost}€</strong></p>
          </div>

          <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', textAlign: 'center' }}>
            <div style={{ padding: '0.8rem', background: isDark ? '#1E293B' : '#F1F5F9', borderRadius: '10px' }}>
              <p style={{ fontSize: '0.8rem' }}>Ефективен данък</p>
              <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>{(((bruto-neto)/bruto)*100).toFixed(1)}%</p>
            </div>
            <div style={{ padding: '0.8rem', background: isDark ? '#1E293B' : '#F1F5F9', borderRadius: '10px' }}>
              <p style={{ fontSize: '0.8rem' }}>Нето / Бруто</p>
              <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>{((neto/bruto)*100).toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </GameShell>
  );
}
