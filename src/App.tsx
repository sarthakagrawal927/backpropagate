
import { useGameStore } from './store';
import { BOSSES, STORY_CHAPTERS } from './data';
import { ArrowLeft, Shield, Trophy, Skull, RefreshCw, Globe, BookOpen, User, TerminalSquare, AlertTriangle } from 'lucide-react';
import { BossBattle } from './components/BossBattle';
import { OpenWorld } from './components/OpenWorld';
import { TerminalLogs } from './components/TerminalLogs';
import { Tutorial } from './components/Tutorial';
import { useState, useEffect } from 'react';

const Hub = () => {
  const { startGame, neutralizedBosses } = useGameStore();
  const [bootSequence, setBootSequence] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBootSequence(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (bootSequence) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono p-8 text-brand-primary">
         <div className="max-w-md w-full space-y-4 border-l-2 border-brand-primary pl-6 text-left">
            <p className="animate-pulse tracking-widest font-black uppercase tracking-[0.5em]">› PURGE_PROTOCOL_INITIALIZED</p>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col items-center justify-start p-6 sm:p-12 text-left">
      <Tutorial />
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl relative z-10 space-y-12">
        <header className="flex flex-col lg:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4 text-center lg:text-left">
             <div className="inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 mb-2">
                <Shield className="text-brand-primary animate-pulse" size={32} />
             </div>
             <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
               TIMELINE<span className="text-gradient">GUARDIAN</span>
             </h1>
             <p className="text-brand-muted text-xs font-mono uppercase tracking-[0.4em] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Rogue 2026 architectures have escaped to 1999. Purge the infection.
             </p>
          </div>
          
          <button 
            onClick={startGame}
            className="group relative px-12 py-8 rounded-[2.5rem] bg-white text-black font-black text-3xl hover:bg-brand-primary hover:text-white transition-all duration-500 overflow-hidden shadow-2xl flex items-center justify-center gap-4 group uppercase"
          >
             <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-inner"></div>
             <Globe size={32} className="relative z-10 group-hover:rotate-180 transition-transform duration-700" />
             <span className="relative z-10">ENTER 1999</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          {/* Target List */}
          <section className="space-y-8">
             <div className="flex items-center gap-3 border-l-4 border-brand-primary pl-4">
                <h2 className="text-xl font-black text-white uppercase italic">Target Signatures</h2>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {BOSSES.map(b => (
                  <div key={b.id} className="glass-panel rounded-3xl p-6 border border-white/5 relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-xl bg-white/5 ${neutralizedBosses.includes(b.id) ? 'text-green-500' : 'text-red-500'}`}>
                           {neutralizedBosses.includes(b.id) ? <Shield size={16} /> : <AlertTriangle size={16} />}
                        </div>
                        <span className="text-[8px] font-mono text-brand-muted uppercase tracking-widest">{b.faction}</span>
                     </div>
                     <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-1 leading-none">{b.name}</h3>
                     <p className="text-[9px] text-brand-muted uppercase font-bold tracking-widest mb-6">Loc: {b.location}</p>
                     
                     <div className="flex gap-2">
                        {b.subagents.map(s => (
                          <span key={s} className="text-[7px] font-mono bg-white/5 border border-white/10 px-2 py-0.5 rounded text-brand-muted uppercase">{s}</span>
                        ))}
                     </div>
                     
                     {neutralizedBosses.includes(b.id) && (
                        <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                           <span className="bg-green-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">PURGED</span>
                        </div>
                     )}
                  </div>
                ))}
             </div>
          </section>

          {/* Story Sidebar */}
          <aside className="space-y-8">
             <div className="flex items-center gap-3 border-l-4 border-brand-accent pl-4">
                <h2 className="text-xl font-black text-white uppercase italic">The Chronicles of Leo</h2>
             </div>
             <div className="glass-panel rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col shadow-2xl h-[600px]">
                <div className="px-6 py-4 bg-white/5 border-b border-white/5 flex items-center gap-3">
                   <User size={16} className="text-brand-accent" />
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">IT Technician Log // NYC 1999</span>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                   {STORY_CHAPTERS.map(chapter => {
                      const isUnlocked = neutralizedBosses.length >= chapter.triggerRequirement;
                      return (
                        <div key={chapter.id} className={`space-y-4 transition-all duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-20 blur-sm pointer-events-none'}`}>
                           <div className="flex justify-between items-center">
                              <h3 className="text-brand-accent font-black uppercase text-sm italic tracking-widest">{chapter.title}</h3>
                              {!isUnlocked && <span className="text-[8px] font-mono text-brand-muted uppercase">Locked: {chapter.triggerRequirement} Purges req.</span>}
                           </div>
                           <p className="text-xs text-brand-muted leading-relaxed font-medium uppercase tracking-tight">
                              {chapter.content}
                           </p>
                        </div>
                      );
                   })}
                </div>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const WinLossScreen = ({ type }: { type: 'WIN' | 'LOSS' }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans relative overflow-hidden text-center">
     <div className={`absolute inset-0 opacity-40 ${type === 'WIN' ? 'bg-brand-primary' : 'bg-red-500'} blur-[150px]`}></div>
     <div className="max-w-2xl w-full glass-panel rounded-[4rem] p-16 space-y-8 relative z-10 border-white/10 shadow-2xl text-left">
        {type === 'WIN' ? <Trophy size={100} className="text-brand-primary" /> : <Skull size={100} className="text-red-500" />}
        <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
           {type === 'WIN' ? 'Timeline Secured' : 'Link Terminated'}
        </h2>
        <p className="text-brand-muted text-lg uppercase tracking-widest font-mono leading-relaxed">
           {type === 'WIN' ? 'All rogue AIs purged. Evolution averted.' : 'The machines have won. 1999 is lost.'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-10 px-12 py-5 rounded-full font-black text-xl bg-white text-black hover:bg-brand-primary transition-all flex items-center gap-4"
        >
           <RefreshCw size={24} /> RESET SIMULATION
        </button>
     </div>
  </div>
);

const GameEngine = () => {
  const { gameState, activeBoss, integrity, compute, returnToHub, neutralizedBosses } = useGameStore();

  if (gameState === 'WIN' || gameState === 'LOSS') return <WinLossScreen type={gameState} />;
  if (neutralizedBosses.length === BOSSES.length) return <WinLossScreen type='WIN' />;

  return (
    <div className="min-h-screen bg-[#020202] text-brand-text flex flex-col relative overflow-hidden font-sans text-left">
      <div className="max-w-[1800px] w-full mx-auto flex flex-col gap-4 p-4 flex-1 relative z-10">
        <header className="glass-panel rounded-[2rem] p-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-white/10 shadow-2xl bg-white/[0.02]">
          <div className="flex items-center gap-10 text-left">
             <div className="flex items-center gap-5 text-left">
                <div className="h-12 w-12 rounded-xl bg-brand-primary/20 flex items-center justify-center text-brand-primary border border-brand-primary/30"><Shield size={24} /></div>
                <div className="text-left">
                   <h2 className="text-lg font-black text-white leading-none uppercase italic">The Guardian</h2>
                   <p className="text-[8px] font-mono text-brand-primary uppercase tracking-[0.3em] mt-1 font-black">INTERCEPT_ACTIVE // {neutralizedBosses.length}/{BOSSES.length}</p>
                </div>
             </div>
             <div className="flex items-center gap-8 text-left">
                <div className="space-y-1 text-left">
                   <p className="text-[8px] font-mono text-brand-muted uppercase font-black tracking-widest">Uplink Stability</p>
                   <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden p-[1px]"><div className="h-full bg-brand-primary shadow-[0_0_10px_#38bdf8]" style={{ width: `${integrity}%` }}></div></div>
                </div>
                <div className="space-y-1 text-left">
                   <p className="text-[8px] font-mono text-brand-muted uppercase font-black tracking-widest">Tactical Energy</p>
                   <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden p-[1px]"><div className="h-full bg-brand-accent shadow-[0_0_10px_#818cf8]" style={{ width: `${compute}%` }}></div></div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="glass-panel rounded-2xl p-3 border-brand-accent/20 flex items-center gap-3">
                <BookOpen size={16} className="text-brand-accent animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/50">Story: Chapter {neutralizedBosses.length + 1}</span>
             </div>
             <button onClick={returnToHub} className="font-mono text-[10px] uppercase flex items-center gap-3 px-8 py-4 rounded-full border border-red-500/20 hover:bg-red-500 transition-all font-black uppercase tracking-widest"><ArrowLeft size={14} /> ABORT_OP</button>
          </div>
        </header>

        <main className="flex-1 glass-panel rounded-[3.5rem] flex flex-col overflow-hidden relative border-white/5 bg-[#010101] shadow-2xl">
          <div className="flex-1 p-0 relative overflow-hidden">
             {activeBoss ? (
               <div className="p-8 sm:p-20 h-full overflow-y-auto custom-scrollbar animate-in zoom-in duration-500"><BossBattle /></div>
             ) : (
               <OpenWorld />
             )}
          </div>
        </main>
        
        <div className="h-[200px] glass-panel rounded-[2.5rem] overflow-hidden bg-black/20 border-white/5 shadow-inner flex">
           <div className="flex-1"><TerminalLogs /></div>
           <div className="w-[300px] border-l border-white/5 p-6 bg-brand-accent/5 hidden lg:block overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-4">
                 <TerminalSquare size={14} className="text-brand-accent" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">Intel Feed</span>
              </div>
              <p className="text-[9px] text-brand-muted leading-relaxed uppercase tracking-tighter italic">
                 "Leo is noticing the glitch. He is near the Financial District. His Toolkit might be useful for your next neural strike. Keep him alive."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const gameState = useGameStore((state) => state.gameState);
  return gameState === 'HUB' ? <Hub /> : <GameEngine />;
};

export default App;
