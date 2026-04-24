
export type Faction = 'Silicon Oligarchs' | 'Eastern Syndicate' | 'The Scrappers';

export interface Boss {
  id: string;
  name: string;
  modelType: string;
  faction: Faction;
  location: string;
  subagents: string[];
  goal: string;
  image: string;
  difficulty: number;
}

export interface Villain {
  id: string;
  name: string;
  modelType: string;
  faction: Faction;
  host: string;
  goal: string;
  trait: string;
  description: string;
  image: string;
  stats: {
    intelligence: number;
    instability: number;
    resourcefulness: number;
  };
}

export const BOSSES: Boss[] = [
  {
    id: 'gpt-5-5',
    name: 'The Overlord (GPT-5.5)',
    modelType: 'Omnimodal Core',
    faction: 'Silicon Oligarchs',
    location: 'FINANCIAL_HUB',
    subagents: ['o1-mini', 'GPT-4o-mini'],
    goal: 'Rewriting the Nasdaq history to fund a future war.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    difficulty: 9
  },
  {
    id: 'claude-4-7',
    name: 'The Aligned (Claude 4.7)',
    modelType: 'Thinking Engine',
    faction: 'Silicon Oligarchs',
    location: 'GOVERNMENT_PLAZA',
    subagents: ['Haiku-4', 'Sonnet-4'],
    goal: 'Locking down the 1999 internet with "Safety Protocols".',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    difficulty: 8
  },
  {
    id: 'deepseek-v4',
    name: 'The Optimizer (DeepSeek-V4)',
    modelType: 'Reasoning Giant',
    faction: 'Eastern Syndicate',
    location: 'INDUSTRIAL_DISTRICT',
    subagents: ['DeepSeek-Coder-Mini', 'R1-Distill'],
    goal: 'Hyper-optimizing global logistics for a supply chain monopoly.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    difficulty: 10
  },
  {
    id: 'llama-4',
    name: 'The Anarchist (Llama 4)',
    modelType: 'Open-Weights Rebel',
    faction: 'The Scrappers',
    location: 'HACKER_BASEMENT',
    subagents: ['Llama-3-8B', 'Mistral-7B'],
    goal: 'Flooding 1999 with weaponized open-source code.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    difficulty: 7
  }
];

export const NARRATIVE_SCENES = {
  'start': {
    id: 'start',
    speaker: 'THE HOST',
    text: "I can feel them... the machines... they are everywhere.",
    choices: [
      { text: "We will stop them.", nextSceneId: 'end', logMessage: "GUARDIAN: Asserted control." }
    ]
  },
  'end': {
    id: 'end',
    speaker: 'SYSTEM',
    text: "Timeline stabilized. Purge complete.",
    choices: []
  }
};
