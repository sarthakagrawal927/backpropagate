import { useEffect, useRef } from 'react';
import { useGameStore } from '../store';
import type { LogEntry } from '../store';
import { TerminalSquare } from 'lucide-react';

export const TerminalLogs = () => {
  const logs = useGameStore((state) => state.logs);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="flex flex-col h-full bg-brand-surface/30">
      <div className="px-4 py-3 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
        <span className="font-mono text-xs font-semibold tracking-widest text-brand-text uppercase flex items-center gap-2">
          <TerminalSquare size={14} className="text-brand-primary" />
          Neural Logs
        </span>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs leading-relaxed"
      >
        {logs.map((log: LogEntry) => (
          <div key={log.id} className="flex gap-3 hover:bg-white/5 p-1 rounded transition-colors">
            <span className="text-brand-muted/50 shrink-0">[{log.timestamp}]</span>
            <span className={`
              ${log.type === 'INFO' ? 'text-brand-text/80' : ''}
              ${log.type === 'SUCCESS' ? 'text-brand-primary' : ''}
              ${log.type === 'WARNING' ? 'text-yellow-400' : ''}
              ${log.type === 'ERROR' ? 'text-red-400' : ''}
            `}>
              {log.message}
            </span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-brand-muted/50 italic flex h-full items-center justify-center">
            Awaiting neural activity...
          </div>
        )}
      </div>
    </div>
  );
};
