import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-16 h-16'
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-extrabold',
    lg: 'text-3xl font-black'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Luxury emblem badge */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-0.5 shadow-lg shadow-amber-950/40 shrink-0 ${iconSizes[size]}`}>
        <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-stone-900 to-stone-950 flex items-center justify-center border border-amber-400/30">
          {/* Custom Grill & Star SVG Emblem */}
          <svg viewBox="0 0 40 40" fill="none" className="w-3/4 h-3/4 text-amber-400">
            {/* Top Star */}
            <path
              d="M20 3L22.2 8.5L28 9.3L23.8 13.3L25 19L20 16L15 19L16.2 13.3L12 9.3L17.8 8.5L20 3Z"
              fill="currentColor"
            />
            {/* Flames / Grill elements */}
            <path
              d="M12 24C12 21 15 19 16 17C17 20 19 21 19 24C19 27 16.5 29 13.5 29C12.5 28 12 26 12 24Z"
              fill="#EF4444"
              opacity="0.9"
            />
            <path
              d="M28 24C28 21 25 19 24 17C23 20 21 21 21 24C21 27 23.5 29 26.5 29C27.5 28 28 26 28 24Z"
              fill="#F59E0B"
            />
            <path
              d="M20 22C20 20 21 19 22 18C22.5 19.5 23 20 23 22C23 23.5 22 24.5 20.5 24.5C20.2 24.5 20 23 20 22Z"
              fill="#FEF08A"
            />
            {/* Charcoal Grill Grate */}
            <line x1="8" y1="31" x2="32" y2="31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <line x1="11" y1="35" x2="29" y2="35" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col text-right">
        <span className={`tracking-tight text-white ${titleSizes[size]} leading-tight`}>
          مطعم <span className="text-amber-400">أولاد نجم</span>
        </span>
        {showSubtitle && (
          <span className="text-[11px] text-amber-200/80 font-medium tracking-wide">
            لجميع أنواع المشويات على الفحم
          </span>
        )}
      </div>
    </div>
  );
};
