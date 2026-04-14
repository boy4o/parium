import { useState } from 'react';
import { motion } from 'framer-motion';
import GameShell, { GameResults } from '../shared/GameShell';

const SCENARIOS = [
  {
    title: 'Преговори за заплата',
    situation: 'Получаваш оферта за работа: 1000€ нето. Знаеш, че средната заплата за позицията е 1200€. Какво правиш?',
    options: [
      { text: 'Приемам веднага — страхувам се да не загубя офертата.', points: 1, feedback: 'Загуби потенциално 200€/месец = 2400€/година!' },
      { text: 'Казвам: „Благодаря! По мои проучвания средната за позицията е 1200€. Бихте ли обмислили?"', points: 3, feedback: 'Перфектно! Учтиво, обосновано, професионално.' },
      { text: 'Искам 1500€ — ако не дадат, аз не работя!', points: 1, feedback: 'Прекалено агресивно — може да загубиш офертата.' },
    ],
  },
  {
    title: 'Връщане на повреден продукт',
    situation: 'Купи лаптоп за 600€ онлайн. Пристига с драскотина на екрана. Магазинът казва: „Не можем да помогнем."',
    options: [
      { text: 'Казвам: „Съгласно ЗЗП имам право на замяна или ремонт в 2-годишна гаранция."', points: 3, feedback: 'Отлично! Познаваш правата си и ги ползваш учтиво.' },
      { text: 'Приемам — може би аз го повредих...', points: 0, feedback: 'Не! Имаш законно право на замяна при фабричен дефект.' },
      { text: 'Крещя на оператора по телефона.', points: 1, feedback: 'Агресията нe помага. Права + спокойствие = резултат.' },
    ],
  },
  {
    title: 'Наемодател вдига наема',
    situation: 'Наемодателят иска да вдигне наема от 300€ на 380€ (+27%). Договорът позволява увеличение „при инфлация".',
    options: [
      { text: 'Казвам: „Инфлацията тази година е 5%, не 27%. Приемам увеличение до 315€."', points: 3, feedback: 'Отлично! Обосновано с факти и реалистично контра-предложение.' },
      { text: 'Приемам — нядам къде да отида.', points: 0, feedback: 'Винаги имаш право да преговаряш! Не приемай без опит.' },
      { text: 'Заплашвам, че ще го съдя.', points: 1, feedback: 'Заплахите рядко работят. Факти + диалог = резултат.' },
    ],
  },
  {
    title: 'Купуване на кола',
    situation: 'Искаш да купиш употребявана кола. Продавачът иска 5000€. Колата е на 8 години с 150 000 км.',
    options: [
      { text: 'Казвам: „Направих проучване — подобни коли се продават за 3800-4200€. Мога да предложа 4000€."', points: 3, feedback: 'Проучването е твоето оръжие! Факти = сила в преговорите.' },
      { text: 'Давам 5000€ — продавачът знае по-добре.', points: 0, feedback: 'Винаги преговаряй! Продавачът ОЧАКВА да се пазариш.' },
      { text: 'Предлагам 2500€ — ще видим какво ще каже.', points: 1, feedback: 'Прекалено ниска оферта може да обиди продавача и да прекрати разговора.' },
    ],
  },
];

export default function Negotiate({ groupColor, isDark }) {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [done, setDone] = useState(false);

  const s = SCENARIOS[round];
  const answer = (opt) => {
    setScore(sc => sc + opt.points);
    setFeedback(opt.feedback);
  };
  const next = () => {
    setFeedback(null);
    if (round + 1 >= SCENARIOS.length) setDone(true);
    else setRound(r => r + 1);
  };
  const restart = () => { setRound(0); setScore(0); setFeedback(null); setDone(false); };

  return (
    <GameShell title="Преговорите" icon="🤝" groupColor={groupColor} isDark={isDark}
      instructions="Упражни уменията си за преговори! Избери най-умния отговор за всяка ситуация.">
      {() => done ? (
        <GameResults score={score} maxScore={SCENARIOS.length * 3} groupColor={groupColor} onRestart={restart}
          message={score >= 10 ? 'Ти си истински преговорен гений! Знаеш правата си и ги отстояваш учтиво.' : score >= 6 ? 'Добър преговарящ! Опитай пак за перфектен резултат.' : 'Имаш какво да научиш — но всеки големец е започнал от нулата!'} />
      ) : (
        <div>
          <p style={{ color: '#888', textAlign: 'center' }}>{round + 1} / {SCENARIOS.length}</p>
          <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>{s.title}</h3>
          <motion.div key={round} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ background: isDark ? '#1E293B' : '#f8f8f8', padding: '1.2rem', borderRadius: '12px', marginBottom: '1rem', lineHeight: 1.6 }}>
            {s.situation}
          </motion.div>
          {feedback ? (
            <div style={{ textAlign: 'center' }}>
              <p style={{ padding: '1rem', background: isDark ? '#312E81' : '#EDE9FE', borderRadius: '12px', fontWeight: 600, marginBottom: '1rem' }}>
                💡 {feedback}
              </p>
              <button onClick={next} style={{ padding: '0.8rem 2rem', background: groupColor, color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer' }}>
                {round + 1 < SCENARIOS.length ? '➡️ Следващ сценарий' : '📊 Виж резултата'}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {s.options.map((opt, i) => (
                <motion.button key={i} whileHover={{ scale: 1.02 }} onClick={() => answer(opt)}
                  style={{ padding: '1rem', border: `2px solid ${groupColor}`, borderRadius: '10px', background: isDark ? '#1E293B' : '#fff', cursor: 'pointer', textAlign: 'left', fontSize: '0.95rem', fontWeight: 500, color: isDark ? '#E2E8F0' : '#333' }}>
                  {opt.text}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      )}
    </GameShell>
  );
}
