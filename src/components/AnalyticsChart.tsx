import React, { useState } from 'react';
import { EXPENSE_ANALYTICS_DATA, CATEGORY_BREAKDOWN } from '../utils/mockData';
import { TrendingDown, ArrowUpRight } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export const AnalyticsChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1S' | '1M' | '3M' | '1A'>('1S');
  const maxExpense = Math.max(...EXPENSE_ANALYTICS_DATA.map(d => d.amount));

  return (
    <div className="w-full bg-slate-900/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      {/* Encabezado del Gráfico */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-white/60 tracking-wider uppercase">Analítica de Gastos Orbit</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xl md:text-2xl font-extrabold text-white">
              {formatCurrency(7860000, 'COP')}
            </span>
            <span className="flex items-center text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <TrendingDown className="w-3 h-3 mr-1" /> -12.4%
            </span>
          </div>
        </div>

        {/* Selector de Período */}
        <div className="flex items-center bg-white/5 p-1 rounded-lg border border-white/10 text-xs">
          {(['1S', '1M', '3M', '1A'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded-md transition-all font-medium cursor-pointer ${
                timeframe === tf ? 'bg-blue-600 text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Gráfico de Barras SVG */}
      <div className="h-40 w-full flex items-end justify-between gap-2.5 pt-6 pb-2 px-2 relative">
        {/* Líneas de Grilla Horizontal */}
        <div className="absolute inset-x-0 top-6 border-b border-white/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-18 border-b border-white/5 pointer-events-none" />
        <div className="absolute inset-x-0 top-28 border-b border-white/5 pointer-events-none" />

        {EXPENSE_ANALYTICS_DATA.map((item, idx) => {
          const heightPercent = Math.max(15, (item.amount / maxExpense) * 100);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center h-full justify-end group relative">
              {/* Tooltip en Hover */}
              <div className="absolute -top-9 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-white/20 whitespace-nowrap z-20 pointer-events-none">
                {formatCurrency(item.amount, 'COP')}
              </div>

              {/* Contenedor de Barra */}
              <div className="w-full max-w-[26px] bg-white/5 rounded-t-lg overflow-hidden h-full flex items-end">
                <div 
                  className="w-full bg-gradient-to-t from-blue-600 via-indigo-500 to-purple-500 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                  style={{ height: `${heightPercent}%` }}
                />
              </div>

              {/* Etiqueta del Día */}
              <span className="text-[10px] font-medium text-white/50 mt-2">{item.day}</span>
            </div>
          );
        })}
      </div>

      {/* Desglose de Categorías */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">Principales Sectores de Gasto</span>
          <span className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
            Detalles <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {CATEGORY_BREAKDOWN.map((cat, i) => (
            <div key={i} className="bg-white/5 p-2 rounded-xl border border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                <div className="min-w-0">
                  <p className="text-[11px] text-white/90 font-medium truncate">{cat.name}</p>
                  <p className="text-[9px] text-white/50">{cat.amount}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-white/80 ml-1">{cat.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
