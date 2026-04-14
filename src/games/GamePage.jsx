import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AGE_GROUPS } from '../data/ageGroups';
import './GamePage.css';

// Import games
import SortCoins from './age5-6/SortCoins';
import NeedsWants from './age5-6/NeedsWants';
import PiggyBank from './age5-6/PiggyBank';
import FindoShop from './age5-6/FindoShop';
import Market from './age7-8/Market';
import ChangeDetective from './age7-8/ChangeDetective';
import SavingPlan from './age7-8/SavingPlan';
import FindoStories from './age7-8/FindoStories';
import FamilyBudget from './age9-10/FamilyBudget';
import AdDetective from './age9-10/AdDetective';
import FindoInvest from './age9-10/FindoInvest';
import MyBudget from './age11-14/MyBudget';
import BankDetective from './age11-14/BankDetective';
import InterestCalc from './age11-14/InterestCalc';
import BusinessIncubator from './age11-14/BusinessIncubator';
import StockMarket from './age11-14/StockMarket';
import FirstSalary from './age15-18/FirstSalary';
import TaxCalculator from './age15-18/TaxCalculator';
import CreditOrNot from './age15-18/CreditOrNot';
import Startup from './age15-18/Startup';
import Portfolio from './age15-18/Portfolio';
import Negotiate from './age15-18/Negotiate';

const GAME_COMPONENTS = {
  // 5-6
  'coins': SortCoins, 'needs': NeedsWants, 'piggy': PiggyBank, 'shop': FindoShop,
  // 7-8
  'market': Market, 'change': ChangeDetective, 'saving': SavingPlan, 'stories': FindoStories,
  // 9-10
  'budget': FamilyBudget, 'addetect': AdDetective, 'invest': FindoInvest,
  // 11-14
  'mybudget': MyBudget, 'bankdetect': BankDetective, 'interest': InterestCalc,
  'incubator': BusinessIncubator, 'stocks': StockMarket,
  // 15-18
  'salary': FirstSalary, 'taxcalc': TaxCalculator, 'credit': CreditOrNot,
  'startup': Startup, 'portfolio': Portfolio, 'negotiate': Negotiate,
};

export default function GamePage() {
  const { slug, gameId } = useParams();
  const group = AGE_GROUPS.find(g => g.slug === slug);
  if (!group) return <div className="container section"><h2>Групата не е намерена</h2></div>;

  const game = group.games.find(g => g.id === gameId);
  if (!game) return <div className="container section"><h2>Играта не е намерена</h2></div>;

  const GameComponent = GAME_COMPONENTS[gameId];
  const isDark = group.isDark;

  return (
    <div className={`game-page ${isDark ? 'dark-mode' : ''}`}
      style={{ '--gp': group.colorPrimary, '--gs': group.colorSecondary, '--gbg': group.colorBg, '--gt': group.colorText }}>

      <div className="container back-nav" style={{ paddingTop: '1rem' }}>
        <Link to={`/grupa/${slug}`} className="back-link">← {group.name} ({group.ageRange})</Link>
      </div>

      <section className="game-hero" style={{ background: isDark ? `linear-gradient(135deg, ${group.colorBg}, #1E293B)` : `linear-gradient(135deg, ${group.colorBg}, white)` }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="game-hero-icon">{game.icon}</div>
            <h1 style={{ color: isDark ? '#F1F5F9' : group.colorText }}>{game.title}</h1>
            <p style={{ color: isDark ? '#94A3B8' : group.colorText + 'bb' }}>{game.desc}</p>
            <div className="game-hero-meta">
              <span>⏱️ {game.duration}</span>
              <span className={`diff-badge diff-${game.difficulty}`}>
                {game.difficulty === 'easy' ? '⭐ Лесно' : game.difficulty === 'medium' ? '⭐⭐ Средно' : '⭐⭐⭐ Трудно'}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="game-content">
        <div className="container">
          {GameComponent ? (
            <GameComponent groupColor={group.colorPrimary} isDark={isDark} />
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚧</div>
              <h2>Скоро!</h2>
              <p>Тази игра се подготвя.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
