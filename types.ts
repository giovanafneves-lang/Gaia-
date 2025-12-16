
export interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  rentability: string;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
}

export interface NewsItem {
  id: number;
  title: string;
  source: string;
  time: string;
  summary: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  impact?: 'global' | 'local'; // Added for global news impact
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  recommended?: boolean;
}

export interface VideoContent {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  specialist: string;
  videoUrl?: string;
}

export interface CurrencyRate {
  name: string;
  symbol: string;
  rate: number;
  change: number; // Percentage change
  sentiment: 'up' | 'down' | 'neutral';
}

// NEW TYPES FOR LAB & SOCIAL
export interface BacktestResult {
  date: string;
  strategy: number;
  benchmark: number;
}

export interface TraderProfile {
  id: number;
  name: string;
  type: 'AI_AGENT' | 'HUMAN_PRO';
  strategyName: string;
  returnYTD: string;
  riskScore: number; // 1-10
  sharpeRatio: number;
  drawdown: string;
  followers: number;
  rationale: string; // XAI Explanation
  complianceVerified: boolean;
}

// NEW TYPES FOR REALITY ENGINE
export interface SimulationImpact {
  asset: string;
  change: number; // Projected % change
  reason: string;
}

export interface SimulationResult {
  scenario: string;
  portfolioImpact: number; // Total portfolio % change
  riskLevel: 'BAIXO' | 'MÉDIO' | 'CRÍTICO' | 'OPORTUNIDADE';
  impacts: SimulationImpact[];
  narrative: string; // AI explanation of the butterfly effect
  hedgeSuggestion: string;
}

// NEW TYPES FOR NEURO GROWTH & CREATIVE STUDIO
export interface NeuroAnalysis {
  viralScore: number; // 0-100
  dopamineLevel: number; // 0-100 (Desire)
  oxytocinLevel: number; // 0-100 (Trust)
  cortisolLevel: number; // 0-100 (Urgency/Fear)
  cognitiveBiases: string[];
  improvementSuggestion: string; // NLP rewrite
  predictedReaction: string;
}

export interface CreativeConcept {
  conceptTitle: string;
  visualDescription: string;
  textOverlay: string;
  caption: string;
  colorPalette: string[];
  animationStyle: string;
}

// NEW TYPES FOR QUANTUM ARBITRAGE
export interface ArbitrageOpportunity {
  id: string;
  pair: string;
  exchangeA: string;
  exchangeB: string;
  priceGap: number; // Percentage difference
  profitPotential: string;
  probability: number; // 0-100%
  timeLeft: number; // Seconds
  type: 'CRYPTO' | 'FOREX' | 'COMMODITIES';
}

export enum GaiaTab {
  DASHBOARD = 'dashboard',
  ADVISOR = 'advisor',
  MARKET_NEWS = 'market_news',
  LAB = 'lab', // Laboratório
  SOCIAL = 'social', // Social Neural
  PLANNING = 'planning',
  WALLET = 'wallet',
  SUBSCRIPTION = 'subscription',
  MISSION = 'mission',
  SUPPORT = 'support',
  GROWTH = 'growth',
  ADMIN = 'admin',
  REALITY = 'reality',
  QUANTUM = 'quantum' // Quantum Arbitrage
}
