import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const STORY = [
  { text: 'ФинДо намери 5€ на улицата! Какво да направи?', choices: [
    { text: '🐷 Пусна ги в касичката', next: 1, points: 2 },
    { text: '🍬 Купи бонбони', next: 2, points: 0 },
    { text: '🤔 Попита мама какво да направи', next: 3, points: 1 },
  ]},
  { text: 'ФинДо спести 5€. След 2 седмици касичката има вече 8€! Сега иска нова книга за 7€.', choices: [
    { text: '📚 Купи книгата за 7€', next: 4, points: 2 },
    { text: '🎮 Изчака да събере за игра за 20€', next: 5, points: 1 },
  ]},
  { text: 'ФинДо купи бонбони... вкусни, но парите свършиха бързо. На следващия ден приятелят му показа готина игра.', choices: [
    { text: '😢 Няма пари... следващия път ще спести', next: 6, points: 1 },
    { text: '🙏 Помоли мама да я купи', next: 6, points: 0 },
  ]},
  { text: 'Мама каза: „Браво, че попита! Можеш да сложиш 3€ в касичката и да вземеш 2€ за сладолед."', choices: [
    { text: '😊 Супер идея! Направи го.', next: 7, points: 2 },
    { text: '😤 Искам да си харча всичко!', next: 2, points: 0 },
  ]},
  { text: 'ФинДо купи книгата „Приключенията на Пипи" и я прочете 3 пъти! Остана му 1€ в касичката.', choices: [
    { text: '📖 Продължи да чете и спестява', next: 8, points: 2 },
  ]},
  { text: 'ФинДо реши да чака. След 2 месеца събра 20€ и купи играта! Но му отне дълго...', choices: [
    { text: '🎯 Следващия път ще си сложи по-малка цел', next: 8, points: 1 },
  ]},
  { text: 'ФинДо научи важен урок: импулсивното харчене оставя без пари. Следващия път ще помисли!', choices: [
    { text: '💡 Урок научен!', next: 8, points: 1 },
  ]},
  { text: 'ФинДо следва съвета на мама — спестява И се радва малко. Баланс! 🎯', choices: [
    { text: '🌟 Перфектно!', next: 8, points: 2 },
  ]},
  { text: null }, // end
];

export default function FindoStories({ groupColor }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const s = STORY[step];
  const choose = (choice) => {
    setScore(sc => sc + choice.points);
    if (STORY[choice.next].text === null) setDone(true);
    else setStep(choice.next);
  };
  const restart = () => { setStep(0); setScore(0); setDone(false); };

  return (
    <GameShell title="ФинДо разказва" icon="📖" groupColor={groupColor}
      instructions="Помогни на ФинДо да вземе правилните финансови решения! Избери какво да направи.">
      {() => done ? (
        <GameResults score={score} maxScore={10} groupColor={groupColor} onRestart={restart}
          message={score >= 7 ? 'ФинДо е горд с теб! Взе умни решения! 🐬' : score >= 4 ? 'Добре се справи! Пробвай пак за по-добър резултат.' : 'Не се тревожи! Опитай различни избори.'} />
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🐬</div>
          <motion.div key={step} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ background: '#f8f8f8', padding: '1.5rem', borderRadius: '16px', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {s.text}
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {s.choices.map((c, i) => (
              <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => choose(c)}
                style={{ padding: '1rem', border: `2px solid ${groupColor}`, borderRadius: '12px', background: '#fff', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, textAlign: 'left' }}>
                {c.text}
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </GameShell>
  );
}
