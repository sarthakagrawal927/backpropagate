
import { useGameStore } from '../store';
import { Shield, Zap, Sword, Brain, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

export const BossBattle = () => {
  const { activeBoss, integrity, compute, strike, fortify, processTurn } = useGameStore();
  const [turn, setTurn] = useState<'PLAYER' | 'BOSS'>('PLAYER');
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (turn === 'BOSS' && activeBoss && !animating) {
      setAnimating(true);
      const timer = setTimeout(() => {
        processTurn();
        setTurn('PLAYER');
        setAnimating(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [turn, activeBoss, animating, processTurn]);

  if (!activeBoss) return null;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 animate-in fade-in zoom-in duration-500 text-left">
      <div className="flex justify-between items-center bg-brand-surface/40 p-6 rounded-3xl border border-white/5 shadow-2xl">
         <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-brand-primary/10 border border-brand-primary/30">
               <Brain size={24} className="text-brand-primary" />
            </div>
            <div>
               <p className="text-[10px] font-mono text-brand-muted uppercase tracking-[0.3em]">Threat Signature</p>
               <h2 className="text-xl font-black text-white uppercase">{activeBoss.name}</h2>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="text-right">
               <p className="text-[10px] font-mono text-brand-muted uppercase tracking-widest">Subagents</p>
               <div className="flex gap-2 mt-1">
                  {activeBoss.subagents.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded bg-brand-accent/20 border border-brand-accent/30 text-[8px] font-mono text-brand-accent uppercase">{s}</span>
                  ))}
               </div>
            </div>
            <div className="h-10 w-px bg-white/10"></div>
            <span className={`text-xs font-black px-4 py-2 rounded-full ${turn === 'PLAYER' ? 'bg-brand-primary text-black' : 'bg-red-500 text-white animate-pulse'}`}>
               {turn === 'PLAYER' ? 'YOUR TURN' : 'AI ATTACKING'}
            </span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <div className="glass-panel rounded-[3rem] p-10 border-brand-primary/20 space-y-8 relative overflow-hidden">
            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Timeline Guardian</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                  <div className="flex justify-between items-end text-left">
                     <span className="text-[10px] text-brand-muted font-bold uppercase flex items-center gap-2 text-left"><Activity size={12} /> Integrity</span>
                     <span className="text-2xl font-black text-white">{integrity}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]"><div className="h-full bg-brand-primary rounded-full shadow-[0_0_15px_#38bdf8] transition-all duration-500" style={{ width: `${integrity}%` }}></div></div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between items-end text-left">
                     <span className="text-[10px] text-brand-muted font-bold uppercase flex items-center gap-2 text-left"><Zap size={12} /> Compute</span>
                     <span className="text-2xl font-black text-white">{compute}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]"><div className="h-full bg-brand-accent rounded-full shadow-[0_0_15px_#818cf8] transition-all duration-500" style={{ width: `${compute}%` }}></div></div>
               </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
               <button disabled={turn === 'BOSS' || compute < 25} onClick={() => { strike(); setTurn('BOSS'); }} className="p-6 rounded-3xl border border-brand-primary/20 bg-brand-primary/10 hover:bg-brand-primary hover:text-black transition-all flex flex-col items-center gap-2 disabled:opacity-20"><Sword size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">Strike</span></button>
               <button disabled={turn === 'BOSS'} onClick={() => { fortify(); setTurn('BOSS'); }} className="p-6 rounded-3xl border border-brand-accent/20 bg-brand-accent/10 hover:bg-brand-accent hover:text-white transition-all flex flex-col items-center gap-2 disabled:opacity-20"><Shield size={24} /> <span className="text-[10px] font-black uppercase tracking-widest">Fortify</span></button>
            </div>
         </div>

         <div className="glass-panel rounded-[3rem] p-10 border-red-500/20 space-y-8 relative overflow-hidden bg-red-500/5">
            <h3 className="text-lg font-black text-red-500 uppercase italic tracking-tighter">Rogue AI Target</h3>
            <div className="flex-1 flex flex-col items-center justify-center py-6 gap-6">
               <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden border-2 border-red-500/40 shadow-2xl rotate-3"><img src={activeBoss.image} alt="" className="w-full h-full object-cover grayscale opacity-80" /></div>
               <div className="text-center"><p className="text-white font-medium italic">"{activeBoss.goal}"</p></div>
               <div className="w-full grid grid-cols-2 gap-4 text-left"><div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center text-left"><p className="text-[8px] text-brand-muted uppercase font-bold mb-1">Difficulty</p><p className="text-lg font-black text-red-500 text-left">LVL {activeBoss.difficulty}</p></div><div className="p-4 rounded-2xl bg-black/40 border border-white/5 text-center text-left"><p className="text-[8px] text-brand-muted uppercase font-bold mb-1 text-left">Threat</p><p className="text-lg font-black text-brand-accent text-left">HIGH</p></div></div>
            </div>
         </div>
      </div>
    </div>
  );
};
