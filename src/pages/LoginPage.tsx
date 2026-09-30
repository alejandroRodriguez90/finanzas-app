import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { Eye, EyeOff, Fingerprint, ArrowRight, Sparkles } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  /* ── Simular inicio de sesión ── */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(mode === 'login' ? '¡Bienvenido, Alejandro!' : '¡Cuenta creada con éxito!');
      setCurrentScreen('dashboard');
    }, 1600);
  };

  /* ── Acceso biométrico rápido ── */
  const handleBiometric = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast('Identidad verificada ✓');
      setCurrentScreen('dashboard');
    }, 1000);
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #07090f 0%, #0d1120 50%, #0a0e1a 100%)' }}
    >
      {/* ── Decoración de fondo ── */}
      <div
        className="absolute top-[-180px] right-[-120px] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(180,255,0,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-[-200px] left-[-100px] w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)',
        }}
      />

      {/* ── Contenedor de la tarjeta ── */}
      <div
        className="relative w-full max-w-sm mx-auto px-5"
      >
        {/* Logo / Marca */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #c8ff00, #6da000)',
              boxShadow: '0 0 36px rgba(180,255,0,0.4)',
            }}
          >
            <Sparkles className="w-8 h-8 text-black" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
          </h1>
          <p className="text-sm text-white/45 mt-1 text-center">
            {mode === 'login'
              ? 'Inicia sesión para continuar en Orbit'
              : 'Define tu identidad en la red Orbit'}
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '28px',
            padding: '28px 24px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Nombre (solo en registro) */}
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">
                Nombre completo
              </label>
              <input
                type="text"
                placeholder="Alejandro Rodriguez"
                className="w-full rounded-2xl px-4 py-3.5 text-sm font-medium text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(180,255,0,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="alejandro@orbit.io"
              className="w-full rounded-2xl px-4 py-3.5 text-sm font-medium text-white outline-none transition-all"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(180,255,0,0.5)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-xs font-bold text-white/50 uppercase tracking-widest mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="w-full rounded-2xl px-4 py-3.5 pr-12 text-sm font-medium text-white outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(180,255,0,0.5)')}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors cursor-pointer"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Olvidé la contraseña (solo login) */}
          {mode === 'login' && (
            <div className="text-right">
              <button
                type="button"
                className="text-xs font-semibold cursor-pointer transition-opacity hover:opacity-80"
                style={{ color: '#b4ff00' }}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {/* Botón principal */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm text-black transition-all duration-200 active:scale-98 mt-2 cursor-pointer"
            style={{
              background: loading
                ? 'rgba(180,255,0,0.5)'
                : 'radial-gradient(ellipse at 40% 40%, #c8ff00, #8bc400)',
              boxShadow: loading ? 'none' : '0 0 24px rgba(180,255,0,0.4)',
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Verificando...
              </span>
            ) : (
              <>
                {mode === 'login' ? 'Iniciar Sesión' : 'Crear Nodo'}{' '}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Separador */}
          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-xs text-white/30 font-medium">o</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Acceso biométrico */}
          <button
            type="button"
            onClick={handleBiometric}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 cursor-pointer"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.8)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
          >
            <Fingerprint className="w-5 h-5 text-blue-400" />
            Acceso Biométrico
          </button>
        </form>

        {/* Cambiar modo */}
        <p className="text-center text-sm text-white/40 mt-6 font-medium">
          {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
          <button
            onClick={() => setMode(m => m === 'login' ? 'register' : 'login')}
            className="font-bold cursor-pointer hover:opacity-80 transition-opacity"
            style={{ color: '#b4ff00' }}
          >
            {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>

        {/* Pie de página */}
        <p className="text-center text-[10px] text-white/20 mt-6 tracking-widest uppercase font-medium">
          Protegido por Orbit · Protocolo v4.4
        </p>
      </div>
    </div>
  );
};
