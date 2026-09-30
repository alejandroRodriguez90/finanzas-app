import React from 'react';

interface OrbitLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  glow?: boolean;
}

export const OrbitLogo: React.FC<OrbitLogoProps> = ({ size = 'md', glow = false }) => {
  const scaleMap = {
    sm: 0.6,
    md: 1,
    lg: 1.5,
    xl: 2.2
  };

  const scale = scaleMap[size];

  return (
    <div 
      className={`relative inline-flex items-end transition-transform duration-300 ${glow ? 'drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]' : ''}`}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        padding: '8px'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
        {/* Polygon Pyramid Triangle */}
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '28px solid transparent',
            borderBottom: '48px solid #FFFFFF',
            borderRight: '0px solid transparent',
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'
          }}
        />
        {/* Floating Square Node */}
        <div
          style={{
            width: '18px',
            height: '18px',
            backgroundColor: '#FFFFFF',
            borderRadius: '3px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            marginBottom: '0px'
          }}
        />
      </div>
    </div>
  );
};
