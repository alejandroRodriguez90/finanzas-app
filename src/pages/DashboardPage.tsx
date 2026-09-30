import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { formatCurrency } from '../utils/formatters';
import { 
  Plus, 
  Send, 
  Repeat, 
  MoreHorizontal, 
  CreditCard, 
  Sparkles, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Car, 
  Laptop, 
  Coffee, 
  Tv, 
  User 
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    selectedCurrency, 
    setSelectedCurrency, 
    totalBalanceCOP,
    totalBalanceUSD, 
    totalBalanceEUR, 
    transactions, 
    setActiveModal,
    setCurrentScreen
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'swap' | 'transfer' | 'payment' | 'income'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getBalance = () => {
    switch (selectedCurrency) {
      case 'COP': return totalBalanceCOP;
      case 'USD': return totalBalanceUSD;
      case 'EUR': return totalBalanceEUR;
      default: return totalBalanceCOP;
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesFilter = activeFilter === 'all' || tx.type === activeFilter;
    const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          tx.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTransactionIcon = (iconType: string, type: string) => {
    switch (iconType) {
      case 'swap':
        return <Repeat className="w-5 h-5 text-blue-600" />;
      case 'user':
        return <User className="w-5 h-5 text-indigo-600" />;
      case 'car':
        return <Car className="w-5 h-5 text-slate-800" />;
      case 'tech':
        return <Laptop className="w-5 h-5 text-slate-900" />;
      case 'income':
        return <ArrowDownLeft className="w-5 h-5 text-emerald-600" />;
      case 'coffee':
        return <Coffee className="w-5 h-5 text-amber-600" />;
      case 'entertainment':
        return <Tv className="w-5 h-5 text-purple-600" />;
      default:
        return type === 'income' 
          ? <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
          : <ArrowUpRight className="w-5 h-5 text-slate-700" />;
    }
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-full">
      {/* Sección Superior Oscura */}
      <div className="px-5 pt-2 pb-5 flex flex-col items-center">
        {/* Insignias de Moneda */}
        <div className="flex items-center gap-1.5 mb-4 bg-white/5 p-1 rounded-full border border-white/10 overflow-x-auto max-w-full">
          <button
            onClick={() => setSelectedCurrency('COP')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCurrency === 'COP' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇨🇴</span>
            <span>COP</span>
          </button>

          <button
            onClick={() => setSelectedCurrency('USD')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCurrency === 'USD' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇺🇸</span>
            <span>USD</span>
          </button>

          <button
            onClick={() => setSelectedCurrency('EUR')}
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 transition-all cursor-pointer ${
              selectedCurrency === 'EUR' 
                ? 'bg-blue-600/40 text-white border border-blue-400/40 shadow-sm' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            <span>🇪🇺</span>
            <span>EUR</span>
          </button>
        </div>

        {/* Muestra de Saldo Principal */}
        <div className="text-center my-2">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
            {formatCurrency(getBalance(), selectedCurrency)}
          </h1>
          <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase mt-1 block">
            LIQUIDEZ TOTAL DISPONIBLE
          </span>
        </div>

        {/* Barra de Controles Rápidos */}
        <div className="flex items-center gap-3 my-3">
          <button 
            onClick={() => setCurrentScreen('card')}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/90 transition-all cursor-pointer"
            title="Clave Digital"
          >
            <CreditCard className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setCurrentScreen('card')}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm"
            title="Nodo Orbit"
          >
            <Sparkles className="w-4 h-4 text-blue-300" />
          </button>

          <button 
            onClick={() => setActiveModal('add')}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white/90 transition-all cursor-pointer"
            title="Añadir Fondos"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Grilla de Botones de Acción (+ AÑADIR, ↗ ENVIAR, ⇆ CAMBIAR, ••• MÁS) */}
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm mt-3">
          <button
            onClick={() => setActiveModal('add')}
            className="flex flex-col items-center justify-center bg-white hover:bg-slate-100 text-slate-900 rounded-2xl p-3 shadow-xl transition-all cursor-pointer group transform hover:-translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1 text-slate-900 font-bold">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-extrabold tracking-wider">AÑADIR</span>
          </button>

          <button
            onClick={() => setActiveModal('send')}
            className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-2xl p-3 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1 text-white">
              <Send className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium text-white/70 tracking-wider">ENVIAR</span>
          </button>

          <button
            onClick={() => setActiveModal('swap')}
            className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-2xl p-3 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1 text-white">
              <Repeat className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium text-white/70 tracking-wider">CAMBIAR</span>
          </button>

          <button
            onClick={() => setCurrentScreen('profile')}
            className="flex flex-col items-center justify-center bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-2xl p-3 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center mb-1 text-white">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </div>
            <span className="text-[10px] font-medium text-white/70 tracking-wider">MÁS</span>
          </button>
        </div>
      </div>

      {/* Contenedor Inferior Blanco ("Historial de Flujo") */}
      <div className="white-sheet shadow-[0_-12px_32px_rgba(0,0,0,0.35)]">
        {/* Encabezado del Contenedor */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Historial de Flujo</h2>
          <button 
            onClick={() => setCurrentScreen('analytics')} 
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors"
          >
            Ver todo
          </button>
        </div>

        {/* Pestañas de Filtro */}
        <div className="flex items-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-none">
          {([
            { id: 'all', label: 'Todos' },
            { id: 'swap', label: 'Cambios' },
            { id: 'transfer', label: 'Transferencias' },
            { id: 'payment', label: 'Pagos' },
            { id: 'income', label: 'Ingresos' }
          ] as const).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id 
                  ? 'bg-slate-900 text-white shadow-sm' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista de Transacciones */}
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">
              No se encontraron transacciones para este filtro.
            </div>
          ) : (
            filteredTransactions.map(tx => (
              <div 
                key={tx.id} 
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 cursor-pointer"
              >
                {/* Lado Izquierdo (Icono/Avatar e Información) */}
                <div className="flex items-center gap-3">
                  {tx.avatarUrl ? (
                    <img 
                      src={tx.avatarUrl} 
                      alt={tx.title} 
                      className="w-10 h-10 rounded-full object-cover shadow-sm border border-slate-200" 
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center shadow-inner">
                      {getTransactionIcon(tx.iconType, tx.type)}
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{tx.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium">{tx.category}</p>
                  </div>
                </div>

                {/* Lado Derecho (Monto y Método/Conversión) */}
                <div className="text-right">
                  <span className={`text-sm font-extrabold block ${tx.amount > 0 ? 'text-slate-900' : 'text-slate-900'}`}>
                    {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount, selectedCurrency)}
                  </span>
                  
                  {tx.convertedInfo ? (
                    <span className="text-[10px] font-bold text-emerald-600 block">
                      {tx.convertedInfo}
                    </span>
                  ) : (
                    <span className="text-[10px] font-medium text-slate-400 block">
                      {tx.method}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
