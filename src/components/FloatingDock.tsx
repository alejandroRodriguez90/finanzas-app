import React from 'react';
import { useApp } from '../utils/AppContext';
import type { ScreenType } from '../utils/AppContext';
import { LayoutGrid, TrendingUp, Zap, ShieldCheck, User } from 'lucide-react';

export const FloatingDock: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useApp();

  type Tab = { id: ScreenType; Icon: React.FC<React.SVGProps<SVGSVGElement>> & { displayName?: string }; label: string; center?: boolean };

  const tabs: Tab[] = [
    { id: 'dashboard',    Icon: LayoutGrid,   label: 'Inicio'        },
    { id: 'analytics',    Icon: TrendingUp,    label: 'Transacciones' },
    { id: 'card',         Icon: Zap,           label: 'Clave', center: true },
    { id: 'linked-banks', Icon: ShieldCheck,   label: 'Seguridad'    },
    { id: 'profile',      Icon: User,          label: 'Perfil'       },
  ];

  return (
    <div className="fixed bottom-5 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className="pointer-events-auto flex items-center gap-1 px-3 py-3 rounded-full"
        style={{
          background: 'rgba(18, 18, 24, 0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {tabs.map(({ id, Icon, label, center }) => {
          const active = currentScreen === id;

          if (center) {
            return (
              <button
                key={id}
                id={`nav-${id}`}
                onClick={() => setCurrentScreen(id)}
                title={label}
                className="relative mx-2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95"
                style={{
                  background: active
                    ? 'radial-gradient(circle at 40% 40%, #c8ff00, #8bc400)'
                    : 'radial-gradient(circle at 40% 40%, #a8e000, #6da000)',
                  boxShadow: active
                    ? '0 0 28px rgba(180,255,0,0.65), 0 4px 16px rgba(0,0,0,0.5)'
                    : '0 0 18px rgba(140,210,0,0.4), 0 4px 12px rgba(0,0,0,0.4)',
                }}
              >
                <Icon className="w-6 h-6 text-black" strokeWidth={2.5} />
              </button>
            );
          }

          return (
            <button
              key={id}
              id={`nav-${id}`}
              onClick={() => setCurrentScreen(id)}
              title={label}
              className="flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-all duration-200 active:scale-95 gap-0.5"
              style={{
                background: active ? 'rgba(255,255,255,0.12)' : 'transparent',
              }}
            >
              <Icon
                className="w-5 h-5 transition-colors duration-200"
                style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.45)' }}
                strokeWidth={active ? 2.2 : 1.8}
              />
              <span
                className="text-[9px] font-semibold leading-none"
                style={{ color: active ? '#ffffff' : 'rgba(255,255,255,0.4)' }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
