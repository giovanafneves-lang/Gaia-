import { Plan, Stock, NewsItem, VideoContent, CurrencyRate, BacktestResult, TraderProfile } from './types';

export const MOCK_STOCKS: Stock[] = [
  { symbol: 'PETR4', name: 'Petrobras', price: 36.50, change: 2.4, rentability: '+12% YTD', recommendation: 'BUY' },
  { symbol: 'VALE3', name: 'Vale', price: 68.20, change: -0.5, rentability: '-5% YTD', recommendation: 'HOLD' },
  { symbol: 'ITUB4', name: 'Itaú Unibanco', price: 33.10, change: 1.1, rentability: '+8% YTD', recommendation: 'BUY' },
  { symbol: 'WEGE3', name: 'WEG', price: 40.05, change: 0.8, rentability: '+22% YTD', recommendation: 'BUY' },
  { symbol: 'BBDC4', name: 'Bradesco', price: 14.80, change: -1.2, rentability: '-2% YTD', recommendation: 'SELL' },
  { symbol: 'NVDA34', name: 'NVIDIA BDR', price: 120.40, change: 4.5, rentability: '+150% YTD', recommendation: 'BUY' },
];

export const MOCK_NEWS: NewsItem[] = [
  { id: 1, title: 'Inflação desacelera e mercado prevê queda de juros no Brasil', source: 'Gaia Local News', time: '10 min atrás', summary: 'Dados do IPCA mostram cenário favorável para investimentos em renda variável.', sentiment: 'positive', impact: 'local' },
  { id: 2, title: 'Setor de Tecnologia global lidera alta na bolsa americana', source: 'Global Markets', time: '1h atrás', summary: 'Gigantes de IA impulsionam índices globais com novos lançamentos e resultados acima do esperado.', sentiment: 'positive', impact: 'global' },
  { id: 3, title: 'Tensões geopolíticas no Oriente Médio afetam preço do petróleo', source: 'Commodities Watch', time: '3h atrás', summary: 'Barril do Brent sobe 3% com instabilidade na região, impactando inflação global.', sentiment: 'negative', impact: 'global' },
  { id: 4, title: 'Bancos Centrais da Europa sinalizam manutenção de juros', source: 'EuroZone Insights', time: '5h atrás', summary: 'Decisão do BCE pode influenciar o fluxo de capitais para mercados emergentes.', sentiment: 'neutral', impact: 'global' },
  { id: 5, title: 'Novas regulamentações cripto na Ásia geram volatilidade', source: 'Crypto Global', time: '8h atrás', summary: 'Mercado de criptomoedas reage a notícias sobre novas leis em importantes mercados asiáticos.', sentiment: 'negative', impact: 'global' },
];

export const MOCK_CURRENCIES: CurrencyRate[] = [
  { name: 'Dólar Americano', symbol: 'USD', rate: 5.25, change: 0.8, sentiment: 'up' },
  { name: 'Euro', symbol: 'EUR', rate: 5.70, change: -0.2, sentiment: 'down' },
  { name: 'Libra Esterlina', symbol: 'GBP', rate: 6.80, change: 0.1, sentiment: 'up' },
  { name: 'Peso Argentino', symbol: 'ARS', rate: 0.006, change: -1.5, sentiment: 'down' },
  { name: 'Yuan Chinês', symbol: 'CNY', rate: 0.72, change: 0.05, sentiment: 'up' },
];


export const PLANS: Plan[] = [
  {
    name: 'Gaia Starter',
    price: 'Grátis',
    features: ['Cotações com atraso de 15min', 'Acesso básico ao Agente IA', '3 Notícias diárias', 'Carteira simples'],
  },
  {
    name: 'Gaia Pro',
    price: 'R$ 79,90/mês',
    recommended: false,
    features: ['Cotações em Tempo Real', 'IA Avançada (Gaia-3)', 'Quantum Arbitrage (Cripto)', 'Comissões Reduzidas', 'Análise Sentimento Mercado'],
  },
  {
    name: 'Gaia Expert',
    price: 'R$ 249,90/mês',
    recommended: true,
    features: ['Agente IA Dedicado 24h', 'Acesso ao Gaia Reality Engine', 'Carteira Recomendada por IA', 'Social Neural Completo', 'Acesso ao Gaia Neuro-Lab'],
  },
  {
    name: 'Gaia Auto-Wealth',
    price: 'R$ 429,90/mês', 
    recommended: false,
    features: ['Investimento Automático via IA', 'Wealth Management Híbrido (Humano)', 'Taxa Zero em Custódia Global', 'Gaia Growth Engine Full', 'Brand Architect & Viral Launch'],
  }
];

// Valid Embeddable YouTube Links for Demo
export const MOCK_VIDEOS: VideoContent[] = [
  { id: 1, title: 'Oportunidades em Small Caps para 2026', duration: '2:15', specialist: 'Dr. Arthur Mendes', thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop', videoUrl: 'https://www.youtube.com/watch?v=f2i96o67k30' },
  { id: 2, title: 'Análise Técnica: Bitcoin Halving Cycle', duration: '1:45', specialist: 'Gaia AI Analyst', thumbnail: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=600&auto=format&fit=crop', videoUrl: 'https://www.youtube.com/watch?v=LhvP83a3ZgA' },
  { id: 3, title: 'Proteção Patrimonial na Era Digital', duration: '3:20', specialist: 'Helena Costa', thumbnail: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=600&auto=format&fit=crop', videoUrl: 'https://www.youtube.com/watch?v=9t78g0UjhBY' },
  { id: 4, title: 'Fusões e Aquisições: Radar 2026', duration: '4:10', specialist: 'Pedro Alencar', thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=600&auto=format&fit=crop', videoUrl: 'https://www.youtube.com/watch?v=p7HKvqRI_Bo' },
  { id: 5, title: 'DeFi e o Futuro dos Bancos', duration: '2:55', specialist: 'Sara Tech', thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=600&auto=format&fit=crop', videoUrl: 'https://www.youtube.com/watch?v=2e6iR8e7454' },
];

export const CHART_DATA = [
  { name: 'Jan', portfolio: 4000, market: 2400 },
  { name: 'Fev', portfolio: 3000, market: 1398 },
  { name: 'Mar', portfolio: 2000, market: 9800 },
  { name: 'Abr', portfolio: 2780, market: 3908 },
  { name: 'Mai', portfolio: 1890, market: 4800 },
  { name: 'Jun', portfolio: 2390, market: 3800 },
  { name: 'Jul', portfolio: 3490, market: 4300 },
  { name: 'Ago', portfolio: 4200, market: 4100 },
];

export const NOTIFICATIONS = [
  "Dividendo recebido: PETR4 (R$ 45,00)",
  "Alerta de Alta: BITCOIN superou 60k",
  "Novo relatório de IA disponível",
  "Meta mensal de economia atingida!",
  "Campanha de Marketing Viral iniciada!"
];

export const GAIA_MISSION = `Nossa missão é unificar a inteligência financeira e o crescimento estratégico em uma única plataforma soberana. 
Transformamos a gestão de capital e o marketing digital em ciência exata, capacitando usuários a dominarem não apenas seus investimentos, 
mas a expansão exponencial de seus negócios e influência. Do Zero ao Domínio Global.`;

export const MOCK_BACKTEST_DATA: BacktestResult[] = [
  { date: '2023-01', strategy: 100, benchmark: 100 },
  { date: '2023-03', strategy: 112, benchmark: 105 },
  { date: '2023-06', strategy: 125, benchmark: 108 },
  { date: '2023-09', strategy: 138, benchmark: 115 },
  { date: '2023-12', strategy: 155, benchmark: 122 },
  { date: '2024-03', strategy: 168, benchmark: 128 },
  { date: '2024-06', strategy: 195, benchmark: 135 },
];

export const MOCK_TRADERS: TraderProfile[] = [
  {
    id: 1,
    name: 'AlphaPrime Bot',
    type: 'AI_AGENT',
    strategyName: 'Deep Reinforcement Learning (FinRL)',
    returnYTD: '+42.5%',
    riskScore: 7,
    sharpeRatio: 2.1,
    drawdown: '-8.4%',
    followers: 1240,
    complianceVerified: true,
    rationale: 'O agente identificou padrões de microestrutura no Order Book de criptoativos correlacionados com a liquidez global. Alta probabilidade de reversão à média detectada.'
  },
  {
    id: 2,
    name: 'Macro Titans',
    type: 'HUMAN_PRO',
    strategyName: 'Global Macro / Commodities',
    returnYTD: '+28.1%',
    riskScore: 5,
    sharpeRatio: 1.8,
    drawdown: '-12.1%',
    followers: 850,
    complianceVerified: true,
    rationale: 'Exposição estratégica em Petróleo e Ouro baseada em tensões geopolíticas recentes. O gestor possui histórico de proteção de capital em cenários de alta volatilidade.'
  },
  {
    id: 3,
    name: 'Quantum Momentum',
    type: 'AI_AGENT',
    strategyName: 'Statistical Arbitrage',
    returnYTD: '+18.9%',
    riskScore: 3,
    sharpeRatio: 3.2,
    drawdown: '-4.2%',
    followers: 2100,
    complianceVerified: true,
    rationale: 'Estratégia neutra de mercado (Delta Neutral). O algoritmo explora ineficiências de preço momentâneas entre pares de ações do setor bancário.'
  }
];