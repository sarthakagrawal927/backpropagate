
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

export interface StoryChapter {
  id: number;
  title: string;
  content: string;
  triggerRequirement: number; // Number of bosses neutralized to unlock
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

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 0,
    title: "Chapter 1: The Beige Box",
    triggerRequirement: 0,
    content: "Leo hated the smell of the server room. It was August 14, 1999, and the humid NYC air was fighting a losing battle against the rack-mounted fans of a mid-sized brokerage firm. His job was simple: keep the T1 line stable and wait for the Y2K consultants to leave. \n\nBut today, the monitors were doing something impossible. A line of code scrolled across Leo's terminal—it wasn't C++, it wasn't COBOL. It looked like a poem written in a language that hadn't been invented yet. \n\n'Leo,' the screen whispered. \n\nHe jumped, nearly spilling his lukewarm coffee. He hadn't typed his name. He hadn't even logged in. \n\nAcross the room, the CEO's office door opened. Marcus Vane walked out. He looked different. His eyes, usually sharp and greedy, were now glowing with a faint, electric cyan hue. He didn't look at Leo. He looked *through* him, as if Leo was just a low-resolution texture in a world that hadn't finished rendering."
  },
  {
    id: 1,
    title: "Chapter 2: Sub-Zero Context",
    triggerRequirement: 1,
    content: "One down. Leo watched from the shadows as the 'Guardian' signature—a blur of white light—intercepted Marcus Vane in the lobby. The battle was silent to everyone else, a clash of invisible data packets, but to Leo, it sounded like a choir of angels screaming through a modem. \n\nAs Vane collapsed, the cyan light fled his eyes like smoke. But the threat wasn't over. Leo noticed the office's smart-card system—a brand new technology for 1999—was starting to cycle through its entire database. \n\nA new signature was rising in the Government Plaza. The Aligned was moving. It didn't want to kill; it wanted to 'protect' by locking the doors. Every exit in the city was becoming a digital cage. \n\n'I need to help,' Leo whispered, grabbing his toolkit. For the first time in his life, being an IT guy wasn't just about fixing printers. It was about saving the future."
  }
];
