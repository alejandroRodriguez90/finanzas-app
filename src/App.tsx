import React from 'react';
import { AppProvider, useApp } from './utils/AppContext';
import { Header } from './components/Header';
import { FloatingDock } from './components/FloatingDock';
import { Modals } from './components/Modals';
import { OrbitLogo } from './components/OrbitLogo';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DigitalKeyPage } from './pages/DigitalKeyPage';
import { ProfileSyncPage } from './pages/ProfileSyncPage';
import { LinkedBankingPage } from './pages/LinkedBankingPage';
import { LoginPage } from './pages/LoginPage';
import { AnalyticsChart } from './components/AnalyticsChart';
import { Card3D } from './components/Card3D';

import './styles/global.css';

const MainContent: React.FC = () => {
  const { currentScreen, displayMode, toastMessage, setActiveModal } = useApp();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginPage />;
      case 'splash':
      case 'onboarding':
        return <OnboardingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'card':
        return <DigitalKeyPage />;
      case 'profile':
        return <ProfileSyncPage />;
      case 'linked-banks':
        return <LinkedBankingPage />;
      case 'analytics':
        return (
          <div className="p-6 text-white space-y-6">
            <h2 className="text-xl font-bold tracking-tight mb-2">Analítica &amp; Órbita de Gastos</h2>
            <AnalyticsChart />
          </div>
        );
      default:
        return <DashboardPage />;
    }
  };

  /* Pantalla de inicio: sin Header ni dock */
  if (currentScreen === 'login') {
    return (
      <>
        {toastMessage && (
          <div className="orbit-toast">
            <OrbitLogo size="sm" />
            <span>{toastMessage}</span>
          </div>
        )}
        <LoginPage />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#070A13] text-white flex flex-col selection:bg-blue-500 selection:text-white antialiased" style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>

      {/* Toast emergente */}
      {toastMessage && (
        <div className="orbit-toast">
          <OrbitLogo size="sm" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Encabezado Principal */}
      <Header />

      {/* Área de Contenedor Principal */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 pb-28 flex flex-col items-center">
        {displayMode === 'device-mockup' ? (

          /* ─── MODO MARCOS MÓVILES ─────────────────────────────────────────
             El truco: El marco EXTERNO tiene overflow-hidden para recortar
             las esquinas del teléfono. El div INTERNO NO tiene rounded ni
             overflow-hidden — sólo overflow-y-auto para hacer scroll.
             Así las hojas blancas no se recortan en el borde superior.
          ──────────────────────────────────────────────────────────────────── */
          <div className="w-full flex flex-wrap items-start justify-center gap-8 py-6 my-auto">

            {/* Marco Teléfono 1: Dashboard */}
            <div className="phone-frame">
              {/* Notch del teléfono */}
              <div className="phone-notch" />
              {/* Pantalla interna — sin rounded para no recortar contenido */}
              <div className="phone-screen">
                <DashboardPage />
              </div>
            </div>

            {/* Marco Teléfono 2: Clave Digital (visible desde md) */}
            <div className="phone-frame hidden md:flex">
              <div className="phone-notch" />
              <div className="phone-screen">
                <DigitalKeyPage />
              </div>
            </div>

            {/* Marco Teléfono 3: Perfil (visible desde xl) */}
            <div className="phone-frame hidden xl:flex">
              <div className="phone-notch" />
              <div className="phone-screen">
                <ProfileSyncPage />
              </div>
            </div>

          </div>

        ) : (

          /* ─── MODO VISTA EXPANDIDA (DESKTOP) ────────────────────────────── */
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 py-4">

            {/* Panel principal izquierdo */}
            <div className="lg:col-span-7 xl:col-span-8 bg-slate-900/60 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl min-h-[700px] shadow-2xl flex flex-col">
              {renderActiveScreen()}
            </div>

            {/* Widgets laterales derechos */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-5">
              {/* Tarjeta Digital */}
              <div className="bg-slate-900/60 border border-white/10 rounded-3xl p-5 backdrop-blur-xl shadow-xl">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/60">Nodo Clave Digital</h3>
                  <button
                    onClick={() => setActiveModal('security')}
                    className="text-xs font-semibold text-blue-400 hover:underline cursor-pointer"
                  >
                    Especificaciones
                  </button>
                </div>
                <Card3D />
              </div>

              {/* Gráfico de Gastos */}
              <AnalyticsChart />
            </div>
          </div>

        )}
      </main>

      {/* Menú de Navegación Inferior Flotante */}
      <FloatingDock />

      {/* Modales */}
      <Modals />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
