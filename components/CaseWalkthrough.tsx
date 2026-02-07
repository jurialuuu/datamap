
import React, { useState } from 'react';
import { CaseStudy } from '../types';
import { 
  BarChart as ChartIcon, 
  Layers, 
  Search, 
  MessageSquare, 
  Copy, 
  Check,
  ChevronRight,
  Target
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line 
} from 'recharts';

interface CaseWalkthroughProps {
  cases: CaseStudy[];
}

const CaseWalkthrough: React.FC<CaseWalkthroughProps> = ({ cases }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0].id);
  const [copied, setCopied] = useState(false);

  const selectedCase = cases.find(c => c.id === selectedCaseId)!;

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedCase.emailTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-full bg-white">
      {/* Sidebar Selector */}
      <div className="w-80 border-r border-stone-100 bg-stone-50/50 p-6 space-y-4">
        <h3 className="text-xs font-black text-stone-400 uppercase tracking-widest">Select Case</h3>
        {cases.map(c => (
          <button
            key={c.id}
            onClick={() => setSelectedCaseId(c.id)}
            className={`w-full text-left p-4 rounded-2xl border transition-all ${
              selectedCaseId === c.id 
                ? 'bg-white border-indigo-600 shadow-md ring-1 ring-indigo-600/10' 
                : 'bg-transparent border-transparent hover:bg-stone-100 text-stone-500'
            }`}
          >
            <span className="text-[10px] font-bold text-indigo-500 uppercase block mb-1">{c.category}</span>
            <h4 className="text-sm font-bold text-stone-900 leading-tight">{c.title}</h4>
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-white p-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-bold uppercase rounded-full tracking-wider">
              {selectedCase.category}
            </span>
            <h1 className="text-4xl font-bold text-stone-900 mt-4 mb-4">{selectedCase.title}</h1>
            <p className="text-xl text-stone-500 leading-relaxed font-light">{selectedCase.context}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hypothesis Tree */}
            <section className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">
                <Target size={18} className="text-indigo-600" />
                Hypothesis Tree
              </h3>
              <ul className="space-y-4">
                {selectedCase.hypothesisTree.map((hypo, i) => (
                  <li key={i} className="flex gap-3 text-stone-700 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-indigo-400 mt-1.5" />
                    {hypo}
                  </li>
                ))}
              </ul>
            </section>

            {/* Required Data */}
            <section className="bg-stone-50 p-8 rounded-3xl border border-stone-100">
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest mb-6">
                <Layers size={18} className="text-green-600" />
                Data Sources
              </h3>
              <ul className="space-y-4">
                {selectedCase.requiredData.map((data, i) => (
                  <li key={i} className="flex gap-3 text-stone-700 text-sm leading-relaxed">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400 mt-1.5" />
                    {data}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Analysis Steps */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest mb-8">
              <Search size={18} className="text-orange-500" />
              Analysis Workflow
            </h3>
            <div className="space-y-4">
              {selectedCase.analysisSteps.map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-5 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group">
                  <div className="w-10 h-10 rounded-full bg-stone-50 text-stone-400 font-bold flex items-center justify-center group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    {i+1}
                  </div>
                  <p className="font-medium text-stone-800">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Mock Charts */}
          <section>
            <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest mb-8">
              <ChartIcon size={18} className="text-blue-500" />
              Core Visualization
            </h3>
            <div className="h-[400px] w-full bg-stone-50 border border-stone-100 rounded-3xl p-8">
              <ResponsiveContainer width="100%" height="100%">
                {selectedCase.id === 'case-a' ? (
                  <BarChart data={selectedCase.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'ROAS (x)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="roas" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                ) : (
                  <LineChart data={selectedCase.chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Repeat %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="repeatRate" stroke="#10b981" strokeWidth={4} dot={{ r: 6 }} />
                  </LineChart>
                )}
              </ResponsiveContainer>
              <p className="text-center text-stone-400 text-xs mt-4 italic">
                Data highlighting the primary performance anomaly.
              </p>
            </div>
          </section>

          {/* Decision & Recommendation */}
          <section className="bg-indigo-600 text-white p-10 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ChevronRight size={120} />
            </div>
            <div className="relative z-10">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-80">Final Recommendation</h3>
              <p className="text-2xl font-bold leading-snug">
                {selectedCase.recommendation}
              </p>
            </div>
          </section>

          {/* Email Template */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900 uppercase tracking-widest">
                <MessageSquare size={18} className="text-stone-400" />
                Communication Template
              </h3>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg text-xs font-bold transition-all"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Template'}
              </button>
            </div>
            <div className="bg-stone-900 text-stone-300 p-8 rounded-2xl font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {selectedCase.emailTemplate}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CaseWalkthrough;
