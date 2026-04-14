import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AGE_GROUPS } from '../data/ageGroups';
import { LESSONS } from '../data/lessons';
import './TopicPage.css';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function TopicPage() {
  const { slug, topicId } = useParams();
  const group = AGE_GROUPS.find(g => g.slug === slug);
  if (!group) return <div className="container section"><h2>Групата не е намерена</h2></div>;

  const topic = group.topics.find(t => t.id === parseInt(topicId));
  if (!topic) return <div className="container section"><h2>Темата не е намерена</h2></div>;

  const lessonKey = `${slug}-${topicId}`;
  const lesson = LESSONS[lessonKey];
  const isDark = group.isDark;

  const nextTopic = group.topics.find(t => t.id === topic.id + 1);
  const prevTopic = group.topics.find(t => t.id === topic.id - 1);

  return (
    <div className={`topic-page ${isDark ? 'dark-mode' : ''}`} style={{ '--gp': group.colorPrimary, '--gs': group.colorSecondary, '--gbg': group.colorBg, '--gt': group.colorText }}>

      <div className="container back-nav" style={{ paddingTop: '1rem' }}>
        <Link to={`/grupa/${slug}`} className="back-link">← {group.name} ({group.ageRange})</Link>
      </div>

      {/* Topic Hero */}
      <section className="topic-hero" style={{ background: isDark ? `linear-gradient(135deg, ${group.colorBg}, #1E293B)` : `linear-gradient(135deg, ${group.colorBg}, white)` }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="topic-hero-meta">
              <span className="topic-number">Тема {topic.id} от {group.topics.length}</span>
              <span className="topic-time">⏱️ {topic.time}</span>
              {topic.difficulty && <span className="topic-difficulty">{topic.difficulty}</span>}
            </div>
            <div className="topic-hero-icon">{topic.icon}</div>
            <h1 style={{ color: isDark ? '#F1F5F9' : group.colorText }}>{topic.title}</h1>
            <p className="topic-hero-desc" style={{ color: isDark ? '#94A3B8' : group.colorText + 'bb' }}>{topic.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Lesson Content */}
      <section className="lesson-content">
        <div className="container lesson-container">
          {lesson ? (
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              {lesson.sections.map((section, i) => (
                <motion.div key={i} className={`lesson-block lesson-block-${section.type}`} variants={fadeUp} transition={{ duration: 0.4 }}>

                  {section.type === 'intro' && (
                    <div className="lesson-intro">
                      <div className="lesson-mascot-bubble">
                        <img src="/findo.png" alt="ФинДо" className="lesson-mascot-small" />
                        <div className="speech-bubble">
                          <p>{section.text}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.type === 'text' && (
                    <div className="lesson-text">
                      {section.title && <h2>{section.title}</h2>}
                      {section.paragraphs.map((p, j) => <p key={j}>{p}</p>)}
                    </div>
                  )}

                  {section.type === 'highlight' && (
                    <div className="lesson-highlight" style={{ borderLeftColor: group.colorPrimary, background: group.colorBg }}>
                      <span className="highlight-icon">{section.icon || '💡'}</span>
                      <div>
                        {section.title && <strong>{section.title}</strong>}
                        <p>{section.text}</p>
                      </div>
                    </div>
                  )}

                  {section.type === 'list' && (
                    <div className="lesson-list">
                      {section.title && <h3>{section.title}</h3>}
                      <ul>
                        {section.items.map((item, j) => (
                          <li key={j}>
                            <span className="list-emoji">{item.emoji}</span>
                            <div>
                              <strong>{item.label}</strong>
                              {item.desc && <span> — {item.desc}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {section.type === 'quiz' && <QuizBlock quiz={section} groupColor={group.colorPrimary} />}

                  {section.type === 'funfact' && (
                    <div className="lesson-funfact">
                      <span className="funfact-emoji">🤓</span>
                      <div>
                        <strong>Знаеш ли, че…</strong>
                        <p>{section.text}</p>
                      </div>
                    </div>
                  )}

                  {section.type === 'activity' && (
                    <div className="lesson-activity" style={{ borderColor: group.colorPrimary }}>
                      <h3>🎯 {section.title || 'Задача за теб!'}</h3>
                      <p>{section.text}</p>
                      {section.steps && (
                        <ol>
                          {section.steps.map((s, j) => <li key={j}>{s}</li>)}
                        </ol>
                      )}
                    </div>
                  )}

                  {section.type === 'summary' && (
                    <div className="lesson-summary" style={{ background: group.colorBg }}>
                      <h3>📝 Какво научи?</h3>
                      <ul>{section.points.map((p, j) => <li key={j}>✅ {p}</li>)}</ul>
                    </div>
                  )}

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="lesson-coming-soon">
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
              <h2>Скоро!</h2>
              <p>Съдържанието за тази тема се подготвя. Върни се пак скоро!</p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="topic-nav">
        <div className="container topic-nav-inner">
          {prevTopic ? (
            <Link to={`/grupa/${slug}/tema/${prevTopic.id}`} className="topic-nav-btn prev">
              <span className="topic-nav-dir">← Предишна</span>
              <span className="topic-nav-name">{prevTopic.icon} {prevTopic.title}</span>
            </Link>
          ) : <div />}
          {nextTopic ? (
            <Link to={`/grupa/${slug}/tema/${nextTopic.id}`} className="topic-nav-btn next">
              <span className="topic-nav-dir">Следваща →</span>
              <span className="topic-nav-name">{nextTopic.icon} {nextTopic.title}</span>
            </Link>
          ) : (
            <Link to={`/grupa/${slug}`} className="topic-nav-btn next">
              <span className="topic-nav-dir">Към групата →</span>
              <span className="topic-nav-name">Всички теми</span>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

// Quiz Component
function QuizBlock({ quiz, groupColor }) {

  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  const handleSelect = (idx) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
  };

  const isCorrect = selected === quiz.correct;

  return (
    <div className="lesson-quiz">
      <h3>❓ {quiz.question}</h3>
      <div className="quiz-options">
        {quiz.options.map((opt, i) => (
          <button key={i} className={`quiz-option ${revealed ? (i === quiz.correct ? 'correct' : i === selected ? 'wrong' : '') : ''} ${selected === i ? 'selected' : ''}`}
            onClick={() => handleSelect(i)} disabled={revealed}>
            <span className="quiz-letter">{String.fromCharCode(65 + i)}</span>
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <motion.div className={`quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <span>{isCorrect ? '🎉' : '😅'}</span>
          <p>{isCorrect ? (quiz.correctMsg || 'Браво! Правилно!') : (quiz.wrongMsg || `Не съвсем. Правилният отговор е "${quiz.options[quiz.correct]}".`)}</p>
        </motion.div>
      )}
    </div>
  );
}
