
import { create } from 'zustand';
import type { Boss } from './data';

export interface LogEntry {
  id: number;
  timestamp: string;
  message: string;
  type: string;
}

interface GameState {
  gameState: 'HUB' | 'PLAYING' | 'WIN' | 'LOSS';
  logs: LogEntry[];
  
  // Resources
  integrity: number;
  compute: number;
  
  // Mission
  activeBoss: Boss | null;
  neutralizedBosses: string[];
  
  // Actions
  startGame: () => void;
  returnToHub: () => void;
  addLog: (message: string, type?: string) => void;
  engageBoss: (boss: Boss) => void;
  
  // Combat
  strike: () => void;
  fortify: () => void;
  processTurn: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  gameState: 'HUB',
  logs: [],
  integrity: 100,
  compute: 100,
  activeBoss: null,
  neutralizedBosses: [],

  startGame: () => set({ 
    gameState: 'PLAYING', 
    integrity: 100, 
    compute: 100, 
    neutralizedBosses: [],
    activeBoss: null,
    logs: [{ id: 1, timestamp: new Date().toLocaleTimeString(), message: "SATELLITE_UPLINK: Online. Scanning NYC for 2026 signatures.", type: "SUCCESS" }]
  }),

  returnToHub: () => set({ gameState: 'HUB', activeBoss: null }),

  addLog: (message: string, type: string = 'INFO') => set((state: GameState) => ({
    logs: [{ id: Math.random(), timestamp: new Date().toLocaleTimeString(), message, type }, ...state.logs].slice(0, 15)
  })),

  engageBoss: (boss: Boss) => set((state: GameState) => ({
    activeBoss: boss,
    logs: [{ id: Math.random(), timestamp: new Date().toLocaleTimeString(), message: `INTERCEPTED: ${boss.name} signature locked.`, type: "ERROR" }, ...state.logs]
  })),

  strike: () => set((state: GameState) => {
    if (!state.activeBoss || state.compute < 25) return {};
    
    // Boss has 100 HP effectively
    const isDefeated = Math.random() > 0.6; // Quick chance-based combat for "playability"
    
    if (isDefeated) {
       return {
          neutralizedBosses: [...state.neutralizedBosses, state.activeBoss.id],
          activeBoss: null,
          compute: state.compute - 25,
          logs: [{ id: Math.random(), timestamp: new Date().toLocaleTimeString(), message: "PURGE_SUCCESSFUL: Signature deleted.", type: "SUCCESS" }, ...state.logs]
       };
    }
    
    return { 
      compute: state.compute - 25,
      logs: [{ id: Math.random(), timestamp: new Date().toLocaleTimeString(), message: "STRIKE_FAILED: Boss firewall held.", type: "WARNING" }, ...state.logs]
    };
  }),

  fortify: () => set((state: GameState) => ({
    compute: Math.min(100, state.compute + 40),
    integrity: Math.min(100, state.integrity + 5)
  })),

  processTurn: () => set((state: GameState) => {
    if (!state.activeBoss) return {};
    const damage = Math.floor(Math.random() * 15) + 5;
    const newIntegrity = state.integrity - damage;
    
    return {
      integrity: newIntegrity,
      gameState: newIntegrity <= 0 ? 'LOSS' : 'PLAYING',
      logs: [{ id: Math.random(), timestamp: new Date().toLocaleTimeString(), message: `INCOMING_ATTACK: Neural damage detected (-${damage}%)`, type: "ERROR" }, ...state.logs]
    };
  })
}));
