import React, { useState } from 'react';
import { OrbitLogo } from './OrbitLogo';
import { useApp } from '../utils/AppContext';
import { Lock, Wifi, ShieldAlert } from 'lucide-react';

export const Card3D: React.FC = () => {
  const { card } = useApp();
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 20, y: -y * 20 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      {/* 3D Container with Perspective */}
      <div 
        className="w-full max-w-[340px] h-[215px] perspective-1000 cursor-pointer group select-none"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        title="Click to flip card"
      >
        <div 
          className="relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-3d shadow-[0_20px_50px_rgba(15,23,42,0.8)]"
          style={{
            transform: `rotateY(${isFlipped ? 180 : mousePos.x}deg) rotateX(${isFlipped ? 0 : mousePos.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Card Front */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden border border-white/20 backface-hidden"
            style={{
              background: card.isFrozen 
                ? 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' 
                : 'linear-gradient(135deg, #1E2640 0%, #2B3860 50%, #161C30 100%)'
            }}
          >
            {/* Glossy Overlay Reflective Wave */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/15 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-blue-500/20 blur-2xl pointer-events-none" />

            {/* Card Header (Card Type & Chip / Contactless) */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-xs font-mono tracking-wider">
                  •••• {card.number.slice(-4)}
                </span>
                {card.isFrozen && (
                  <span className="flex items-center gap-1 bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    <Lock className="w-2.5 h-2.5" /> FROZEN
                  </span>
                )}
              </div>
              <Wifi className="w-5 h-5 text-white/50 transform rotate-90" />
            </div>

            {/* Central Geometric Orbit Logo */}
            <div className="flex justify-center items-center my-auto z-10 py-2">
              <OrbitLogo size="lg" glow={!card.isFrozen} />
            </div>

            {/* Card Footer (Mastercard brand & DEBIT tag) */}
            <div className="flex items-end justify-between z-10">
              {/* Mastercard circles */}
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-red-500/90 shadow-md" />
                <div className="w-6 h-6 rounded-full bg-amber-400/90 -ml-2.5 shadow-md" />
              </div>

              <span className="text-white/80 text-xs font-bold tracking-widest uppercase">
                {card.type}
              </span>
            </div>
          </div>

          {/* Card Back */}
          <div 
            className="absolute inset-0 w-full h-full rounded-2xl p-5 flex flex-col justify-between overflow-hidden border border-white/20 backface-hidden rotate-y-180 bg-slate-900"
            style={{
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
            }}
          >
            {/* Magnetic Stripe */}
            <div className="w-full h-9 bg-black/90 -mx-5 mt-2" />

            {/* CVC Box */}
            <div className="flex items-center justify-between bg-white/10 px-4 py-2 rounded-lg border border-white/10 my-2">
              <span className="text-xs text-white/60">CVC SECURITY</span>
              <span className="font-mono text-sm font-bold text-emerald-400 tracking-widest">{card.cvc}</span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-white/40 block font-mono">AUTHORIZED SIGNATURE</span>
              <span className="text-xs font-semibold text-white/80 tracking-wider uppercase">{card.holder}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        <span className="w-2 h-2 rounded-full bg-white shadow-sm" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
      </div>
    </div>
  );
};
