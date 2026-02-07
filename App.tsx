
import React, { useState, useEffect, useMemo } from 'react';
import { 
  AppTab, 
  ModuleId,
  ModuleStatus
} from './types';
import { MODULES, PROBLEMS, CASES } from './constants';

// Internal Components
import Layout from './components/Layout';
import LearningMap from './components/LearningMap';
import ModuleDrawer from './components/ModuleDrawer';
import ProblemPicker from './components/ProblemPicker';
import CaseWalkthrough from './components/CaseWalkthrough';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Map);
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId | null>(null);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  
  // Per-problem module statuses: Record<problemId, Record<ModuleId, ModuleStatus>>
  const [allStatuses, setAllStatuses] = useState<Record<string, Record<ModuleId, ModuleStatus>>>(() => ({}));

  // Load persistence
  useEffect(() => {
    const savedAllStatuses = localStorage.getItem('oa_all_statuses');
    const savedProblem = localStorage.getItem('oa_selected_problem');
    if (savedAllStatuses) setAllStatuses(JSON.parse(savedAllStatuses));
    if (savedProblem) setSelectedProblemId(savedProblem);
  }, []);

  // Save persistence
  useEffect(() => {
    if (Object.keys(allStatuses).length > 0) {
      localStorage.setItem('oa_all_statuses', JSON.stringify(allStatuses));
    }
  }, [allStatuses]);

  useEffect(() => {
    if (selectedProblemId) {
      localStorage.setItem('oa_selected_problem', selectedProblemId);
    }
  }, [selectedProblemId]);

  const currentProblemId = selectedProblemId || 'general';

  const currentModuleStatuses = useMemo(() => {
    const statuses = allStatuses[currentProblemId];
    if (statuses) return statuses;
    
    // Default initial state for a new problem context
    return {
      0: 'to-learn',
      1: 'to-learn',
      2: 'to-learn',
      3: 'to-learn',
      4: 'to-learn',
      5: 'to-learn'
    } as Record<ModuleId, ModuleStatus>;
  }, [allStatuses, currentProblemId]);

  const updateModuleStatus = (id: ModuleId, status: ModuleStatus) => {
    setAllStatuses(prev => ({
      ...prev,
      [currentProblemId]: {
        ...currentModuleStatuses,
        [id]: status
      }
    }));
  };

  const currentProblem = useMemo(() => 
    PROBLEMS.find(p => p.id === selectedProblemId) || null,
    [selectedProblemId]
  );

  // Progress is % of modules in the current path that are not 'to-learn'
  const progress = useMemo(() => {
    const nonPending = Object.values(currentModuleStatuses).filter(s => s !== 'to-learn').length;
    return (nonPending / MODULES.length) * 100;
  }, [currentModuleStatuses]);

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.Map:
        return (
          <div className="flex flex-col lg:flex-row h-full w-full overflow-hidden">
            <div className="w-full lg:w-96 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white p-6 flex flex-col gap-6 overflow-y-auto z-10 max-h-[40vh] lg:max-h-full">
              <ProblemPicker 
                selectedProblemId={selectedProblemId} 
                onSelectProblem={setSelectedProblemId} 
              />
              
              <div className="mt-auto p-6 bg-stone-50 rounded-2xl border border-stone-200 border-dashed">
                <p className="text-[11px] text-stone-500 italic font-medium leading-relaxed">
                  {currentProblem 
                    ? `Current Path: "${currentProblem.label}". Your thinking blueprint is now active across all modules. View Module 2 (Analysis Path Selector) for the core scaffold.` 
                    : "Selection Needed: Choose a problem above to unlock a custom analysis journey across the map."}
                </p>
              </div>
            </div>
            
            <div className="flex-1 relative bg-stone-50 overflow-hidden">
              <LearningMap 
                modules={MODULES}
                moduleStatuses={currentModuleStatuses}
                selectedModuleId={selectedModuleId}
                onSelectModule={setSelectedModuleId}
                highlightedModules={currentProblem?.suggestedModules || []}
              />
            </div>
          </div>
        );
      case AppTab.Cases:
        return <CaseWalkthrough cases={CASES} />;
      case AppTab.About:
        return (
          <div className="max-w-3xl mx-auto py-16 px-6 overflow-y-auto h-full pb-32">
            <h1 className="text-5xl font-black text-stone-900 mb-8 tracking-tight">Operator → Analyst</h1>
            <div className="prose prose-stone max-w-none">
              <p className="text-xl text-stone-600 mb-8 leading-relaxed font-light">
                The most successful e-commerce teams are those where operators don't just "execute," but understand the mathematical levers driving the business.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
                <div className="p-8 bg-white rounded-3xl border border-stone-200 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-stone-200 group-hover:bg-stone-400 transition-colors" />
                  <h3 className="font-black text-stone-900 mb-4 uppercase text-[10px] tracking-[0.2em]">The Operator Mode</h3>
                  <p className="text-sm text-stone-500 leading-relaxed">Focused on execution speed, tactical campaign management, and output. Views data as a retrospective scoreboard of past effort.</p>
                </div>
                <div className="p-8 bg-indigo-600 rounded-3xl border border-indigo-700 shadow-2xl text-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-400" />
                  <h3 className="font-black mb-4 uppercase text-[10px] tracking-[0.2em] text-indigo-100">The Analyst Mode</h3>
                  <p className="text-sm text-indigo-100 leading-relaxed">Focused on probability, unit economics, and variable interaction. Views data as a strategic lever to mitigate risk and compound capital.</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-stone-900 mt-16 mb-6">Mastery Journey</h2>
              <p className="text-stone-600 leading-relaxed mb-8">
                This tool is designed to move you from left to right. By selecting a business problem, you see how an analyst decomposes stress into steps, tools, and decisions. Each path tracks progress separately, ensuring you master the specific nuance of every scenario.
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      progress={progress}
    >
      {renderContent()}

      {selectedModuleId !== null && (
        <ModuleDrawer 
          module={MODULES.find(m => m.id === selectedModuleId)!}
          status={currentModuleStatuses[selectedModuleId]}
          onClose={() => setSelectedModuleId(null)}
          onUpdateStatus={(status) => updateModuleStatus(selectedModuleId, status)}
          currentProblem={currentProblem}
          onNext={() => {
            const nextId = (selectedModuleId + 1) as ModuleId;
            if (nextId < MODULES.length) {
              setSelectedModuleId(nextId);
            } else {
              setSelectedModuleId(null);
            }
          }}
        />
      )}
    </Layout>
  );
};

export default App;
