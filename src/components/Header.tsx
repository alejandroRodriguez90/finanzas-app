import React from 'react';
import { useApp } from '../utils/AppContext';
import { Menu, Search, Bell, Monitor, Smartphone } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const Header: React.FC = () => {
  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    totalBalanceCOP,
    totalBalanceUSD, 
    totalBalanceEUR,
    displayMode,
    setDisplayMode,
    setCurrentScreen,
    setActiveModal,
    user
  } = useApp();

  return (
    <header className="w-full flex items-center justify-between px-5 py-4 text-white">
      {/* Menu Izquierdo / Perfil */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setCurrentScreen('profile')} 
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
          title="Ajustes de Perfil"
        >
          <Menu className="w-5 h-5 text-white/90" />
        </button>

        {/* Insignias Selectoras de Moneda */}
        <div className="hidden sm:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/10">
          <button
            onClick={() => setSelectedCurrency('COP')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
              selectedCurrency === 'COP' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇨🇴</span>
            <span>COP</span>
            <span className="opacity-80">{formatCurrency(totalBalanceCOP, 'COP')}</span>
          </button>

          <button
            onClick={() => setSelectedCurrency('USD')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
              selectedCurrency === 'USD' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇺🇸</span>
            <span>USD</span>
            <span className="opacity-80">{formatCurrency(totalBalanceUSD, 'USD')}</span>
          </button>

          <button
            onClick={() => setSelectedCurrency('EUR')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all ${
              selectedCurrency === 'EUR' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇪🇺</span>
            <span>EUR</span>
            <span className="opacity-80">{formatCurrency(totalBalanceEUR, 'EUR')}</span>
          </button>
        </div>
      </div>

      {/* Selector de Modo de Pantalla (Marcos Móviles vs Escritorio Expandido) */}
      <div className="flex items-center bg-white/10 p-1 rounded-full border border-white/15">
        <button
          onClick={() => setDisplayMode('device-mockup')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            displayMode === 'device-mockup' 
              ? 'bg-white text-slate-900 shadow-md font-semibold' 
              : 'text-white/70 hover:text-white'
          }`}
          title="Ver marcos de teléfonos móviles"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Marcos Móviles</span>
          <span className="md:hidden">Móvil</span>
        </button>

        <button
          onClick={() => setDisplayMode('desktop')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            displayMode === 'desktop' 
              ? 'bg-white text-slate-900 shadow-md font-semibold' 
              : 'text-white/70 hover:text-white'
          }`}
          title="Ver dashboard expandido de escritorio"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Vista Expandida</span>
          <span className="md:hidden">Completo</span>
        </button>
      </div>

      {/* Iconos de Acción (Buscador & Notificaciones) */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setActiveModal('send')}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
          title="Buscar o Transferir"
        >
          <Search className="w-4 h-4 text-white/90" />
        </button>

        <button 
          onClick={() => setCurrentScreen('profile')}
          className="relative w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center transition-all cursor-pointer"
          title="Notificaciones"
        >
          <Bell className="w-4 h-4 text-white/90" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        </button>

        <button
          onClick={() => setCurrentScreen('profile')}
          className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 border border-white/20 flex items-center justify-center text-sm font-bold text-white ml-1 shadow-inner cursor-pointer hover:scale-105 transition-transform"
          title={`Sesión de ${user.name}`}
        >
          {user.avatarInitials}
        </button>
      </div>
    </header>
  );
};
