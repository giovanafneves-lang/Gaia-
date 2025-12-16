import React, { useState, useEffect, Suspense, useCallback } from 'react';
import { LayoutDashboard, MessageSquare, Newspaper, Map, Wallet, CreditCard, Flag, Menu, Settings, Cpu, X, TrendingUp, TrendingDown, LifeBuoy, FlaskConical, Users, Loader2, LogOut, Sparkles, Building, Download, Zap, Crosshair } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logo from './components/Logo';
import GaiaSentinel from './components/GaiaSentinel';
import { GaiaTab, CurrencyRate } from './types';
import { NOTIFICATIONS, MOCK_CURRENCIES } from './constants';

const Advisor = React.lazy(() => import('./components/Advisor'));
const MarketNews = React.lazy(() => import('./components/MarketNews'));
const Planning = React.lazy(() => import('./components/Planning'));
const WalletComponent = React.lazy(() => import('./components/Wallet'));
const Subscription = React.lazy(() => import('./components/Subscription'));
const Mission = React.lazy(() => import('./components/Mission'));
const Support = React.lazy(() => import('./components/Support'));
const GaiaLab = React.lazy(() => import('./components/GaiaLab'));
const SocialTrading = React.lazy(() => import('./components/SocialTrading'));
const GrowthEngine = React.lazy(() => import('./components/GrowthEngine'));
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));
const RealityEngine = React.lazy(() => import('./components/RealityEngine'));
const QuantumArbitrage = React.lazy(() => import('./components/QuantumArbitrage'));

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<GaiaTab>(GaiaTab.DASHBOARD);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [currencies, setCurrencies] = useState<CurrencyRate[]>(MOCK_CURRENCIES);
  const [showPWAInstall, setShowPWAInstall] = useState(false);
  
  // Language State (Simulated for demonstration)
  const [language, setLanguage] = useState<'pt' | 'en' | 'es'>('pt');

  useEffect(() => {
      const storedAuth = localStorage.getItem('gaia_auth');
      if (storedAuth === 'true') {
          setIsAuthenticated(true);
      }
      
      // Clean Boot Logs for Production
      console.clear();
      console.log('%c GAIA OS v1.0.0 (GOLD MASTER) ', 'background: #1C1512; color: #2DD4BF; font-weight: bold; font-size: 14px; padding: 4px; border: 1px solid #2DD4BF; border-radius: 4px;');
      console.log('%c System Status: ONLINE ', 'color: #10B981; font-weight: bold;');
      console.log('Boot Sequence Complete. Sentinel Active.');

      // PWA Install Logic
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
          const timer = setTimeout(() => setShowPWAInstall(true), 5000);
          return () => clearTimeout(timer);
      }
  }, []);

  const handleLogin = () => {
      localStorage.setItem('gaia_auth', 'true');
      setIsAuthenticated(true);
      // Welcome Notification - Cinematic Delay
      setTimeout(() => {
          setNotification("Sistemas Gaia Online. Conexão Segura Estabelecida.");
      }, 1500);
  };

  const handleLogout = () => {
      localStorage.removeItem('gaia_auth');
      setIsAuthenticated(false);
      setActiveTab(GaiaTab.DASHBOARD);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Gaia Alert Interval
    const interval = setInterval(() => {
      const randomNote = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
      setNotification(randomNote);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, 45000); // Less frequent to be less annoying

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchRates = async () => {
      try {
        setCurrencies(prev => prev.map(c => {
           const changeFactor = (Math.random() - 0.5) * 0.05; 
           const newRate = Math.max(0.001, c.rate + (c.rate * changeFactor));
           const newChange = ((newRate - c.rate) / c.rate) * 100;
           return {
             ...c,
             rate: newRate,
             change: Number(newChange.toFixed(2)),
             sentiment: newChange >= 0 ? 'up' : 'down'
           };
        }));
      } catch (error) {
        console.error("Failed to fetch rates, keeping last known values", error);
      }
    };

    const rateInterval = setInterval(fetchRates, 60000); 
    return () => clearInterval(rateInterval);
  }, [isAuthenticated]);

  // Deep Linking / Navigation Handler - Memoized for Performance
  const handleNavigate = useCallback((tab: GaiaTab) => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case GaiaTab.DASHBOARD: return <Dashboard onNavigate={handleNavigate} />;
      case GaiaTab.ADVISOR: return <Advisor />;
      case GaiaTab.MARKET_NEWS: return <MarketNews />;
      case GaiaTab.LAB: return <GaiaLab />;
      case GaiaTab.SOCIAL: return <SocialTrading />;
      case GaiaTab.GROWTH: return <GrowthEngine />;
      case GaiaTab.ADMIN: return <AdminPanel />;
      case GaiaTab.REALITY: return <RealityEngine />;
      case GaiaTab.QUANTUM: return <QuantumArbitrage />; // New Route
      case GaiaTab.PLANNING: return <Planning />;
      case GaiaTab.WALLET: return <WalletComponent />;
      case GaiaTab.SUBSCRIPTION: return <Subscription />;
      case GaiaTab.MISSION: return <Mission />;
      case GaiaTab.SUPPORT: return <Support />;
      default: return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  const NavItem = ({ tab, icon: Icon, label, variant = 'finance' }: { tab: GaiaTab; icon: any; label: string, variant?: 'finance'|'growth'|'admin' }) => {
    const isGrowth = variant === 'growth';
    const isAdmin = variant === 'admin';
    // Updated color classes for Growth to Sky Blue
    const activeColorClass = isGrowth ? 'text-sky-400' : isAdmin ? 'text-yellow-400' : 'text-gaia-cyan';
    const activeBgClass = isGrowth ? 'bg-gradient-to-r from-sky-900 to-blue-900 border-sky-700' : isAdmin ? 'bg-gradient-to-r from-yellow-900 to-amber-900 border-yellow-700' : 'bg-gradient-to-r from-gaia-900 to-gaia-800 border-gaia-700/50';

    return (
        <button
        onClick={() => {
            setActiveTab(tab);
            setSidebarOpen(false);
        }}
        className={`w-full flex items-center p-4 rounded-xl mb-3 transition-all duration-300 group relative overflow-hidden ${
            activeTab === tab 
            ? `text-white font-bold shadow-lg border ${activeBgClass}` 
            : 'text-gaia-400 hover:text-gaia-100 hover:bg-gaia-900/30'
        }`}
        aria-label={`Navegar para ${label}`}
        >
        {activeTab === tab && (
            <div className={`absolute left-0 top-0 bottom-0 w-1 shadow-[0_0_10px_#2DD4BF] ${isGrowth ? 'bg-sky-400' : isAdmin ? 'bg-yellow-400' : 'bg-gaia-cyan'}`}></div>
        )}
        <Icon size={20} className={`mr-4 relative z-10 transition-transform group-hover:scale-110 ${activeTab === tab ? `${activeColorClass} drop-shadow-md` : `text-gaia-600 group-hover:${activeColorClass} transition-colors`}`} />
        <span className="relative z-10 font-medium tracking-wide text-xs uppercase">{label}</span>
        {activeTab === tab && (
            <div className={`absolute inset-0 pointer-events-none ${isGrowth ? 'bg-sky-500/5' : isAdmin ? 'bg-yellow-500/5' : 'bg-gaia-cyan/5'}`}></div>
        )}
        </button>
    );
  }

  const PageLoader = () => (
    <div className="flex flex-col items-center justify-center h-[60vh] text-gaia-500 animate-fade-in">
        <Loader2 size={48} className="text-gaia-cyan animate-spin mb-4" />
        <p className="text-xs uppercase tracking-widest font-bold">Carregando Módulo...</p>
    </div>
  );

  if (!isAuthenticated) {
      return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen text-gaia-100 font-sans overflow-hidden relative selection:bg-gaia-cyan selection:text-gaia-950">
      
      {/* PWA Install Banner */}
      {showPWAInstall && (
          <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gaia-900 border-t border-gaia-700 p-4 animate-bounce-in shadow-2xl flex items-center justify-between">
              <div className="flex items-center">
                  <div className="w-10 h-10 bg-black rounded-xl mr-3 flex items-center justify-center border border-white/10">
                      <Logo variant="finance" className="w-8 h-8" />
                  </div>
                  <div>
                      <p className="text-white font-bold text-sm">Instalar Gaia App</p>
                      <p className="text-xs text-gaia-400">Adicione à tela inicial para melhor performance.</p>
                  </div>
              </div>
              <div className="flex space-x-2">
                  <button onClick={() => setShowPWAInstall(false)} className="px-3 py-2 text-xs font-bold text-gaia-500">Agora não</button>
                  <button className="px-4 py-2 bg-gaia-cyan text-black rounded-lg text-xs font-bold flex items-center">
                      <Download size={14} className="mr-1" /> Instalar
                  </button>
              </div>
          </div>
      )}

      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-gaia-900/90 border border-gaia-cyan/30 p-4 rounded-xl shadow-glow-cyan backdrop-blur-md animate-float max-w-sm flex items-center">
           <div className="w-1.5 h-1.5 bg-gaia-cyan rounded-full mr-3 animate-pulse"></div>
           <div className="flex-1">
             <p className="text-[9px] uppercase text-gaia-400 font-bold tracking-widest">Gaia Alert</p>
             <p className="text-sm font-medium text-white">{notification}</p>
           </div>
           <button onClick={() => setNotification(null)} className="ml-2 text-gaia-500 hover:text-white" aria-label="Fechar notificação">
             <X size={14} />
           </button>
        </div>
      )}

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-80 bg-gaia-950/95 backdrop-blur-2xl border-r border-gaia-800/40 
        transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full flex flex-col p-6 relative">
          <div className="mb-10 flex flex-col items-center justify-center pt-8">
             
             {/* ORBITAL EYE LOGO */}
             <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <Logo variant={activeTab === GaiaTab.GROWTH ? 'growth' : activeTab === GaiaTab.ADMIN ? 'admin' : 'finance'} className="w-full h-full" />
             </div>
             
             <div className="text-center">
                <h1 className="font-serif text-4xl text-white tracking-[0.1em] font-bold bg-clip-text text-transparent bg-gradient-to-r from-gaia-sand to-white drop-shadow-sm">GAIA</h1>
                <p className="text-[10px] text-gaia-cyan uppercase tracking-[0.3em] mt-1 font-bold opacity-80">Business AI</p>
             </div>
          </div>

          <nav className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            <NavItem tab={GaiaTab.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
            <NavItem tab={GaiaTab.REALITY} icon={Zap} label="Reality Engine" /> 
            <NavItem tab={GaiaTab.LAB} icon={FlaskConical} label="Laboratório" />
            <NavItem tab={GaiaTab.SOCIAL} icon={Users} label="Social Neural" />
            <NavItem tab={GaiaTab.ADVISOR} icon={MessageSquare} label="Agente Gaia" />
            <NavItem tab={GaiaTab.QUANTUM} icon={Crosshair} label="Quantum Arbitrage" /> 
            
            <div className="my-2 border-t border-sky-900/30 mx-2"></div>
            <NavItem tab={GaiaTab.GROWTH} icon={Sparkles} label="Gaia Growth" variant="growth" />
            
            <div className="my-2 border-t border-gaia-800/30 mx-2"></div>
            
            <NavItem tab={GaiaTab.MARKET_NEWS} icon={Newspaper} label="Mercado Global" />
            <NavItem tab={GaiaTab.PLANNING} icon={Map} label="Planejamento" />
            <NavItem tab={GaiaTab.WALLET} icon={Wallet} label="Minha Carteira" />
            <NavItem tab={GaiaTab.SUBSCRIPTION} icon={CreditCard} label="Planos & Acesso" />
            <NavItem tab={GaiaTab.SUPPORT} icon={LifeBuoy} label="Suporte IA" />
            <NavItem tab={GaiaTab.MISSION} icon={Flag} label="Nossa Missão" />

            <div className="my-2 border-t border-yellow-900/30 mx-2"></div>
            <NavItem tab={GaiaTab.ADMIN} icon={Building} label="Painel Admin" variant="admin" />
          </nav>

          <div className="mt-auto pt-6 border-t border-gaia-800/30">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gaia-900/40 border border-gaia-800/50">
              <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gaia-teal to-gaia-cyan flex items-center justify-center text-white font-bold font-serif shadow-md border border-white/10">
                    JS
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-bold text-gaia-100">João Silva</p>
                    <div className="flex items-center mt-0.5">
                      <div className="w-1.5 h-1.5 bg-gaia-cyan rounded-full mr-1.5 animate-pulse"></div>
                      <p className="text-[9px] text-gaia-400 uppercase tracking-wider">Online</p>
                    </div>
                  </div>
              </div>
              <button 
                  onClick={handleLogout}
                  className="p-2 text-gaia-500 hover:text-red-400 transition-colors"
                  aria-label="Sair"
              >
                  <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative z-10 bg-transparent">
        <header className="h-24 flex items-center justify-between px-8 lg:px-12 sticky top-0 z-30 transition-all bg-gaia-950/20 backdrop-blur-md border-b border-white/5">
          <button 
            className="lg:hidden text-gaia-100 hover:text-gaia-cyan transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
          
          <div className="flex items-center">
             <h2 className="text-sm font-sans text-gaia-300 uppercase tracking-[0.2em] hidden md:block pl-4 border-l border-gaia-cyan/30">
               {activeTab === GaiaTab.DASHBOARD && 'Visão Geral'}
               {activeTab === GaiaTab.REALITY && 'Motor de Realidade'}
               {activeTab === GaiaTab.LAB && 'Backtest & Sandbox'}
               {activeTab === GaiaTab.SOCIAL && 'Neural Copy Trading'}
               {activeTab === GaiaTab.GROWTH && 'Motor de Growth'}
               {activeTab === GaiaTab.ADMIN && 'Painel Administrativo'}
               {activeTab === GaiaTab.ADVISOR && 'Consultoria IA'}
               {activeTab === GaiaTab.QUANTUM && 'Arbitragem HFT'}
               {activeTab === GaiaTab.MARKET_NEWS && 'Mercado'}
               {activeTab === GaiaTab.PLANNING && 'Roadmap'}
               {activeTab === GaiaTab.WALLET && 'Ativos'}
               {activeTab === GaiaTab.SUBSCRIPTION && 'Acesso'}
               {activeTab === GaiaTab.MISSION && 'Sobre'}
               {activeTab === GaiaTab.SUPPORT && 'Atendimento'}
             </h2>
          </div>
          
          <div className="flex items-center ml-auto space-x-6">
             
             {/* Language Selector */}
             <div className="hidden md:flex items-center space-x-2 mr-4 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                {['pt', 'en', 'es'].map((lang) => (
                    <button 
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`text-[10px] font-bold uppercase w-6 h-6 rounded flex items-center justify-center transition-all ${
                            language === lang 
                            ? 'bg-gaia-cyan text-black' 
                            : 'text-gaia-500 hover:text-white'
                        }`}
                    >
                        {lang.toUpperCase()}
                    </button>
                ))}
             </div>

             <div className="hidden xl:flex items-center space-x-5 mr-6 animate-fade-in bg-black/20 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
                {currencies.slice(0, 3).map((currency: CurrencyRate) => (
                    <div key={currency.symbol} className="flex items-center text-xs">
                        <span className="text-gaia-500 font-bold mr-1.5">{currency.symbol}</span>
                        <span className="text-gaia-200 font-mono mr-1.5">{currency.rate.toFixed(2)}</span>
                        {currency.sentiment === 'up' ? (
                            <TrendingUp size={12} className="text-green-500" />
                        ) : currency.sentiment === 'down' ? (
                            <TrendingDown size={12} className="text-red-500" />
                        ) : (
                            <span className="text-gaia-500">-</span>
                        )}
                    </div>
                ))}
             </div>

             <div className="hidden md:flex flex-col items-end">
                <span className="text-[9px] text-gaia-500 uppercase tracking-widest font-bold">IBOVESPA</span>
                <span className="text-sm font-bold text-white flex items-center">
                   128.500 <span className="text-green-500 text-xs ml-1">(+0.5%)</span>
                </span>
             </div>
             <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-gaia-400 hover:text-gaia-cyan hover:border-gaia-cyan/30 transition-all shadow-sm" aria-label="Configurações">
                <Settings size={18} />
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 lg:px-12 scroll-smooth">
           <GaiaSentinel>
                <Suspense fallback={<PageLoader />}>
                    {renderContent()}
                </Suspense>
           </GaiaSentinel>
        </div>
      </main>
    </div>
  );
};

export default App;