
import React, { useState } from 'react';
import { Copy, Check, FileText, Target, Award, ArrowRight } from 'lucide-react';

type Role = 'Data Analyst' | 'Growth Analyst' | 'Product Analyst';
type Seniority = 'Intern' | 'Junior' | 'Mid-level';

const ResumeTranslator: React.FC = () => {
  const [input, setInput] = useState('');
  const [role, setRole] = useState<Role>('Data Analyst');
  const [seniority, setSeniority] = useState<Seniority>('Junior');
  const [copied, setCopied] = useState(false);

  const translateToAnalyst = (raw: string) => {
    const lines = raw.split('\n').filter(l => l.trim().length > 5);
    if (lines.length === 0) return ["Start typing your operational experience (e.g., 'managed meta ads')."];

    // Rule-based transformation templates
    const templates = [
      (txt: string) => `Leveraged analytical frameworks to optimize ${txt.toLowerCase()}, driving a measurable increase in unit economics efficiency.`,
      (txt: string) => `Performed deep-dive exploratory data analysis on ${txt.toLowerCase()} to isolate high-impact conversion levers.`,
      (txt: string) => `Developed automated dashboarding solutions to monitor performance of ${txt.toLowerCase()}, reducing reporting latency for stakeholders.`,
      (txt: string) => `Applied statistical methodology to validate hypotheses regarding ${txt.toLowerCase()}, resulting in optimized budget allocation.`,
      (txt: string) => `Decomposed complex business objectives into actionable data-driven strategies for ${txt.toLowerCase()}.`,
      (txt: string) => `Identified and mitigated risk factors within ${txt.toLowerCase()} through robust cohort and funnel analysis.`,
    ];

    return lines.slice(0, 8).map((line, i) => {
      const template = templates[i % templates.length];
      let output = template(line.replace(/^[•*-]\s*/, ''));
      
      // Adjust for seniority
      if (seniority === 'Intern') output = output.replace(/Developed|Leveraged|Performed/, 'Assisted in');
      if (seniority === 'Mid-level') output = output.replace(/driving a measurable/, 'orchestrating a 15%+').replace(/Developed/, 'Architected');

      // Adjust for role focus
      if (role === 'Growth Analyst') output = output.replace(/unit economics/, 'CAC/LTV ratios');
      if (role === 'Product Analyst') output = output.replace(/unit economics/, 'feature engagement loops');

      return output;
    });
  };

  const bullets = translateToAnalyst(input);

  const handleCopy = () => {
    navigator.clipboard.writeText(bullets.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full bg-stone-50 overflow-y-auto p-8 lg:p-12">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2">
             <Award size={14} /> Career Accelerator
          </div>
          <h1 className="text-5xl font-black text-stone-900 tracking-tight">Resume Translator</h1>
          <p className="text-lg text-stone-500 font-medium leading-relaxed">
            Convert your operational "execution" bullets into strategic "analytical" impact statements.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side: Input & Config */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-stone-200 shadow-xl space-y-8">
              <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Configuration</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block ml-1">Target Role</span>
                    <select 
                      value={role}
                      onChange={(e) => setRole(e.target.value as Role)}
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                    >
                      <option>Data Analyst</option>
                      <option>Growth Analyst</option>
                      <option>Product Analyst</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest block ml-1">Experience Level</span>
                    <select 
                      value={seniority}
                      onChange={(e) => setSeniority(e.target.value as Seniority)}
                      className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 appearance-none cursor-pointer"
                    >
                      <option>Intern</option>
                      <option>Junior</option>
                      <option>Mid-level</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-1">Operational Responsibilities</label>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Managed Google Ads campaigns...&#10;Handled customer retention emails...&#10;Updated shopify product pages..."
                  className="w-full h-64 p-6 bg-stone-50 border border-stone-200 rounded-[2rem] text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white transition-all resize-none"
                />
              </section>
            </div>
          </div>

          {/* Right Side: Output */}
          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="bg-stone-900 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-stone-900/50 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
                    <Target size={18} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Analyst Impact Statements</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase transition-all border border-white/5"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy All'}
                </button>
              </div>

              <div className="flex-1 p-8 space-y-6 overflow-y-auto custom-scrollbar">
                {bullets.map((bullet, i) => (
                  <div key={i} className="group flex gap-5 animate-in slide-in-from-right duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 text-white/20 font-black text-[10px] flex items-center justify-center group-hover:border-indigo-500 group-hover:text-indigo-500 transition-all">
                      {i + 1}
                    </div>
                    <p className="text-white font-medium text-sm leading-relaxed pt-1 group-hover:text-white transition-colors">
                      {bullet}
                    </p>
                  </div>
                ))}
                
                {input.trim().length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30 pt-12">
                    <FileText size={64} className="text-stone-500" />
                    <p className="text-xs font-black uppercase tracking-widest text-stone-500">Awaiting input data...</p>
                  </div>
                )}
              </div>

              <div className="p-8 bg-indigo-600/10 border-t border-white/5">
                <p className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest leading-relaxed">
                  Tip: Analysts focus on verbs like "Isolate", "Validate", "Decompose", and "De-risk". These statements signal that you understand the mathematical levers of the business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTranslator;
