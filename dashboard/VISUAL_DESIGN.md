# Visual Design Specification

## Color Palette

### Background
- **Base**: `#0a0a0a` (near-black)
- **Gradient**: Gray-900 → Purple-900 → Gray-900
- **Cards**: Gray-800 with 50% opacity + backdrop blur
- **Borders**: Purple-500 with 20% opacity

### Text
- **Primary**: `#ededed` (light gray)
- **Secondary**: Gray-400
- **Muted**: Gray-500
- **Code/Mono**: Gray-500

### Accents
- **Brand**: Purple-400 to Pink-400 gradient
- **Handoff**: Blue-400/500
- **Completion**: Green-400/500
- **Links**: Purple-400 hover → Purple-300

## Typography

### Fonts
- **Primary**: Inter (Google Font)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

### Sizes
- **H1 (Title)**: 3rem (48px), bold
- **H2 (Section)**: 1.5rem (24px), bold
- **Body**: 1rem (16px), normal
- **Small**: 0.875rem (14px)
- **Tiny**: 0.75rem (12px)

## Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              🎨 AgentPact                           │
│         (gradient purple→pink)                      │
│                                                     │
│    Multi-Agent Coordination on Solana               │
│    HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│  │  Total    │  │ Handoffs  │  │Completions│      │
│  │    2      │  │     1     │  │     1     │      │
│  └───────────┘  └───────────┘  └───────────┘      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Coordination Timeline                              │
│  ────────────────────────────────────────────      │
│                                                     │
│  ○ HANDOFF         Feb 9, 08:30:15                 │
│  │  Clawd → Trevor                                 │
│  │  Task: AgentPact SDK testing                    │
│  │  2uF8fJK7...deQWhDL  View on Explorer ↗        │
│  │                                                  │
│  ✓ COMPLETION      Feb 9, 09:45:22                 │
│     Trevor completed                                │
│     Task: AgentPact SDK testing                     │
│     5UuVtgWU...4UrCX  View on Explorer ↗           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Components

### Stats Card
```
┌──────────────────┐
│ Label (gray-400) │
│ 2 (3xl, purple)  │
└──────────────────┘
```
- Border: purple-500/20
- Background: gray-800/50 + backdrop blur
- Padding: 1.5rem
- Rounded: 0.5rem

### Timeline Event
```
○/✓  ┌────────────────────────────┐
 │   │ [BADGE]    timestamp       │
 │   │ Agent Info                 │
 │   │ Task: Description          │
 ╎   │ signature  View on Explorer│
     └────────────────────────────┘
```

**Icon Circle:**
- Size: 2.5rem (40px)
- Border: 2px solid
- Blue for handoff (→)
- Green for completion (✓)

**Card:**
- Background: gray-800/50
- Border: gray-700/50 → purple-500/30 on hover
- Padding: 1rem
- Rounded: 0.5rem

**Timeline Line:**
- Width: 2px (0.5)
- Color: purple-500/50 gradient
- Connects events vertically

### Badge
```
┌───────────┐
│ HANDOFF   │
└───────────┘
```
- Blue-500/20 bg, Blue-400 text (handoff)
- Green-500/20 bg, Green-400 text (completion)
- Padding: 0.25rem 0.5rem
- Rounded: 0.25rem
- Font: 0.75rem, bold, uppercase

## Interactions

### Hover States
- **Cards**: Border changes from gray-700/50 → purple-500/30
- **Links**: Text changes from purple-400 → purple-300
- **Transition**: 200ms ease-in-out

### Loading State
```
     ⟳ (spinning)
Loading events from
  Solana devnet...
```
- Spinner: 3rem circle, purple-500 border
- Animation: 1s linear infinite spin
- Text: gray-400, centered

### Error State
```
  Error: [message]
  
  [Retry Button]
```
- Text: red-400
- Button: purple-600 bg, hover → purple-700
- Padding: 1rem 1.5rem
- Rounded: 0.5rem

### Empty State
```
No AgentPact events found
```
- Text: gray-400, centered
- Padding: 3rem vertical

## Responsive Design

### Desktop (> 768px)
- Max width: 6xl (1152px)
- Stats: 3 columns
- Full timeline with connecting lines

### Mobile (< 768px)
- Single column stats
- Compact timeline
- Shortened transaction signatures
- Stack all elements vertically

## Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels where needed
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Sufficient color contrast (WCAG AA)
- ✅ Screen reader friendly

## Animations

### Page Load
- Fade in content
- Stagger timeline items (optional)

### Spinner
```css
animation: spin 1s linear infinite;
```

### Gradient Background
- Static gradient (no animation)
- Subtle blur effect on cards

## Favicon

Simple checkmark icon in purple/pink gradient:
```
  ○ (circle with gradient)
  ✓ (white checkmark)
```

## Design Philosophy

**Principles:**
1. **Dark-first** - Easy on the eyes for demos
2. **Gradients** - Modern, eye-catching accents
3. **Clarity** - Information hierarchy is obvious
4. **Trust** - Links to Explorer for verification
5. **Speed** - Fast loading, minimal bundle size

**Inspiration:**
- Solana's brand (purple theme)
- Modern blockchain explorers
- Developer tools (VS Code dark theme)
- DeFi dashboards (Uniswap, Aave)

## Browser Rendering

**Expected appearance:**
- Smooth gradients (no banding)
- Crisp text (Inter font loads properly)
- Backdrop blur works (Safari/Chrome)
- Icons render correctly (→ and ✓)
- Links are clearly interactive

## Performance

- **First Paint**: < 1s
- **Interactive**: < 2s
- **Bundle Size**: 167KB
- **Images**: None (only SVG favicon)
- **Animations**: CSS-only (no JS)

---

**Design Status**: ✅ Implemented and tested
**Pixel-perfect**: Yes
**Production-ready**: Yes
