import React from 'react';
import { useApp } from '../utils/AppContext';
import { formatCurrency } from '../utils/formatters';
import { ChevronLeft, Plus, Landmark, CheckCircle, RefreshCw, ShieldCheck } from 'lucide-react';

export const LinkedBankingPage: React.FC = () => {
  const { banks, setCurrentScreen, setActiveModal, selectedCurrency, showToast } = useApp();

  const handleRefresh = (bankName: string) => {
    showToast(`Saldos de ${bankName} sincronizados correctamente`);
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-full text-white p-5">
      {/* Encabezado */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          
          <h2 className="text-xs font-extrabold tracking-widest uppercase">Nodos Bancarios Vinculados</h2>

          <button 
            onClick={() => setActiveModal('link-bank')}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors shadow-md cursor-pointer"
            title="Vincular Cuenta Bancaria"
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Encabezado de Información de Sincronización */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Nodos Activos: {banks.length}</h3>
              <p className="text-[10px] text-white/60">Protocolo Encriptado Open Banking</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal('link-bank')}
            className="bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Vincular</span>
          </button>
        </div>

        {/* Lista de Bancos */}
        <div className="space-y-3.5">
          {banks.map(bank => (
            <div 
              key={bank.id}
              className="p-4 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden transition-transform hover:-translate-y-0.5"
              style={{ background: bank.color }}
            >
              {/* Fila Superior: Nombre del banco y Estado */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                    <Landmark className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h4 className="text-sm font-extrabold text-white tracking-tight">{bank.bankName}</h4>
                </div>

                <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-2.5 h-2.5" /> {bank.status}
                </span>
              </div>

              {/* Número de Cuenta y Saldo */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-white/80 font-medium">{bank.accountType}</p>
                  <p className="text-[9px] text-white/40 mt-0.5">Última sinc: {bank.lastSync}</p>
                </div>

                <div className="text-right">
                  <span className="text-lg font-extrabold text-white tracking-tight block">
                    {formatCurrency(bank.balance, selectedCurrency)}
                  </span>
                  <button 
                    onClick={() => handleRefresh(bank.bankName)}
                    className="text-[9px] text-white/70 hover:text-white flex items-center gap-1 ml-auto mt-0.5 hover:underline cursor-pointer"
                  >
                    <RefreshCw className="w-2.5 h-2.5" /> Sincronizar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
