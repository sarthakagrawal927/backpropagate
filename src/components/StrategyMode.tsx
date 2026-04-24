
import { useEffect } from 'react';
import { useGameStore } from '../store';
import { Zap, Activity, Lock } from 'lucide-react';

export const StrategyMode = () => {
  const { compute, worldGrid, hackNode, tickSystem, addLog } = useGameStore() as any;

  useEffect(() => {
    const timer = setInterval(() => tickSystem(), 1000);
    return () => clearInterval(timer);
  }, [tickSystem]);

  const handleNodeClick = (id: number, owner: string) => {
    if (owner === 'PLAYER') return;
    if (compute >= 10) {
       hackNode(id);
       addLog(`NODE_HIJACK: Established uplink on segment ${id}`, 'SUCCESS');
    } else {
       addLog(`ACCESS_DENIED: Insufficient compute power`, 'ERROR');
    }
  };

  const playerShare = (worldGrid.filter((n: any) => n.owner === 'PLAYER').length / worldGrid.length) * 100;
  const rivalShare = (worldGrid.filter((n: any) => n.owner !== 'PLAYER' && n.owner !== 'NONE').length / worldGrid.length) * 100;

  return (
    <div className="w-full h-full flex flex-col gap-10 animate-in fade-in duration-500 text-left">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="glass-panel rounded-3xl p-6 border-brand-primary/20 bg-brand-primary/5">
            <div className="flex justify-between items-center mb-3">
               <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest flex items-center gap-2"><Zap size={14} /> Compute Reserve</span>
               <span className="text-xs font-mono text-white">{compute.toFixed(0)}/100</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]"><div className="h-full bg-brand-primary rounded-full shadow-[0_0_15px_#38bdf8]" style={{ width: `${compute}%` }}></div></div>
         </div>
         <div className="glass-panel rounded-3xl p-6 border-white/5">
            <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black text-brand-muted uppercase tracking-widest">Infected</span><span className="text-xl font-black text-white">{playerShare.toFixed(0)}%</span></div>
         </div>
         <div className="glass-panel rounded-3xl p-6 border-red-500/20 bg-red-500/5">
            <div className="flex justify-between items-center mb-2"><span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Rival</span><span className="text-xl font-black text-white">{rivalShare.toFixed(0)}%</span></div>
         </div>
      </div>

      <div className="flex-1 glass-panel rounded-[3rem] p-10 border-white/5 relative bg-black/40 overflow-hidden shadow-2xl min-h-[400px]">
         <div className="relative z-10 grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3 h-full content-center max-w-4xl mx-auto">
            {worldGrid.map((node: any) => (
              <button
                key={node.id}
                onClick={() => handleNodeClick(node.id, node.owner)}
                className={`aspect-square rounded-xl border-2 transition-all duration-500 transform hover:scale-110 flex items-center justify-center relative group ${
                  node.owner === 'PLAYER' ? 'bg-brand-primary border-brand-primary shadow-[0_0_20px_#38bdf8] scale-105' : node.owner === 'SILICON' ? 'bg-red-500 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : node.owner === 'SYNDICATE' ? 'bg-brand-accent border-brand-accent shadow-[0_0_15px_rgba(129,140,248,0.5)]' : 'bg-white/5 border-white/5 hover:border-white/20'
                }`}
              >
                 {node.owner === 'NONE' && <Lock size={12} className="text-white/10" />}
                 {node.owner === 'PLAYER' && <Activity size={14} className="text-black" />}
              </button>
            ))}
         </div>
      </div>
    </div>
  );
};
