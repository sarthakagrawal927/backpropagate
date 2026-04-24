# agents.md — backpropagate

## Purpose
Browser game "Timeline Guardian" — neutralize rogue 2026 AI architectures that escaped to 1999, told through boss battles and hub-world exploration.

## Stack
- Framework: Vite 8 + React 19 (SPA)
- Language: TypeScript
- Styling: Tailwind CSS v4
- State: Zustand
- 3D: Three.js via @react-three/fiber + @react-three/drei (in deps; verify active use in OpenWorld.tsx)
- DB: None
- Auth: None
- Testing: None
- Deploy: Vercel (static SPA)
- Package manager: pnpm

## Repo structure
```
src/
  App.tsx           # Root — state machine (HUB → GAME → WIN/LOSS)
  store.ts          # Zustand: gameState, activeBoss, integrity, compute, neutralizedBosses
  data.ts           # BOSSES[] and STORY_CHAPTERS[] static definitions
  index.css         # Tailwind + CSS custom props (dark cyber theme: #1a1a2e)
  components/
    BossBattle.tsx  # Main combat UI
    OpenWorld.tsx   # World map / area selection (may use Three.js — verify)
    StrategyMode.tsx # Tactical planning screen
    TerminalLogs.tsx # Live log feed in game footer
    Tutorial.tsx    # Onboarding overlay
public/
  icons.svg         # SVG sprite sheet
```

## Key commands
```bash
pnpm dev        # Vite dev server
pnpm build      # tsc + vite build
pnpm preview    # Preview production build
pnpm lint       # ESLint
```

## Architecture notes
- **State machine**: `App.tsx` switches between `HUB`, `GAME`, `WIN`, `LOSS` states driven by Zustand store — no prop drilling.
- **Game data is static**: all bosses and story chapters defined in `data.ts` — no backend or API calls.
- **Three.js**: `@react-three/fiber` and `@react-three/drei` are installed. Usage in `OpenWorld.tsx` needs verification — may not be fully integrated.
- **No backend**: fully client-side. No env vars required.
- **Brand theme**: CSS vars `brand-primary`, `brand-accent`, `brand-muted`, `brand-bg`, `brand-text`. Dark cyber aesthetic. `glass-panel` CSS class used extensively (backdrop-filter + border).
- Deploy target: Vercel static (`dist/`).

## Active context
