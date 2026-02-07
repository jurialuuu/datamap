
import React from 'react';
import { ModuleData, ModuleId, ModuleStatus } from '../types';
import { CheckCircle, Circle, MapPin, RefreshCw, Info } from 'lucide-react';

interface LearningMapProps {
  modules: ModuleData[];
  moduleStatuses: Record<ModuleId, ModuleStatus>;
  selectedModuleId: ModuleId | null;
  onSelectModule: (id: ModuleId) => void;
  highlightedModules: ModuleId[];
}

const LearningMap: React.FC<LearningMapProps> = ({ 
  modules, 
  moduleStatuses, 
  selectedModuleId, 
  onSelectModule,
  highlightedModules
}) => {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-auto bg-stone-50 scroll-smooth">
      {/* Container adapts from vertical column on mobile to horizontal on desktop */}
      <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-16 lg:gap-20 p-12 lg:p-32 pb-80 lg:pb-32 min-h-full lg:min-w-[1500px] relative">
        
        {/* Connection Path SVG - Desktop Only */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 z-0 hidden lg:block">
          <path
            d="M 150 400 Q 750 150 1350 400"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>

        {modules.map((module, index) => {
          const status = moduleStatuses[module.id];
          const isSelected = selectedModuleId === module.id;
          const isHighlighted = highlightedModules.includes(module.id);
          
          let displayStatusLabel = "To Learn";
          let nodeBg = "bg-white text-stone-300";
          let Icon = Circle;

          if (status === 'mastered') {
            displayStatusLabel = "Mastered";
            nodeBg = "bg-green-500 text-white shadow-green-200/50";
            Icon = CheckCircle;
          } else if (status === 'needs-review') {
            displayStatusLabel = "Reviewing";
            nodeBg = "bg-orange-400 text-white shadow-orange-200/50";
            Icon = RefreshCw;
          }

          if (isSelected) {
            nodeBg = "bg-indigo-600 text-white ring-8 ring-indigo-500/10 scale-110 shadow-2xl z-20";
          }

          return (
            <div 
              key={module.id} 
              className="relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-500"
              onClick={() => onSelectModule(module.id)}
            >
              {/* Connector Line (Vertical on mobile, horizontal on desktop) */}
              {index < modules.length - 1 && (
                <>
                  <div className="absolute top-24 left-1/2 -translate-x-1/2 w-0.5 h-16 bg-stone-200 lg:hidden" />
                  <div className="absolute top-12 -right-20 w-20 h-0.5 bg-stone-200/50 hidden lg:block" />
                </>
              )}

              {/* Module Node */}
              <div className={`
                w-28 h-28 rounded-[3rem] flex items-center justify-center transition-all duration-500 shadow-xl relative
                ${nodeBg}
                ${isHighlighted ? 'ring-4 ring-indigo-500 ring-offset-4 ring-opacity-100 shadow-indigo-300' : 'ring-1 ring-stone-200'}
              `}>
                <Icon size={48} strokeWidth={status === 'to-learn' ? 1.5 : 2.5} className={status === 'needs-review' ? 'animate-spin-slow' : ''} />
                
                {/* Active Path Pin */}
                {isHighlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce z-20 group/pin">
                    <MapPin size={16} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:block w-32 bg-stone-900 text-white text-[9px] font-bold uppercase p-2 rounded-lg text-center leading-tight shadow-xl">
                      Custom Analytical Blueprint Active
                    </div>
                  </div>
                )}

                {/* Module ID Badge */}
                <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-white border border-stone-200 text-stone-900 font-black text-xs flex items-center justify-center shadow-md">
                  {module.id}
                </div>
              </div>

              {/* Module Info Label */}
              <div className="mt-8 text-center max-w-[180px]">
                <h3 className={`text-base font-black mb-1 transition-colors tracking-tight ${isSelected ? 'text-indigo-600' : 'text-stone-900'}`}>
                  {module.title}
                </h3>
                <p className="text-[10px] text-stone-400 font-black uppercase tracking-widest mb-1">
                  {displayStatusLabel}
                </p>
              </div>

              {/* Status Pill */}
              <div className={`mt-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border transition-all shadow-sm
                ${status === 'mastered' ? 'bg-green-50 border-green-200 text-green-700' : 
                  status === 'needs-review' ? 'bg-orange-50 border-orange-200 text-orange-700' : 
                  isHighlighted ? 'bg-indigo-600 border-indigo-600 text-white scale-105 shadow-indigo-100' :
                  'bg-white border-stone-200 text-stone-400'}
              `}>
                {status === 'mastered' ? "Mastered" : isHighlighted ? "Active Path" : status === 'needs-review' ? "Review" : "To Learn"}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="sticky bottom-8 left-1/2 -translate-x-1/2 w-fit mx-auto bg-white/95 backdrop-blur-xl px-8 py-5 rounded-[2.5rem] border border-stone-200 flex items-center gap-10 shadow-2xl z-30 ring-1 ring-black/5 mb-10">
         <div className="flex items-center gap-3 text-[10px] font-black text-stone-800 uppercase tracking-widest group relative">
           <div className="w-5 h-5 rounded-lg bg-indigo-600 shadow-lg flex items-center justify-center"><MapPin size={10} className="text-white" /></div>
           <span className="hidden sm:inline">Active Path</span>
           <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-48 bg-stone-900 text-white text-[9px] font-bold uppercase p-3 rounded-xl leading-relaxed text-center shadow-2xl">
             Tailored sequence specifically for your selected business scenario.
           </div>
         </div>
         <div className="flex items-center gap-3 text-[10px] font-black text-stone-800 uppercase tracking-widest group">
           <div className="w-5 h-5 rounded-lg bg-green-500 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110"><CheckCircle size={10} className="text-white" /></div>
           <span className="hidden sm:inline">Mastered</span>
         </div>
         <div className="flex items-center gap-3 text-[10px] font-black text-stone-800 uppercase tracking-widest group">
           <div className="w-5 h-5 rounded-lg bg-orange-400 shadow-lg flex items-center justify-center transition-transform group-hover:scale-110"><RefreshCw size={10} className="text-white" /></div>
           <span className="hidden sm:inline">Review</span>
         </div>
         <div className="flex items-center gap-3 text-[10px] font-black text-stone-800 uppercase tracking-widest group">
           <div className="w-5 h-5 rounded-lg bg-white border-2 border-stone-200 flex items-center justify-center transition-transform group-hover:scale-110"><Circle size={10} className="text-stone-300" /></div>
           <span className="hidden sm:inline">To Learn</span>
         </div>
      </div>
    </div>
  );
};

export default LearningMap;
