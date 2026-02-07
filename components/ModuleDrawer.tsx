
import React, { useState, useRef, useEffect } from 'react';
import { 
  X, CheckCircle, ArrowRight, Database, TrendingUp, Lightbulb, 
  MessageCircle, Send, Loader2, RefreshCw, Circle, ClipboardList, 
  BookOpen, Target, AlertCircle, Network, Route, Terminal, Rocket 
} from 'lucide-react';
import { ModuleData, ModuleStatus, BusinessProblem } from '../types';
import { GoogleGenAI } from '@google/genai';
import Term from './Term';

const ICON_MAP: Record<string, any> = {
  AlertCircle,
  Network,
  Route,
  Database,
  Terminal,
  Rocket
};

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type DrawerView = 'theory' | 'scaffold' | 'chat';

interface ModuleDrawerProps {
  module: ModuleData;
  status: ModuleStatus;
  onClose: () => void;
  onUpdateStatus: (status: ModuleStatus) => void;
  onNext: () => void;
  currentProblem: BusinessProblem | null;
}

const formatChatContent = (text: string) => {
  // Simple regex to clean common markdown artifacts that clutter the UI
  // Removes double asterisks for bolding but keeps text, etc.
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/#{1,6}\s?(.*)/g, '$1');
};

const ModuleDrawer: React.FC<ModuleDrawerProps> = ({ 
  module, 
  status,
  onClose, 
  onUpdateStatus, 
  onNext,
  currentProblem
}) => {
  const [activeView, setActiveView] = useState<DrawerView>('theory');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const ModuleIcon = ICON_MAP[module.iconName] || BookOpen;

  // Default to Blueprint if a problem is selected
  useEffect(() => {
    if (currentProblem) {
      setActiveView('scaffold');
    } else {
      setActiveView('theory');
    }
  }, [module.id, currentProblem?.id]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: `Analyst ready for "${module.title}". How can I help you bridge the gap between operations and analysis today?` 
        }
      ]);
    }
  }, [module.id, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, activeView]);

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `Topic: ${module.title}. Problem: ${currentProblem?.label || 'None selected'}. Question: ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: "You are an elite E-commerce Data Analyst. Be helpful, concise, and prioritize decisions over just data. DO NOT use markdown symbols like double asterisks (**) for bolding or hashtags (#) for headers. Use plain text with clear spacing and capital headers for structure."
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Connection error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const statusOptions: { value: ModuleStatus; label: string; icon: any }[] = [
    { value: 'to-learn', label: 'To Learn', icon: Circle },
    { value: 'needs-review', label: 'Review', icon: RefreshCw },
    { value: 'mastered', label: 'Mastered', icon: CheckCircle },
  ];

  const renderTheory = () => (
    <div className="p-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <section>
        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400 mb-3">Module Purpose</h4>
        <p className="text-2xl text-stone-600 leading-tight italic font-light tracking-tight">
          "{module.purpose}"
        </p>
      </section>

      <section>
        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400 mb-6">General Principles</h4>
        <ul className="space-y-6">
          {module.whatYouDo.map((item, i) => (
            <li key={i} className="flex gap-5 text-stone-800 items-start group">
              <span className="flex-shrink-0 w-8 h-8 rounded-2xl bg-stone-100 text-stone-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 flex items-center justify-center text-xs font-black mt-0.5 transition-colors">
                {i+1}
              </span>
              <span className="text-sm font-bold leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 bg-stone-50 rounded-[2rem] border border-stone-100 shadow-inner">
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
            <Database size={14} className="text-stone-300" /> Inputs
          </h4>
          <ul className="space-y-2">
            {module.inputsOutputs.inputs.map(input => (
              <li key={input} className="text-xs font-black text-stone-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-stone-200 rounded-full" />
                <Term name={input} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-4 flex items-center gap-2">
            <TrendingUp size={14} className="text-indigo-400" /> Outputs
          </h4>
          <ul className="space-y-2">
            {module.inputsOutputs.outputs.map(output => (
              <li key={output} className="text-xs font-black text-indigo-600 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-indigo-200 rounded-full" />
                <Term name={output} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100/50 relative">
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <Lightbulb size={60} />
        </div>
        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 mb-4 flex items-center gap-2">
          <Lightbulb size={18} /> Generic Example
        </h4>
        <p className="text-sm text-indigo-900 font-bold leading-relaxed italic pr-12">
          {module.example}
        </p>
      </section>
    </div>
  );

  const renderScaffold = () => {
    if (!currentProblem) return null;
    const blueprint = currentProblem.blueprints[module.id];

    return (
      <div className="p-10 space-y-12 animate-in slide-in-from-right-8 duration-500">
        <header className="pb-8 border-b border-stone-100">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-indigo-600 rounded-xl text-white">
              <ClipboardList size={20} />
            </div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full">Specific Analysis Blueprint</span>
          </div>
          <h3 className="text-4xl font-black text-stone-900 leading-tight tracking-tight mb-3">
            {currentProblem.label}
          </h3>
          <p className="text-stone-500 text-base leading-relaxed font-medium">
            Stage: {module.title}
          </p>
        </header>

        <section className="space-y-6">
          <div className="p-8 bg-indigo-50 rounded-[2.5rem] border border-indigo-100">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-600 mb-3">Task: {blueprint.title}</h4>
            <p className="text-xl font-black text-indigo-950 leading-tight mb-4">
              {blueprint.advice}
            </p>
            <div className="p-4 bg-white rounded-2xl shadow-sm border border-indigo-100 flex items-start gap-3">
              <div className="mt-1">
                <Target size={16} className="text-indigo-500" />
              </div>
              <p className="text-xs text-indigo-800 font-bold leading-relaxed">
                <span className="uppercase text-[9px] block text-indigo-400 mb-1">Immediate Analyst Action</span>
                {blueprint.action}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-stone-400 mb-6">Target Metrics for this Stage</h4>
          <div className="grid grid-cols-2 gap-4">
            {currentProblem.metricsToWatch.map(m => (
              <div key={m} className="p-4 bg-stone-50 rounded-2xl border border-stone-100 flex items-center justify-between">
                <span className="text-xs font-black text-stone-700">
                  <Term name={m} />
                </span>
                <TrendingUp size={14} className="text-stone-300" />
              </div>
            ))}
          </div>
        </section>

        <div className="p-8 bg-stone-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Target size={100} />
          </div>
          <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-indigo-400 mb-4">Analytical North Star</h4>
          <p className="text-base font-bold leading-relaxed italic relative z-10">
            "For {currentProblem.label.toLowerCase()} at the {module.title} stage, your goal is to move beyond the 'what' and define the 'why' using a comparative baseline."
          </p>
        </div>

        <button 
          onClick={() => setActiveView('theory')}
          className="w-full py-6 text-stone-400 font-black uppercase text-[10px] tracking-widest hover:text-indigo-600 transition-all"
        >
          View General Theory for this Module
        </button>
      </div>
    );
  };

  const renderChat = () => (
    <div className="flex flex-col h-full bg-stone-50 animate-in fade-in duration-300">
      <div ref={scrollRef} className="flex-1 p-8 space-y-8 overflow-y-auto scroll-smooth">
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 px-1">
                {m.role === 'user' ? 'Operator' : 'Expert Analyst'}
             </span>
            <div className={`max-w-[90%] p-5 rounded-[1.75rem] text-[14px] leading-relaxed shadow-sm transition-all duration-300 whitespace-pre-wrap ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                : 'bg-white border border-stone-200 text-stone-800 rounded-tl-none font-medium'
            }`}>
              {formatChatContent(m.content)}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-2 px-1">Expert Analyst</span>
            <div className="bg-white border border-stone-200 p-5 rounded-[1.75rem] rounded-tl-none shadow-sm flex items-center gap-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" />
              </div>
              <span className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Synthesizing Data...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-white border-t border-stone-100 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        <div className="relative group">
          <input 
            type="text" 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask a technical analyst question..."
            className="w-full pl-6 pr-16 py-6 bg-stone-100 border border-stone-200 rounded-[1.75rem] text-[15px] focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all font-medium placeholder:text-stone-400"
          />
          <button 
            onClick={handleSendMessage}
            disabled={isLoading || !chatInput.trim()}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-4 bg-indigo-600 text-white rounded-[1.25rem] disabled:bg-stone-200 disabled:shadow-none transition-all shadow-xl hover:bg-indigo-700 active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="mt-3 text-center text-[10px] text-stone-400 font-bold uppercase tracking-widest">
          Analyst mode active. Ask about logic, formulas, or decision criteria.
        </p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] animate-in fade-in duration-500" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] overflow-hidden">
        
        {/* Header */}
        <div className="bg-white z-20 p-8 flex items-center justify-between border-b border-stone-100 flex-shrink-0">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center shadow-inner ring-1 ring-indigo-100">
               <ModuleIcon size={32} />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-black text-stone-900 tracking-tight leading-none mb-1">{module.title}</h2>
              <p className="text-[11px] text-stone-400 font-bold uppercase tracking-[0.2em]">
                {activeView === 'theory' ? 'Conceptual Framework' : activeView === 'scaffold' ? 'Execution Blueprint' : 'Expert Consultation'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-stone-50 rounded-2xl transition-all text-stone-400 group">
            <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-white border-b border-stone-100 flex-shrink-0 px-8">
          {currentProblem && (
            <button 
              onClick={() => setActiveView('scaffold')}
              className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${activeView === 'scaffold' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
            >
              <div className="flex items-center justify-center gap-3">
                <ClipboardList size={16} /> Analysis Blueprint
              </div>
            </button>
          )}
          <button 
            onClick={() => setActiveView('theory')}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${activeView === 'theory' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            <div className="flex items-center justify-center gap-3">
              <BookOpen size={16} /> Principles
            </div>
          </button>
          <button 
            onClick={() => setActiveView('chat')}
            className={`flex-1 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all border-b-4 ${activeView === 'chat' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-stone-400 hover:text-stone-600'}`}
          >
            <div className="flex items-center justify-center gap-3">
              <MessageCircle size={16} /> Expert Chat
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
          {activeView === 'theory' && renderTheory()}
          {activeView === 'scaffold' && renderScaffold()}
          {activeView === 'chat' && renderChat()}
        </div>

        {/* Footer Actions */}
        <div className="bg-white p-8 border-t border-stone-100 flex flex-col gap-6 flex-shrink-0 z-30">
          <div className="flex flex-col gap-3">
             <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Update Your Progress</label>
             <div className="flex items-center gap-3">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onUpdateStatus(opt.value)}
                    className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      status === opt.value
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xl shadow-indigo-100 scale-105'
                        : 'bg-white border-stone-200 text-stone-500 hover:border-indigo-300'
                    }`}
                  >
                    <opt.icon size={16} />
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                ))}
             </div>
          </div>
          
          <button 
            onClick={onNext}
            className="flex items-center justify-center gap-3 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-sm bg-stone-900 text-white hover:bg-indigo-600 transition-all shadow-2xl group"
          >
            {module.nextStepLabel}
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleDrawer;
