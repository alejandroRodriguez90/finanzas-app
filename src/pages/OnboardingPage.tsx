import React from 'react';
import { OrbitLogo } from '../components/OrbitLogo';
import { useApp } from '../utils/AppContext';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export const OnboardingPage: React.FC = () => {
  const { setCurrentScreen, setActiveModal } = useApp();

  return (
    <div 
      className="w-full h-full min-h-[580px] flex flex-col justify-between p-8 text-white relative overflow-hidden rounded-3xl"
      style={{
        background: 'linear-gradient(170deg, #1C2640 0%, #11172A 45%, #080A12 100%)'
      }}
    >
      {/* Resplandor de Fondo */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />

      {/* Insignia Superior */}
      <div className="flex justify-between items-center z-10 pt-2">
        <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          ORBIT OS v4.2
        </span>
        <div className="flex items-center gap-1.5 text-xs text-white/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Bóveda Encriptada</span>
        </div>
      </div>

      {/* Emblema Geométrico Central */}
      <div className="flex flex-col items-center justify-center my-auto py-8 z-10">
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(59,130,246,0.3)] mb-6 transform hover:scale-105 transition-transform duration-300">
          <OrbitLogo size="xl" glow />
        </div>

        <h1 className="text-2xl md:text-3xl font-extrabold text-center tracking-tight text-white uppercase max-w-xs leading-tight">
          REDEFINE TU ÓRBITA FINANCIERA
        </h1>

        <p className="text-xs md:text-sm text-center text-white/60 mt-3 max-w-xs leading-relaxed">
          Experimenta una nueva dimensión en la gestión de capital: segura, fluida y celestial.
        </p>
      </div>

      {/* Botones de Acción */}
      <div className="flex flex-col gap-3 z-10 pb-4">
        <button
          onClick={() => setActiveModal('join')}
          className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 px-6 rounded-full shadow-[0_10px_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
        >
          <span>Inicializar Cuenta</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="w-full bg-white/5 hover:bg-white/10 text-white/80 font-medium py-3 px-6 rounded-full text-xs transition-colors cursor-pointer border border-white/10 text-center"
        >
          Acceder al Portal
        </button>
      </div>
    </div>
  );
};
