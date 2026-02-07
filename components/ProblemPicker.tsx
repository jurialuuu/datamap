
import React from 'react';
import { TrendingDown, AlertCircle, Target, Info } from 'lucide-react';
import { PROBLEMS } from '../constants';

interface ProblemPickerProps {
  selectedProblemId: string | null;
  onSelectProblem: (id: string) => void;
}

const ProblemPicker: React.FC<ProblemPickerProps> = ({ selectedProblemId, onSelectProblem }) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          1. Business Scenario 
          <div className="group relative">
            <Info size={12} className="cursor-help" />
            <div className="absolute left-0 top-full mt-2 w-48 bg-stone-900 text-white p-3 rounded-xl text-[9px] font-bold tracking-normal uppercase hidden group-hover:block z-50 shadow-2xl">
              Selecting a scenario updates the entire learning journey with tailored analysis advice.
            </div>
          </div>
        </h3>
        <p className="text-[11px] text-stone-500 font-medium mb-4 leading-relaxed">
          Choose a bottleneck to generate a custom analysis blueprint across all 6 map modules.
        </p>
      </div>

      <div className="space-y-3">
        {PROBLEMS.map((problem) => {
          const isActive = selectedProblemId === problem.id;
          return (
            <button
              key={problem.id}
              onClick={() => onSelectProblem(problem.id)}
              className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group flex items-start gap-4 relative overflow-hidden ${
                isActive 
                  ? 'bg-white border-indigo-600 ring-2 ring-indigo-600/10 shadow-xl' 
                  : 'bg-white border-stone-200 hover:border-indigo-300 hover:shadow-md'
              }`}
            >
              <div className={`mt-0.5 p-2.5 rounded-xl transition-colors ${isActive ? 'bg-indigo-600 text-white shadow-lg' : 'bg-stone-50 text-stone-400 group-hover:bg-indigo-50 group-hover:text-indigo-500'}`}>
                <TrendingDown size={20} />
              </div>
              
              <div className="flex-1">
                <h4 className={`text-sm font-black mb-1 tracking-tight ${isActive ? 'text-indigo-900' : 'text-stone-800'}`}>
                  {problem.label}
                </h4>
                <p className={`text-[10px] leading-relaxed line-clamp-2 ${isActive ? 'text-indigo-700/70 font-medium' : 'text-stone-500'}`}>
                  {problem.description}
                </p>
                
                {isActive && (
                  <div className="mt-3 pt-3 border-t border-indigo-50 flex items-center gap-2">
                    <Target size={12} className="text-indigo-600" />
                    <span className="text-[9px] font-black uppercase tracking-widest text-indigo-600">Active Blueprint Enabled</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedProblemId && (
        <div className="mt-4 p-5 bg-indigo-50 rounded-2xl border border-indigo-100 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-500">
          <h5 className="text-[9px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
            <Target size={12} /> Blueprint Ready
          </h5>
          <p className="text-[11px] text-indigo-900 font-bold leading-tight">
            Select any module on the map to see how to solve <span className="underline decoration-indigo-300">{PROBLEMS.find(p => p.id === selectedProblemId)?.label}</span> using those principles.
          </p>
          <div className="flex items-center gap-1.5 text-indigo-400">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest">Map Updated</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProblemPicker;
