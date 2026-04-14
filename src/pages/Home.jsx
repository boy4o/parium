import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AGE_GROUPS } from '../data/ageGroups';
import './Home.css';

const BASE = import.meta.env.BASE_URL;
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

function AgeCard({ group, index }) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }}>
      <Link to={`/grupa/${group.slug}`} className="age-card" data-age={group.id}
        style={{ '--card-primary': group.colorPrimary, '--card-secondary': group.colorSecondary, '--card-bg': group.colorBg, '--card-tag': group.colorTag }}>
        <div className="age-card-stripe" />
        <div className="age-card-header">
          <div className="age-card-icon" style={{ background: group.colorBg }}>{group.emoji}</div>
          <div className="age-card-title">
            <h3>{group.name}</h3>
            <span className="age-range">{group.ageRange}</span>
          </div>
        </div>
        <div className="age-card-body">
          <p>{group.description}</p>
          <div className="age-card-tags">
            {group.tags.map(t => <span key={t} className="age-tag" style={{ background: group.colorBg, color: group.colorTag }}>{t}</span>)}
          </div>
        </div>
        <div className="age-card-footer">
          <span className="age-card-cta" style={{ color: group.colorSecondary || group.colorPrimary }}>
            {group.cta} <span className="arrow">→</span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

const scrollTo = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-orb hero-bg-orb-1" />
        <div className="hero-bg-orb hero-bg-orb-2" />
        <div className="container hero-content">
          <motion.div className="hero-text" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="hero-badge"><span className="emoji">🐬</span> Научи за парите с ФинДо!</div>
            <h1><span className="highlight">Парите</span> обичат<br />умните!</h1>
            <p className="hero-subtitle">Открий света на финансите чрез игри, истории и симулации — специално създадени за деца и тийнейджъри от 5 до 18 години.</p>
            <div className="hero-actions">
              <a href="#groups" onClick={(e) => scrollTo(e, 'groups')} className="btn btn-primary"><span className="btn-icon">🎮</span> Избери своята група</a>
              <a href="#features" onClick={(e) => scrollTo(e, 'features')} className="btn btn-secondary">Научи повече</a>
            </div>
          </motion.div>
          <motion.div className="hero-visual" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <img src={`${BASE}findo.png`} alt="ФинДо — маскотът на ПариУМ" className="hero-mascot" />
            <span className="floating-coin fc-1">🪙</span>
            <span className="floating-coin fc-2">💰</span>
            <span className="floating-coin fc-3">✨</span>
            <span className="floating-coin fc-4">🌟</span>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats section" id="stats">
        <div className="container">
          <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            {[['5', 'Възрастови групи'], ['30', 'Образователни теми'], ['22', 'Интерактивни игри'], ['100%', 'Безплатно']].map(([num, label]) => (
              <motion.div key={label} className="stat-item" variants={fadeUp} transition={{ duration: 0.5 }}>
                <div className="stat-number">{num}</div>
                <div className="stat-label">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="age-groups section" id="groups">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2>Избери своята <span className="text-gradient">възрастова група</span></h2>
            <p>Всяка група предлага съдържание, адаптирано за твоята възраст — от прости игри до сериозни бизнес симулации.</p>
          </motion.div>
          <motion.div className="age-cards-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            {AGE_GROUPS.map((g, i) => <AgeCard key={g.id} group={g} index={i} />)}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features section" id="features">
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2>Как работи <span className="text-gradient">ПариУМ</span>?</h2>
            <p>Платформа, създадена с мисълта за деца — от предучилищна възраст до зрелостен изпит.</p>
          </motion.div>
          <motion.div className="features-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger}>
            {[
              ['📚', 'Учи с ФинДо', 'Интерактивни уроци с илюстрации, анимации и реални примери от ежедневието в България. Цените са в евро (€).'],
              ['🎮', 'Играй и учи', '22 интерактивни игри — от „Магазинчето на ФинДо" до пълни бизнес симулации и борсова търговия.'],
              ['💼', 'Симулирай реалния свят', 'Управлявай бюджет, инвестирай на борсата, стартирай виртуален бизнес — без рискове!'],
              ['🛡️', 'Безопасна среда', 'Без реклами, без лични данни, без регистрация. Проектиран за сигурност на децата.'],
              ['📈', 'Напредвай стъпка по стъпка', 'Всяка тема съдържа въведение, обяснение, куиз и практическа дейност за затвърждаване.'],
              ['🇪🇺', 'Европейски стандарт', 'Всички цени в Евро (€), реалистични за българския пазар. Подготовка за еврозоната!'],
            ].map(([icon, title, desc]) => (
              <motion.div key={title} className="feature-card" variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -6, boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                <div className="feature-icon">{icon}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About FinDo */}
      <section className="about-findo section" id="about">
        <div className="container">
          <div className="about-grid">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2>Запознай се с <span className="text-gradient">ФинДо</span>! 🐬</h2>
              <p>ФинДо е умен и приятелски делфин, който знае всичко за парите. Той ще бъде твой учител, приятел и водач в света на финансите.</p>
              <p>Знаеш ли, че делфините са едни от <strong>най-умните създания</strong> на планетата? Точно като тях, и ти можеш да бъдеш умен с парите!</p>
              <div className="about-badges">
                <span className="about-badge" style={{ background: 'var(--age-5-6-bg)', color: '#B45309' }}>🌱 За малките: пълен с анимации!</span>
                <span className="about-badge" style={{ background: 'var(--age-11-14-bg)', color: '#4338CA' }}>🌳 За тийните: стилизиран помощник</span>
                <span className="about-badge" style={{ background: 'rgba(0,245,212,0.1)', color: '#0D9488' }}>🏔️ За големите: професионален UI</span>
              </div>
            </motion.div>
            <motion.div className="about-mascot" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <img src={`${BASE}findo.png`} alt="ФинДо" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* За нас */}
      <section className="mission section" id="mission" style={{ background: '#F8FAFC' }}>
        <div className="container">
          <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}>
            <h2>Нашата <span className="text-gradient">мисия</span></h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ duration: 0.5 }}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', lineHeight: 1.8, fontSize: '1.05rem', color: '#475569' }}>
            <p style={{ marginBottom: '1rem' }}>
              <strong>ПариУМ</strong> е образователен проект с мисия да подготви децата и тийнейджърите за финансовия свят. Вярваме, че финансовата грамотност не трябва да се учи на 30 — тя трябва да започне от момента, в който детето разбере какво е „купуване".
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Платформата е <strong>100% безплатна</strong>, не събира лични данни, не изисква регистрация и не съдържа реклами. Създадена е от български разработчици с подкрепата на педагози и финансови консултанти.
            </p>
            <p>
              Съдържанието е предназначено единствено за <strong>образователни цели</strong> и не представлява финансов съвет. Всяка инвестиционна информация е симулирана и е с учебна цел.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section section">
        <div className="container cta-content">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2>Готов ли си да станеш<br />умен с парите? 🧠💰</h2>
            <p>Избери своята възрастова група и започни приключението с ФинДо още сега. Безплатно, без регистрация!</p>
            <a href="#groups" onClick={(e) => scrollTo(e, 'groups')} className="btn btn-secondary" style={{ background: 'white', color: 'var(--brand-primary-dark)', border: '2px solid white' }}>
              <span className="btn-icon">🚀</span> Започни сега
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <span className="nav-logo-text" style={{ fontSize: '1.8rem' }}>Пари<span>УМ</span></span>
              <p>Безплатна образователна платформа за финансова грамотност за деца от 5 до 18 години.</p>
            </div>
            <div className="footer-col">
              <h4>Възрастови групи</h4>
              <ul>{AGE_GROUPS.map(g => <li key={g.id}><Link to={`/grupa/${g.slug}`}>{g.emoji} {g.name} ({g.ageRange})</Link></li>)}</ul>
            </div>
            <div className="footer-col">
              <h4>Платформа</h4>
              <ul>
                <li><a href="#features" onClick={(e) => scrollTo(e, 'features')}>Как работи</a></li>
                <li><a href="#about" onClick={(e) => scrollTo(e, 'about')}>За ФинДо</a></li>
                <li><a href="#mission" onClick={(e) => scrollTo(e, 'mission')}>За нас</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Правна информация</h4>
              <ul>
                <li><Link to="/uslovia">Условия за ползване</Link></li>
                <li><Link to="/poveritlnost">Политика за поверителност</Link></li>
                <li><a href="mailto:parium.bg@gmail.com">Контакт</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ПариУМ. Всички права запазени. Образователен проект — не представлява финансов съвет.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
