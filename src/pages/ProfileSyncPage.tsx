import React from 'react';
import { useApp } from '../utils/AppContext';
import { X, ShieldCheck, Fingerprint, Landmark, Power, ChevronRight, Bell } from 'lucide-react';

export const ProfileSyncPage: React.FC = () => {
  const { 
    user, 
    setUser, 
    setCurrentScreen, 
    setActiveModal, 
    banks, 
    showToast 
  } = useApp();

  const toggleBiometrics = () => {
    setUser(prev => ({ ...prev, biometricEnabled: !prev.biometricEnabled }));
    showToast(user.biometricEnabled ? 'Enlace Biométrico Desactivado' : 'Enlace Biométrico Activado');
  };

  const toggleNotifications = () => {
    setUser(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
    showToast(user.notificationsEnabled ? 'Alertas Silenciadas' : 'Alertas Inteligentes Activadas');
  };

  const handleLogout = () => {
    showToast('Sesión Finalizada');
    setCurrentScreen('onboarding');
  };

  return (
    <div className="w-full flex flex-col justify-between min-h-full text-white p-5">
      {/* Encabezado */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-extrabold tracking-tight text-white uppercase">Sincronización de Perfil</h2>
          <button 
            onClick={() => setCurrentScreen('dashboard')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Tarjeta de Información de Usuario */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-purple-600 flex items-center justify-center text-xl font-extrabold text-white shadow-lg border border-white/20">
            {user.avatarInitials}
          </div>

          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">{user.name}</h3>
            <span className="text-[9px] font-bold text-blue-400 tracking-widest uppercase bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20 inline-block mt-1">
              {user.membership}
            </span>
          </div>
        </div>

        {/* Sección 1: PROTOCOLOS DEL SISTEMA */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2.5 px-1">
            PROTOCOLOS DEL SISTEMA
          </span>

          <div className="space-y-2.5 bg-white/5 p-2 rounded-2xl border border-white/10">
            {/* Bóveda de Seguridad */}
            <button 
              onClick={() => setActiveModal('security')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-white/90">Bóveda de Seguridad</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
            </button>

            {/* Enlace Biométrico */}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                  <Fingerprint className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-white/90">Enlace Biométrico</span>
              </div>

              <button 
                onClick={toggleBiometrics}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${user.biometricEnabled ? 'bg-blue-600' : 'bg-white/20'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${user.biometricEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            {/* Alertas Inteligentes */}
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                  <Bell className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-white/90">Alertas Inteligentes</span>
              </div>

              <button 
                onClick={toggleNotifications}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${user.notificationsEnabled ? 'bg-blue-600' : 'bg-white/20'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${user.notificationsEnabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Sección 2: NODOS DE CUENTA */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2.5 px-1">
            NODOS DE CUENTA
          </span>

          <div className="space-y-2.5 bg-white/5 p-2 rounded-2xl border border-white/10">
            {/* Banca Vinculada */}
            <button
              onClick={() => setCurrentScreen('linked-banks')}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                  <Landmark className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-white/90">Banca Vinculada</span>
              </div>

              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/20">
                {banks.length} ACTIVOS
              </span>
            </button>

            {/* Terminar Sesión */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-500/10 transition-colors text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center border border-red-500/30">
                <Power className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-red-400 group-hover:text-red-300">Terminar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
