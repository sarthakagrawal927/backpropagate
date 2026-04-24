
import { useGameStore } from '../store';
import { BOSSES } from '../data';
import { Shield, Target, AlertTriangle, Crosshair, Radar } from 'lucide-react';

export const OpenWorld = () => {
  const { neutralizedBosses, engageBoss } = useGameStore();

  return (
    <div className="w-full h-full bg-[#020202] relative overflow-hidden flex flex-col items-center justify-center p-8 text-left">
       {/* Map Grid Background */}
       <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf822_1px,transparent_1px),linear-gradient(to_bottom,#38bdf822_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
       </div>

       {/* Strategic NYC Map Layout (Simplified 2D) */}
       <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {BOSSES.map((boss) => {
            const isNeutralized = neutralizedBosses.includes(boss.id);
            return (
              <button
                key={boss.id}
                disabled={isNeutralized}
                onClick={() => engageBoss(boss)}
                className={`group relative glass-panel rounded-[2rem] p-8 border-white/5 transition-all duration-500 overflow-hidden ${isNeutralized ? 'opacity-30 grayscale cursor-default' : 'hover:scale-[1.02] hover:border-brand-primary/30 hover:bg-brand-primary/5'}`}
              >
                 <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-2xl bg-white/5 border border-white/10 ${isNeutralized ? 'text-green-500' : 'text-red-500 animate-pulse'}`}>
                       {isNeutralized ? <Shield size={24} /> : <AlertTriangle size={24} />}
                    </div>
                    <Radar className="text-white/10" size={40} />
                 </div>

                 <div className="space-y-4">
                    <div>
                       <p className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.4em]">Sector: {boss.location}</p>
                       <h3 className="text-2xl font-black text-white uppercase tracking-tighter mt-1">{boss.name}</h3>
                    </div>
                    
                    {!isNeutralized && (
                       <div className="flex items-center gap-4 py-4 border-t border-white/5">
                          <div className="flex-1">
                             <div className="flex justify-between text-[8px] font-black text-brand-muted uppercase mb-1">Threat Level</div>
                             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-red-500" style={{ width: `${boss.difficulty * 10}%` }}></div>
                             </div>
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between text-[8px] font-black text-brand-muted uppercase mb-1">Subagents</div>
                             <div className="flex gap-1">
                                {boss.subagents.map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>)}
                             </div>
                          </div>
                       </div>
                    )}

                    <div className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-brand-primary group-hover:text-black transition-all">
                       {isNeutralized ? (
                         <span className="text-xs font-black uppercase tracking-widest">PURGE_COMPLETE</span>
                       ) : (
                         <>
                           <Crosshair size={18} />
                           <span className="text-xs font-black uppercase tracking-widest italic underline decoration-2 underline-offset-4">Intercept Signature</span>
                         </>
                       )}
                    </div>
                 </div>

                 {/* Decorative background orbs for active targets */}
                 {!isNeutralized && (
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-500/10 blur-[60px] rounded-full group-hover:bg-red-500/20 transition-all"></div>
                 )}
              </button>
            );
          })}
       </div>

       {/* HUD Guidance */}
       <div className="mt-12 max-w-md w-full glass-panel rounded-2xl p-4 border-l-4 border-l-brand-primary bg-black/40 flex items-center gap-4 text-left">
          <Target className="text-brand-primary animate-pulse shrink-0" size={24} />
          <div>
             <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Current Intelligence</h4>
             <p className="text-xs text-brand-muted mt-1 leading-tight uppercase font-medium">Click on an active target signature to initialize neural combat.</p>
          </div>
       </div>
    </div>
  );
};
