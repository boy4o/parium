import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const ADS = [
  { text: '„САМО ДНЕС! Последни 3 броя! Купи СЕГА!"', trick: 'urgency', trickName: 'Забързване', emoji: '⏰' },
  { text: '„Безплатна доставка при поръчка над 30€!"', trick: 'free', trickName: 'Безплатно', emoji: '🆓' },
  { text: '„Кристиано Роналдо пие тази напитка всеки ден!"', trick: 'celebrity', trickName: 'Знаменитост', emoji: '⭐' },
  { text: '„Всичките ти приятели вече го имат! Не оставай последен!"', trick: 'fomo', trickName: 'Страх от изпускане', emoji: '👫' },
  { text: '„Купи 2, вземи 3! Невероятна оферта!"', trick: 'bundle', trickName: 'Пакетна оферта', emoji: '🔄' },
  { text: '„НАЙ-ДОБРИЯТ шоколад в света! Не е като останалите!"', trick: 'superlative', trickName: 'Преувеличение', emoji: '🎭' },
  { text: '„Само за членове на клуба! Ексклузивна цена: 9.99€!"', trick: 'exclusive', trickName: 'Ексклузивност', emoji: '💎' },
  { text: '„Преди: 50€. Сега: 19.99€! Спестяваш 60%!"', trick: 'anchor', trickName: 'Котва цена', emoji: '⚓' },
];

const TRICKS = ['urgency', 'free', 'celebrity', 'fomo', 'bundle', 'superlative', 'exclusive', 'anchor'];
const TRICK_NAMES = { urgency: 'Забързване', free: 'Безплатно', celebrity: 'Знаменитост', fomo: 'Страх от изпускане', bundle: 'Пакетна оферта', superlative: 'Преувеличение', exclusive: 'Ексклузивност', anchor: 'Котва цена' };

export default function AdDetective({ groupColor }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const ad = ADS[current];
  const options = [ad.trick, ...TRICKS.filter(t => t !== ad.trick).sort(() => Math.random() - 0.5).slice(0, 2)].sort(() => Math.random() - 0.5);

  const answer = (trick) => {
    const correct = trick === ad.trick;
    if (correct) setScore(s => s + 1);
    setFeedback(correct ? `✅ Правилно! Трикът е „${ad.trickName}"` : `❌ Трикът е „${ad.trickName}" ${ad.emoji}`);
    setTimeout(() => {
      setFeedback(null);
      if (current + 1 >= ADS.length) setDone(true);
      else setCurrent(c => c + 1);
    }, 1500);
  };
  const restart = () => { setCurrent(0); setScore(0); setFeedback(null); setDone(false); };

  return (
    <GameShell title="Рекламен детектив" icon="🔍" groupColor={groupColor}
      instructions="Разпознай трика в рекламата! За всяка реклама избери коя манипулативна техника използва.">
      {() => done ? (
        <GameResults score={score} maxScore={ADS.length} groupColor={groupColor} onRestart={restart} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888' }}>{current + 1} / {ADS.length}</p>
          <motion.div key={current} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: '#FEF3C7', padding: '1.5rem', borderRadius: '16px', margin: '1rem 0', fontSize: '1.1rem', fontWeight: 600, lineHeight: 1.6, border: '2px solid #F59E0B' }}>
            📺 {ad.text}
          </motion.div>
          {feedback ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.2rem', fontWeight: 700 }}>{feedback}</motion.p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <p style={{ fontWeight: 600 }}>Какъв трик е използван?</p>
              {options.map(t => (
                <motion.button key={t} whileHover={{ scale: 1.02 }} onClick={() => answer(t)}
                  style={{ padding: '0.8rem', border: `2px solid ${groupColor}`, borderRadius: '10px', background: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}>
                  {TRICK_NAMES[t]}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
