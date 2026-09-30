import React, { useState } from 'react';
import { Card3D } from '../components/Card3D';
import { useApp } from '../utils/AppContext';
import { formatCurrency } from '../utils/formatters';
import { ChevronLeft, MoreHorizontal, Copy, Eye, EyeOff, Lock, Unlock, Wifi } from 'lucide-react';

export const DigitalKeyPage: React.FC = () => {
  const { setCurrentScreen, card, setCard, selectedCurrency, totalBalanceCOP, totalBalanceUSD, totalBalanceEUR, showToast } = useApp();
  const [showCVC, setShowCVC] = useState(false);

  const getBalance = () => {
    switch (selectedCurrency) {
      case 'COP': return totalBalanceCOP;
      case 'USD': return totalBalanceUSD;
      case 'EUR': return totalBalanceEUR;
      default: return totalBalanceCOP;
    }
  };

  const copyKeyNumber = () => {
    navigator.clipboard.writeText(card.number.replace(/\s/g, ''));
    showToast('¡Número de clave copiado al portapapeles!');
  };

  const toggleFreeze = () => {
    setCard(prev => ({ ...prev, isFrozen: !prev.isFrozen }));
    showToast(card.isFrozen ? 'Clave Digital desbloqueada' : 'Clave Digital congelada por seguridad');
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-full text-white">
      {/* Sección Oscura Superior */}
      <div className="px-5 pt-2 pb-4 flex flex-col items-center">
        {/* Encabezado Superior */}
        <div className="w-full flex items-center justify-between mb-2">
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <h2 className="text-xs font-extrabold tracking-widest uppercase">Clave Digital</h2>

          <button 
            onClick={() => setCurrentScreen('profile')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Tarjeta Digital 3D Interactiva */}
        <Card3D />

        {/* Muestra de Saldo en Tarjeta */}
        <div className="text-center my-2">
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {formatCurrency(getBalance(), selectedCurrency)}
          </h1>
          <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase mt-1 block">
            SALDO DISPONIBLE EN TARJETA
          </span>
        </div>
      </div>

      {/* Contenedor Hoja Blanca: Especificaciones de Clave */}
      <div className="white-sheet shadow-[0_-12px_32px_rgba(0,0,0,0.35)]">
        <h3 className="text-base font-extrabold text-slate-900 mb-4 tracking-tight">Especificaciones de Clave</h3>

        <div className="space-y-3.5">
          {/* Fila Número de Clave */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Número de clave</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs md:text-sm font-extrabold text-slate-900 tracking-wider">
                {card.number}
              </span>
              <button 
                onClick={copyKeyNumber}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                title="Copiar número de clave"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fila Código CVC */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Código CVC</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-extrabold text-slate-900 tracking-wider">
                {showCVC ? card.cvc : '•••'}
              </span>
              <button 
                onClick={() => setShowCVC(!showCVC)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                title={showCVC ? 'Ocultar CVC' : 'Mostrar CVC'}
              >
                {showCVC ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Fila Ciclo de Expiración */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <span className="text-xs font-semibold text-slate-400">Ciclo de Expiración</span>
            <span className="font-mono text-sm font-extrabold text-slate-900">
              {card.expiry}
            </span>
          </div>

          {/* Controles de Seguridad de Tarjeta */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${card.isFrozen ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                  {card.isFrozen ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Congelar Clave Digital</h4>
                  <p className="text-[10px] text-slate-400">Bloquea todos los cobros entrantes y salientes</p>
                </div>
              </div>

              {/* Interruptor Toggle */}
              <button 
                onClick={toggleFreeze}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${card.isFrozen ? 'bg-red-500' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${card.isFrozen ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Pagos Contactless NFC</h4>
                  <p className="text-[10px] text-slate-400">Para transporte y datáfonos de tiendas</p>
                </div>
              </div>

              <button 
                onClick={() => setCard(prev => ({ ...prev, contactless: !prev.contactless }))}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${card.contactless ? 'bg-blue-600' : 'bg-slate-200'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${card.contactless ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
