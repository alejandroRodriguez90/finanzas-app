import React, { useState } from 'react';
import { useApp } from '../utils/AppContext';
import { ScanFace, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { setCurrentScreen, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [faceIdState, setFaceIdState] = useState<'idle' | 'scanning' | 'processing' | 'unlocked'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Por favor completa todos los campos');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(mode === 'login' ? '¡Bienvenido de vuelta!' : '¡Cuenta creada con éxito!');
      setCurrentScreen('dashboard');
    }, 1500);
  };

  const handleFaceId = () => {
    setFaceIdState('scanning');
    setTimeout(() => {
      setFaceIdState('processing');
      setTimeout(() => {
        setFaceIdState('unlocked');
        showToast('Face ID Verificado ✓');
        setTimeout(() => {
          setCurrentScreen('dashboard');
        }, 800);
      }, 1000);
    }, 1200);
  };

  const handleSocial = (provider: string) => {
    showToast(`Iniciando con ${provider}...`);
    setTimeout(() => {
      setCurrentScreen('dashboard');
    }, 1500);
  };

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 font-sans relative overflow-x-hidden overflow-y-auto bg-[#0A0A0A]"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% -10%, #202020 0%, #0A0A0A 60%)'
      }}
    >
      {/* Container to restrict size on desktop */}
      <div className="w-full max-w-[420px] flex flex-col items-center relative z-10 py-10">
        
        {/* Logo Placeholder (Like the 'ED' in reference) */}
        <div className="w-24 h-24 mb-10 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-800 rounded-2xl transform rotate-45 shadow-[0_0_40px_rgba(255,255,255,0.08)]"></div>
          <div className="absolute inset-1 bg-[#0A0A0A] rounded-[14px] transform rotate-45"></div>
          <span className="relative z-10 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 tracking-tighter">FZ</span>
        </div>

        {/* Login Card */}
        <div className="w-full bg-[#141415]/80 backdrop-blur-2xl border border-white/5 rounded-[32px] p-8 shadow-2xl relative">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-medium text-white tracking-wide">
              {mode === 'login' ? 'Welcome ' : 'Create '}
              <span className="text-[#CBA26C] font-semibold">{mode === 'login' ? 'Back' : 'Account'}</span>
            </h1>
            <p className="text-gray-400 text-[13px] mt-3 font-medium">
              {mode === 'login' ? 'Sign in to continue your financial journey' : 'Join to manage your wealth with style'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full h-14 bg-[#1C1C1E] border border-transparent rounded-2xl px-5 text-[14px] font-medium text-white outline-none transition-all focus:border-[#CBA26C] focus:bg-[#222224] placeholder-gray-500 shadow-inner"
              />
            </div>

            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full h-14 bg-[#1C1C1E] border border-transparent rounded-2xl pl-5 pr-12 text-[14px] font-medium text-white outline-none transition-all focus:border-[#CBA26C] focus:bg-[#222224] placeholder-gray-500 shadow-inner"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-end px-1 pt-1 pb-2">
              <button type="button" className="text-[13px] text-[#CBA26C] font-medium hover:opacity-80 transition-opacity">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading || faceIdState !== 'idle'}
              className="w-full h-[56px] rounded-2xl font-semibold text-[15px] text-[#0A0A0A] flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_10px_20px_rgba(203,162,108,0.15)] relative overflow-hidden cursor-pointer"
              style={{
                background: 'linear-gradient(90deg, #D5AE78 0%, #B88B52 100%)',
                opacity: loading ? 0.7 : 1
              }}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Sign Up'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 w-full my-8">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[12px] text-gray-500 font-medium">or continue with</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          {/* Social Row */}
          <div className="flex justify-center gap-5 mb-4">
            <button onClick={() => handleSocial('Google')} className="w-14 h-14 rounded-[18px] bg-[#1C1C1E] border border-white/5 flex items-center justify-center hover:bg-[#222224] transition-colors cursor-pointer">
              <svg viewBox="0 0 24 24" width="22" height="22">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button onClick={() => handleSocial('GitHub')} className="w-14 h-14 rounded-[18px] bg-[#1C1C1E] border border-white/5 flex items-center justify-center hover:bg-[#222224] transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </button>
            <button onClick={() => handleSocial('LinkedIn')} className="w-14 h-14 rounded-[18px] bg-[#1C1C1E] border border-white/5 flex items-center justify-center hover:bg-[#222224] transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[13px] text-gray-500">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setMode(m => m === 'login' ? 'register' : 'login')} className="text-[#CBA26C] font-semibold hover:opacity-80">
                {mode === 'login' ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

        </div>
        
        {/* Face ID Pro Option Component */}
        <div className="w-full mt-6">
          <button 
            onClick={handleFaceId}
            disabled={faceIdState !== 'idle'}
            className="w-full bg-[#141415]/60 backdrop-blur-xl border border-white/5 rounded-[24px] py-6 px-5 flex flex-col items-center justify-center gap-5 transition-all active:scale-95 hover:bg-[#141415]/80 group shadow-lg cursor-pointer"
          >
            <div className="flex items-center justify-center gap-6 text-[10.5px] font-bold tracking-[0.2em] text-gray-600">
              <span className={`transition-colors duration-300 ${faceIdState === 'scanning' ? 'text-[#34c759]' : ''}`}>SCANNING</span>
              <span className={`transition-colors duration-300 ${faceIdState === 'processing' ? 'text-[#34c759]' : ''}`}>PROCESSING</span>
              <span className={`transition-colors duration-300 ${faceIdState === 'unlocked' ? 'text-[#34c759]' : ''}`}>UNLOCKED</span>
            </div>
            
            <div className="flex justify-center w-full">
              {/* Face ID Dynamic Status Box (Centered) */}
              <div className={`w-[84px] h-[84px] rounded-[24px] bg-[#0A0A0A] border ${faceIdState !== 'idle' ? 'border-[#34c759]' : 'border-white/10'} flex items-center justify-center transition-colors duration-500 shadow-inner`}>
                 {faceIdState === 'idle' && <ScanFace className="w-10 h-10 text-[#34c759] transition-all" strokeWidth={1.5} />}
                 {faceIdState === 'scanning' && <ScanFace className="w-10 h-10 text-[#34c759] animate-pulse transition-all" strokeWidth={1.5} />}
                 {faceIdState === 'processing' && <span className="w-9 h-9 border-2 border-[#34c759]/30 border-t-[#34c759] rounded-full animate-spin transition-all" />}
                 {faceIdState === 'unlocked' && (
                   <svg className="w-12 h-12 text-[#34c759] drop-shadow-[0_0_12px_rgba(52,199,89,0.7)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                   </svg>
                 )}
              </div>
            </div>
            
            <p className="text-[11px] text-gray-500 uppercase tracking-widest mt-1 opacity-70">
              Biometric Authorization
            </p>
          </button>
        </div>

      </div>
    </div>
  );
};

