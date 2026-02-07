
import React, { useState, useRef, useEffect } from 'react';
import { DEFINITIONS } from '../types';

interface TermProps {
  name: string;
  children?: React.ReactNode;
}

const Term: React.FC<TermProps> = ({ name, children }) => {
  const [coords, setCoords] = useState<{ x: number, y: number } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const definition = DEFINITIONS[name.toUpperCase()] || DEFINITIONS[name];
  
  if (!definition) return <>{children || name}</>;

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // Position tooltip centered horizontally relative to the trigger
      // and slightly above the trigger.
      setCoords({
        x: rect.left + rect.width / 2,
        y: rect.top
      });
    }
  };

  // Close tooltip on scroll or resize to prevent "floating" detached tooltips
  useEffect(() => {
    if (!coords) return;
    
    const handleEvents = () => setCoords(null);
    window.addEventListener('scroll', handleEvents, true);
    window.addEventListener('resize', handleEvents);
    
    return () => {
      window.removeEventListener('scroll', handleEvents, true);
      window.removeEventListener('resize', handleEvents);
    };
  }, [coords]);

  return (
    <span 
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setCoords(null)}
      className="inline-block relative"
    >
      <span className="border-b border-dotted border-stone-400 hover:border-indigo-500 hover:text-indigo-600 cursor-help transition-all duration-200">
        {children || name}
      </span>
      
      {coords && (
        <span 
          style={{ 
            position: 'fixed',
            left: `${coords.x}px`,
            top: `${coords.y - 12}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="w-64 bg-stone-900 text-white text-[11px] p-4 rounded-2xl leading-relaxed shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-[9999] normal-case font-medium tracking-normal text-center animate-in fade-in zoom-in-95 duration-200 pointer-events-none ring-1 ring-white/10"
        >
          <div className="font-black text-[9px] uppercase tracking-[0.2em] text-indigo-400 mb-2 border-b border-white/10 pb-2">
            Definition: {name}
          </div>
          {definition}
          <span 
            className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-stone-900" 
            style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))' }}
          />
        </span>
      )}
    </span>
  );
};

export default Term;
