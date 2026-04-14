import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AGE_GROUPS } from '../data/ageGroups';
import './AgeGroup.css';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function AgeGroup() {
  const { slug } = useParams();
  const group = AGE_GROUPS.find(g => g.slug === slug);
  if (!group) return <div className="container section"><h2>Групата не е намерена</h2><Link to="/">← Начало</Link></div>;

  const isDark = group.isDark;
  const level1Games = group.games.filter(g => !g.level || g.level === 1);
  const level2Games = group.games.filter(g => g.level === 2);

  return (
    <div className={`age-page ${isDark ? 'dark-mode' : ''}`} style={{ '--gp': group.colorPrimary, '--gs': group.colorSecondary, '--gbg': group.colorBg, '--gt': group.colorText, '--gtag': group.colorTag }}>

      <div className="container back-nav">
        <Link to="/" className="back-link">← Обратно към всички групи</Link>
      </div>

      {/* Hero */}
      <section className="age-hero" style={{ background: isDark ? `linear-gradient(135deg, ${group.colorBg}, #1E293B)` : `linear-gradient(135deg, ${group.colorBg}, ${group.colorBg}dd)` }}>
        <div className="container age-hero-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="hero-badge" style={{ background: `${group.colorPrimary}22`, borderColor: `${group.colorPrimary}44`, color: isDark ? group.colorPrimary : group.colorTag }}>
              <span>{group.emoji}</span> Група {group.name}
            </div>
            <h1 style={{ color: isDark ? '#F1F5F9' : group.colorText }} dangerouslySetInnerHTML={{ __html: group.heroTitle.replace('<span>', `<span style="color:${group.colorPrimary}">`) }} />
            <p style={{ color: isDark ? '#94A3B8' : group.colorText + 'cc' }}>{group.heroDesc}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
            {isDark
              ? <div style={{ fontSize: '5rem', textAlign: 'center', animation: 'float 4s ease-in-out infinite' }}>{group.emoji}</div>
              : <img src="/findo.png" alt="ФинДо" className="age-hero-mascot" style={{ opacity: group.id === '11-14' ? 0.8 : 1 }} />
            }
          </motion.div>
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section" id="topics">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2>📚 {group.id === '15-18' || group.id === '11-14' ? 'Образователни модули' : 'Какво ще научиш?'}</h2>
            <p>{group.topics.length} теми, специално подбрани за теб!</p>
          </motion.div>
          <motion.div className="topics-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            {group.topics.map((topic) => (
              <motion.div key={topic.id} variants={fadeUp} transition={{ duration: 0.4 }}>
                <Link to={`/grupa/${slug}/tema/${topic.id}`} className="topic-card"
                  style={{ display: 'block' }}>
                  <span className="topic-card-number">{String(topic.id).padStart(2, '0')}</span>
                  <div className="topic-card-icon">{topic.icon}</div>
                  <h3>{topic.title}</h3>
                  <p>{topic.desc}</p>
                  <div className="topic-card-meta">
                    <span>{topic.format}</span>
                    <span>⏱️ {topic.time}</span>
                    {topic.difficulty && <span>{topic.difficulty}</span>}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Games */}
      <section className="games-section" id="games">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2>🎮 {group.id === '15-18' || group.id === '11-14' ? 'Симулации' : 'Игри за теб!'}</h2>
          </motion.div>

          {level2Games.length > 0 && <h3 className="level-label">📗 Ниво 1 — Основи</h3>}
          <motion.div className="games-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
            {level1Games.map((game) => (
              <motion.div key={game.id} className="game-card" data-difficulty={game.difficulty} variants={fadeUp} transition={{ duration: 0.4 }}
                whileHover={{ y: -6, boxShadow: isDark ? '0 10px 30px rgba(0,245,212,0.15)' : '0 20px 50px rgba(0,0,0,0.12)' }}>
                <Link to={`/grupa/${slug}/igra/${game.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="game-card-preview">
                    <span style={{ fontSize: '3.5rem' }}>{game.icon}</span>
                    <span className="game-badge">{game.difficulty === 'easy' ? 'Лесно' : game.difficulty === 'medium' ? 'Средно' : 'Трудно'}</span>
                  </div>
                  <div className="game-card-body">
                    <h3>{game.title}</h3>
                    <p>{game.desc}</p>
                  </div>
                  <div className="game-card-footer">
                    <span className="game-duration">⏱️ {game.duration}</span>
                    <span className="game-play-btn">▶ {group.id.startsWith('1') ? 'Стартирай' : 'Играй!'}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {level2Games.length > 0 && (
            <>
              <h3 className="level-label" style={{ marginTop: '3rem' }}>📕 Ниво 2 — Напреднали</h3>
              <motion.div className="games-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={stagger}>
                {level2Games.map((game) => (
                  <motion.div key={game.id} className="game-card" data-difficulty={game.difficulty} variants={fadeUp} transition={{ duration: 0.4 }}
                    whileHover={{ y: -6, boxShadow: isDark ? '0 10px 30px rgba(0,245,212,0.15)' : '0 20px 50px rgba(0,0,0,0.12)' }}>
                    <Link to={`/grupa/${slug}/igra/${game.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                      <div className="game-card-preview">
                        <span style={{ fontSize: '3.5rem' }}>{game.icon}</span>
                        <span className="game-badge" style={game.isPro ? { background: 'linear-gradient(135deg, #00F5D4, #6366F1)' } : {}}>
                          {game.isPro ? 'PRO' : 'Трудно'}
                        </span>
                      </div>
                      <div className="game-card-body">
                        <h3>{game.title}</h3>
                        <p>{game.desc}</p>
                      </div>
                      <div className="game-card-footer">
                        <span className="game-duration">⏱️ {game.duration}</span>
                        <span className="game-play-btn">▶ Стартирай</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      <footer className="age-footer">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem' }}>
          <span>© 2026 ПариУМ. Парите обичат умните!</span>
          <Link to="/" style={{ color: isDark ? '#00F5D4' : 'var(--brand-primary)', fontWeight: 600 }}>← Начална страница</Link>
        </div>
      </footer>
    </div>
  );
}
