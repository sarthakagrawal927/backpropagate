
import { useState } from 'react';
import { useGameStore } from '../store';
import { NARRATIVE_SCENES } from '../data';
import type { Villain } from '../data';
import { Cpu, ArrowRight, RotateCcw } from 'lucide-react';

export const HostChronicles = ({ villain }: { villain: Villain }) => {
  const [currentSceneId, setCurrentSceneId] = useState<'start' | 'end'>('start');
  const addLog = useGameStore((state) => state.addLog);
  const currentScene = (NARRATIVE_SCENES as any)[currentSceneId];

  const handleChoice = (choice: any) => {
    addLog(choice.logMessage, 'WARNING');
    setCurrentSceneId(choice.nextSceneId);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 text-left">
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
        <div className="glass-panel rounded-[2.5rem] p-8 flex flex-col items-center text-center gap-6 h-fit sticky top-0">
           <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-brand-accent shadow-xl">
              <img src={villain.image} alt="Host Profile" className="w-full h-full object-cover grayscale opacity-80" />
           </div>
           <div>
              <h3 className="text-white font-bold tracking-tight">{villain.host.split(',')[0]}</h3>
              <p className="text-[10px] text-brand-muted uppercase tracking-widest font-mono mt-1">Status: Compromised</p>
           </div>
        </div>

        <div className="relative group flex-1">
          <div className="relative glass-panel rounded-[3rem] p-8 sm:p-12 shadow-2xl border-white/10 h-full flex flex-col">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase mb-10 shadow-sm self-start">
              <Cpu size={14} className="text-brand-accent animate-pulse" />
              <span className="text-brand-accent">{currentScene.speaker}</span>
            </div>

            <div className="space-y-12 flex-1">
              <p className="text-xl sm:text-3xl font-medium leading-relaxed text-white tracking-tight italic">
                "{currentScene.text}"
              </p>

              <div className="pt-10 border-t border-white/5 space-y-4">
                {currentScene.choices.length > 0 ? (
                  <div className="grid gap-4">
                    {currentScene.choices.map((choice: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => handleChoice(choice)}
                        className="w-full text-left p-6 rounded-2xl border border-white/5 hover:border-brand-accent/50 hover:bg-white/5 transition-all group/choice flex items-center justify-between bg-white/[0.02]"
                      >
                        <span className="text-brand-muted group-hover/choice:text-white transition-colors text-base font-medium">
                          {choice.text}
                        </span>
                        <ArrowRight size={18} className="text-brand-muted/30 group-hover/choice:text-brand-accent group-hover/choice:translate-x-2 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <button
                      onClick={() => setCurrentSceneId('start')}
                      className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-white text-black font-black hover:bg-brand-text transition-all text-sm uppercase"
                    >
                      <RotateCcw size={18} /> Restart Sync
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
