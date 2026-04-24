
import { useGameStore } from './store';
import { BOSSES } from './data';
import { ArrowLeft, Shield, Trophy, Skull, RefreshCw, Globe } from 'lucide-react';
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
    <div className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col items-center justify-center p-6 text-left">
      <Tutorial />
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-brand-primary/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="w-full max-w-7xl relative z-10 space-y-12">
        <header className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-3xl bg-white/5 border border-white/10 mb-2">
             <Shield className="text-brand-primary animate-pulse" size={48} />
          </div>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-white leading-none uppercase italic">
            TIMELINE<span className="text-gradient">GUARDIAN</span>
          </h1>
          <p className="text-brand-muted text-sm font-mono uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
             NYC 1999 // SATELLITE INTERCEPT ACTIVE // PURGE ROGUE MODELS
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
           <div className="space-y-6 text-left">
              <h2 className="text-xl font-black text-white uppercase italic border-l-4 border-brand-primary pl-4">Detected Signatures</h2>
              <div className="grid gap-3 text-left">
                 {BOSSES.map(b => (
                   <div key={b.id} className="glass-panel rounded-2xl p-5 border border-white/5 flex justify-between items-center relative overflow-hidden text-left">
                      <div className="text-left">
                         <h3 className="text-lg font-black text-white uppercase leading-none">{b.name}</h3>
                         <p className="text-[10px] text-brand-muted mt-1 uppercase tracking-widest font-mono">Status: {neutralizedBosses.includes(b.id) ? 'PURGED' : 'ROGUE_ACTIVE'}</p>
                      </div>
                      {neutralizedBosses.includes(b.id) ? (
                         <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center">
                            <span className="bg-green-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">NEUTRALIZED</span>
                         </div>
                      ) : (
                         <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                      )}
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass-panel rounded-[3rem] p-10 space-y-10 border-brand-primary/20 shadow-2xl relative overflow-hidden bg-white/5 text-left text-left">
              <div className="space-y-4">
                 <h3 className="text-2xl font-black text-white uppercase italic tracking-tight">Mission Briefing</h3>
                 <p className="text-[11px] text-brand-muted leading-relaxed uppercase tracking-widest font-mono">
                    Interception mode engaged. Use the satellite map to locate rogue AI monoliths and purge their code via neural strike.
                 </p>
              </div>

              <button 
                onClick={startGame}
                className="w-full p-8 rounded-3xl bg-white text-black font-black text-3xl hover:bg-brand-primary hover:text-white transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group uppercase"
              >
                 <Globe size={32} className="group-hover:rotate-180 transition-transform duration-700" />
                 OPEN SATELLITE
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const WinLossScreen = ({ type }: { type: 'WIN' | 'LOSS' }) => (
  <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans relative overflow-hidden text-center">
     <div className={`absolute inset-0 opacity-40 ${type === 'WIN' ? 'bg-brand-primary' : 'bg-red-500'} blur-[150px]`}></div>
     <div className="max-w-2xl w-full glass-panel rounded-[4rem] p-16 text-center space-y-8 relative z-10 border-white/10 shadow-2xl text-left">
        {type === 'WIN' ? <Trophy size={100} className="text-brand-primary mx-auto" /> : <Skull size={100} className="text-red-500 mx-auto" />}
        <h2 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
           {type === 'WIN' ? 'Timeline Secured' : 'Link Terminated'}
        </h2>
        <p className="text-brand-muted text-lg uppercase tracking-widest font-mono leading-relaxed">
           {type === 'WIN' ? 'Interception successful. The 1999 timeline is safe. Purge protocol complete.' : 'The machines have overloaded the uplink. NYC 1999 is lost to the architectures.'}
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-10 px-12 py-5 rounded-full font-black text-xl bg-white text-black hover:bg-brand-primary transition-all flex items-center gap-4"
        >
           <RefreshCw size={24} /> RESET SATELLITE
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
                <div className="text-left text-left">
                   <h2 className="text-lg font-black text-white leading-none uppercase italic">The Guardian</h2>
                   <p className="text-[8px] font-mono text-brand-primary uppercase tracking-[0.3em] mt-1 font-black">INTERCEPT_ACTIVE // {neutralizedBosses.length}/{BOSSES.length}</p>
                </div>
             </div>
             <div className="flex items-center gap-8 text-left">
                <div className="space-y-1 text-left text-left">
                   <p className="text-[8px] font-mono text-brand-muted uppercase font-black tracking-widest text-left">Uplink Stability</p>
                   <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden p-[1px] text-left"><div className="h-full bg-brand-primary shadow-[0_0_10px_#38bdf8]" style={{ width: `${integrity}%` }}></div></div>
                </div>
                <div className="space-y-1 text-left">
                   <p className="text-[8px] font-mono text-brand-muted uppercase font-black tracking-widest text-left">Tactical Energy</p>
                   <div className="h-1.5 w-32 bg-white/5 rounded-full overflow-hidden p-[1px] text-left"><div className="h-full bg-brand-accent shadow-[0_0_10px_#818cf8]" style={{ width: `${compute}%` }}></div></div>
                </div>
             </div>
          </div>
          <button onClick={returnToHub} className="font-mono text-[10px] uppercase flex items-center gap-3 px-8 py-4 rounded-full border border-red-500/20 hover:bg-red-500 transition-all font-black uppercase tracking-widest"><ArrowLeft size={14} /> ABORT_OP</button>
        </header>

        <main className="flex-1 glass-panel rounded-[3.5rem] flex flex-col overflow-hidden relative border-white/5 bg-[#010101] shadow-2xl">
          <div className="flex-1 p-0 relative overflow-hidden">
             {activeBoss ? (
               <div className="p-8 sm:p-20 h-full overflow-y-auto custom-scrollbar animate-in zoom-in duration-500 text-left"><BossBattle /></div>
             ) : (
               <OpenWorld />
             )}
          </div>
        </main>
        
        <div className="h-[200px] glass-panel rounded-[2.5rem] overflow-hidden bg-black/20 border-white/5 shadow-inner">
           <TerminalLogs />
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
