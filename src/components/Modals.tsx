import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { X, ArrowRight, CheckCircle2, Shield, Repeat, Plus, Send, Landmark, Sparkles } from 'lucide-react';
import { formatCurrency, convertCurrency } from '../utils/formatters';

export const Modals: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    addTransaction, 
    addBank, 
    selectedCurrency, 
    showToast,
    setUser
  } = useApp();

  // Formulario Enviar Dinero
  const [recipient, setRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [sendNote, setSendNote] = useState('');

  // Formulario Intercambio de Moneda
  const [swapFromAmount, setSwapFromAmount] = useState('1000000');
  const [swapFromCurrency, setSwapFromCurrency] = useState<'COP' | 'USD' | 'EUR'>('COP');
  const [swapToCurrency, setSwapToCurrency] = useState<'COP' | 'USD' | 'EUR'>('USD');

  // Formulario Añadir Fondos
  const [addAmount, setAddAmount] = useState('');
  const [addSource, setAddSource] = useState('Bancolombia ****9412');

  // Formulario Vincular Banco
  const [selectedBankName, setSelectedBankName] = useState('Bancolombia');
  const [bankAccountType, setBankAccountType] = useState('Cuenta de Ahorros');
  const [bankInitialBalance, setBankInitialBalance] = useState('5000000');

  // Formulario Registro Constelación
  const [joinName, setJoinName] = useState('Germán Ferrer');
  const [joinEmail, setJoinEmail] = useState('german@orbit.io');
  const [joinAccepted, setJoinAccepted] = useState(true);

  if (activeModal === 'none') return null;

  const closeModal = () => setActiveModal('none');

  const handleSendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(sendAmount);
    if (!val || val <= 0 || !recipient) return;

    addTransaction({
      title: recipient,
      category: 'Transferencia a pares',
      type: 'transfer',
      amount: -val,
      currency: selectedCurrency,
      method: 'Clave Débito',
      iconType: 'user'
    });
    closeModal();
    setRecipient('');
    setSendAmount('');
  };

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(swapFromAmount);
    if (!val || val <= 0) return;

    const converted = convertCurrency(val, swapFromCurrency, swapToCurrency);
    const convertedFormatted = formatCurrency(converted, swapToCurrency);

    addTransaction({
      title: `${swapFromCurrency} ➔ ${swapToCurrency}`,
      category: 'Protocolo de Moneda',
      type: 'swap',
      amount: val,
      currency: swapFromCurrency,
      convertedInfo: `= ${convertedFormatted}`,
      method: 'Protocolo de Moneda',
      iconType: 'swap'
    });
    showToast(`Cambio ejecutado de ${formatCurrency(val, swapFromCurrency)} a ${convertedFormatted}`);
    closeModal();
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(addAmount);
    if (!val || val <= 0) return;

    addTransaction({
      title: 'Recarga de Fondos',
      category: 'Depósito a Cuenta',
      type: 'income',
      amount: val,
      currency: selectedCurrency,
      method: addSource,
      iconType: 'income'
    });
    closeModal();
    setAddAmount('');
  };

  const handleLinkBankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bal = parseFloat(bankInitialBalance) || 2500000;
    addBank(selectedBankName, bankAccountType, bal);
    closeModal();
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name: joinName,
      email: joinEmail,
      avatarInitials: joinName.charAt(0).toUpperCase()
    }));
    showToast('¡Identidad Verificada! Conectado a la Constelación Orbit.');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-slate-900 border border-white/20 rounded-3xl p-6 shadow-2xl text-white overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0F172A 0%, #161F38 100%)'
        }}
      >
        {/* Resplandor tras modal */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Encabezado del Modal */}
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold tracking-tight">
              {activeModal === 'send' && 'Enviar Transferencia'}
              {activeModal === 'swap' && 'Cambio de Moneda Protocolo'}
              {activeModal === 'add' && 'Recargar Fondos'}
              {activeModal === 'link-bank' && 'Vincular Nodo Bancario'}
              {activeModal === 'security' && 'Ajustes de Bóveda de Seguridad'}
              {activeModal === 'join' && 'UNIRSE A LA CONSTELACIÓN'}
            </h2>
          </div>
          <button 
            onClick={closeModal}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>

        {/* 1. MODAL ENVIAR DINERO */}
        {activeModal === 'send' && (
          <form onSubmit={handleSendSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Destinatario / Identidad</label>
              <input
                type="text"
                placeholder="Ej. John Williams o @john"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Monto ({selectedCurrency})</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-lg font-bold text-white/40">$</span>
                <input
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={e => setSendAmount(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-8 pr-4 py-3 text-white text-lg font-bold placeholder-white/30 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Nota (Opcional)</label>
              <input
                type="text"
                placeholder="Cena, arriendo, giro a pares..."
                value={sendNote}
                onChange={e => setSendNote(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/40 focus:outline-none focus:border-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar y Enviar Fondos</span>
            </button>
          </form>
        )}

        {/* 2. MODAL CAMBIAR MONEDA */}
        {activeModal === 'swap' && (
          <form onSubmit={handleSwapSubmit} className="space-y-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs text-white/60 mb-2 font-medium">
                <span>CONVIERTES DE</span>
                <span>ORIGEN</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={swapFromAmount}
                  onChange={e => setSwapFromAmount(e.target.value)}
                  className="w-full bg-transparent text-xl font-bold text-white focus:outline-none"
                  required
                />
                <select
                  value={swapFromCurrency}
                  onChange={e => setSwapFromCurrency(e.target.value as any)}
                  className="bg-white/10 text-white font-bold text-sm px-3 py-2 rounded-xl border border-white/20 focus:outline-none cursor-pointer"
                >
                  <option value="COP" className="bg-slate-900">COP $</option>
                  <option value="USD" className="bg-slate-900">USD $</option>
                  <option value="EUR" className="bg-slate-900">EUR €</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center -my-2 z-10 relative">
              <button
                type="button"
                onClick={() => {
                  const temp = swapFromCurrency;
                  setSwapFromCurrency(swapToCurrency);
                  setSwapToCurrency(temp);
                }}
                className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center border-2 border-slate-900 shadow-md cursor-pointer transition-transform hover:rotate-180"
              >
                <Repeat className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between text-xs text-white/60 mb-2 font-medium">
                <span>RECIBES (ESTIMADO)</span>
                <span>DESTINO</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-emerald-400">
                  {formatCurrency(
                    convertCurrency(parseFloat(swapFromAmount) || 0, swapFromCurrency, swapToCurrency),
                    swapToCurrency
                  )}
                </span>
                <span className="bg-white/10 text-white font-bold text-sm px-3 py-2 rounded-xl border border-white/20">
                  {swapToCurrency}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-white text-slate-900 hover:bg-slate-100 font-bold py-3.5 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Ejecutar Protocolo de Cambio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* 3. MODAL AÑADIR FONDOS */}
        {activeModal === 'add' && (
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Monto del Depósito</label>
              <input
                type="number"
                placeholder="500000"
                value={addAmount}
                onChange={e => setAddAmount(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Fuente de Origen</label>
              <select
                value={addSource}
                onChange={e => setAddSource(e.target.value)}
                className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none cursor-pointer"
              >
                <option value="Bancolombia ****9412">Bancolombia ****9412</option>
                <option value="Banco de Bogotá ****3091">Banco de Bogotá ****3091</option>
                <option value="Nequi / Daviplata">Nequi / Daviplata</option>
                <option value="PSE Transferencia">PSE Transferencia Inmediata</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Fondos Ahora</span>
            </button>
          </form>
        )}

        {/* 4. MODAL VINCULAR BANCO */}
        {activeModal === 'link-bank' && (
          <form onSubmit={handleLinkBankSubmit} className="space-y-4">
            <div className="text-center p-3 bg-blue-950/40 rounded-xl border border-blue-500/20 mb-2">
              <Landmark className="w-8 h-8 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-blue-200">Sincronización encriptada impulsada por Protocolo Abierto Plaid</p>
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Entidad Financiera</label>
              <select
                value={selectedBankName}
                onChange={e => setSelectedBankName(e.target.value)}
                className="w-full bg-slate-800 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none cursor-pointer"
              >
                <option value="Bancolombia">Bancolombia</option>
                <option value="Banco de Bogotá">Banco de Bogotá</option>
                <option value="Davivienda">Davivienda</option>
                <option value="BBVA Colombia">BBVA Colombia</option>
                <option value="Nequi">Nequi</option>
                <option value="Lulo Bank">Lulo Bank</option>
                <option value="Nu Colombia">Nu Colombia</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Tipo de Cuenta</label>
              <input
                type="text"
                value={bankAccountType}
                onChange={e => setBankAccountType(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-white/60 font-semibold uppercase block mb-1.5">Saldo Inicial Simulado ($ COP)</label>
              <input
                type="number"
                value={bankInitialBalance}
                onChange={e => setBankInitialBalance(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-slate-900 font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-slate-100 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Vincular y Autorizar Cuenta</span>
            </button>
          </form>
        )}

        {/* 5. MODAL REGISTRO CONSTELACIÓN */}
        {activeModal === 'join' && (
          <form onSubmit={handleJoinSubmit} className="space-y-4">
            <p className="text-xs text-white/60 text-center mb-2">Verifica tu identidad para reclamar tu estado de Miembro Elite Orbital.</p>

            <div>
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider block mb-1">FIRMA LEGAL</label>
              <input
                type="text"
                value={joinName}
                onChange={e => setJoinName(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div>
              <label className="text-[10px] text-white/50 font-bold uppercase tracking-wider block mb-1">ENLACE NEURAL (CORREO)</label>
              <input
                type="email"
                value={joinEmail}
                onChange={e => setJoinEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-400"
              />
            </div>

            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
              <input
                type="checkbox"
                id="accept"
                checked={joinAccepted}
                onChange={e => setJoinAccepted(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-500 cursor-pointer"
              />
              <label htmlFor="accept" className="text-xs text-white/80 cursor-pointer">
                Acepto los Protocolos y Sincronización de Privacidad.
              </label>
            </div>

            <button
              type="submit"
              disabled={!joinAccepted}
              className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl shadow-lg hover:bg-slate-100 disabled:opacity-50 cursor-pointer"
            >
              Iniciar Nodo
            </button>
          </form>
        )}

        {/* 6. MODAL BÓVEDA DE SEGURIDAD */}
        {activeModal === 'security' && (
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="font-bold text-white">Encriptación Cuántica Activa</h4>
                <p className="text-xs text-emerald-200/80">Todos los tokens de sesión están protegidos de extremo a extremo.</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <span>Sincronización 2FA Multifactores</span>
                <span className="text-emerald-400 font-bold text-xs uppercase">Activado</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <span>Passkey de Enlace Biométrico</span>
                <span className="text-emerald-400 font-bold text-xs uppercase">Activo</span>
              </div>
              <div className="flex justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <span>Validación de Clave por Hardware</span>
                <span className="text-blue-400 font-bold text-xs uppercase">FIDO2 Listo</span>
              </div>
            </div>

            <button
              onClick={closeModal}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl border border-white/15 cursor-pointer"
            >
              Aceptar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
