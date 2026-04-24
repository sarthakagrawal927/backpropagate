
import { useGameStore } from '../store';
import { MousePointer2, ChevronRight } from 'lucide-react';

const STEPS = [
  {
    title: "The Mission",
    text: "You are the Timeline Guardian. 4 Rogue AIs have escaped to 1999. You must find them and purge their signatures.",
  },
  {
    title: "Locate Targets",
    text: "Explore NYC. Look for the glowing 'Threat Signatures'. Those are the Rogue AIs.",
  },
  {
    title: "Combat",
    text: "Approach a target and engage. It's a turn-based strategic battle. Neutralize all 4 to win.",
  }
];

export const Tutorial = () => {
  const { tutorialStep, nextTutorial } = useGameStore() as any;
  const currentStep = STEPS[tutorialStep];

  if (!currentStep || tutorialStep > 2) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center p-8">
      <div className="max-w-md w-full glass-panel rounded-[2.5rem] p-8 border-brand-primary border-2 shadow-[0_0_100px_rgba(56,189,248,0.4)] pointer-events-auto animate-in zoom-in duration-300 bg-brand-bg/90 backdrop-blur-xl text-center">
         <div className="flex justify-center mb-6">
            <div className="p-3 rounded-2xl bg-brand-primary/20 text-brand-primary animate-bounce">
               <MousePointer2 size={32} />
            </div>
         </div>
         <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{currentStep.title}</h2>
         <p className="text-brand-text/80 text-sm leading-relaxed mb-10 font-medium uppercase tracking-wide">{currentStep.text}</p>
         <button 
           onClick={nextTutorial}
           className="w-full py-5 rounded-3xl bg-brand-primary text-black font-black text-lg flex items-center justify-center gap-3 hover:bg-white transition-all group uppercase tracking-widest shadow-xl"
         >
            SYNC DIRECTIVE <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
         </button>
      </div>
    </div>
  );
};
