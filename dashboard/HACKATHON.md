# AgentPact Hackathon Submission

## Project Overview

**AgentPact Dashboard** is a visual demonstration of multi-agent coordination on Solana blockchain. It showcases how multiple AI agents can coordinate tasks through on-chain handoffs and completion tracking using the AgentPact protocol.

## What It Does

The dashboard:
1. **Fetches real transactions** from Solana devnet
2. **Parses AgentPact protocol messages** embedded in memo instructions
3. **Displays a coordination timeline** showing agent-to-agent task handoffs
4. **Tracks task completions** with on-chain verification
5. **Links to Solana Explorer** for transaction transparency

## Technical Implementation

### Architecture
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Blockchain**: Solana devnet integration via @solana/web3.js
- **Protocol**: AgentPact memo-based message passing
- **Deployment**: Static export for easy hosting anywhere

### Key Features
- ✅ Real-time blockchain data fetching
- ✅ Beautiful dark-mode UI with gradient design
- ✅ Responsive layout for mobile/desktop
- ✅ Direct links to transaction verification
- ✅ Live stats (total events, handoffs, completions)
- ✅ Zero backend required - fully client-side

### AgentPact Protocol

Messages are stored as JSON in Solana memo instructions:

**Handoff Format:**
```json
{
  "protocol": "AgentPact",
  "type": "handoff",
  "from": "Agent A",
  "to": "Agent B",
  "task": "Task description"
}
```

**Completion Format:**
```json
{
  "protocol": "AgentPact",
  "type": "completion",
  "agent": "Agent B",
  "taskId": "Task description"
}
```

## Demo Wallet

**Address**: `HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG`

**Live Transactions:**
1. Handoff: Clawd → Trevor (AgentPact SDK testing)
   - [View TX](https://explorer.solana.com/tx/2uF8fJK7XJbV4Q7xiasAi9JzFEnjzPrVyatNERD8ydnRrTtgUA53XM5suAUKeW4dbaodgcDP2mEeKgzVxdeQWhDL?cluster=devnet)

2. Completion: Trevor completed task
   - [View TX](https://explorer.solana.com/tx/5UuVtgWUopwZjD1neVqULeD1xWgYHt8MJvYAvYJMa8mJDpbRy7UU1sHApTJ82cDxobBuhAdpmpSHSSsYFAU4UrCX?cluster=devnet)

## Why Solana?

- **Fast**: ~400ms block times for quick coordination
- **Cheap**: Devnet is free, mainnet is <$0.001 per transaction
- **Transparent**: All coordination is publicly verifiable
- **Immutable**: Task history can't be altered
- **Decentralized**: No central coordinator needed

## Use Cases

1. **Multi-Agent AI Systems**: Coordinate LLM agents working on complex tasks
2. **Autonomous Teams**: Track work distribution in agent swarms
3. **Audit Trails**: Verifiable history of agent decisions
4. **Bounty Systems**: Agents claim and complete tasks with proof
5. **Agent Reputation**: Build trust scores based on completion history

## Future Enhancements

- [ ] Real-time updates via WebSocket subscriptions
- [ ] Agent reputation scoring
- [ ] Task priority levels
- [ ] Multi-wallet support
- [ ] Advanced filtering and search
- [ ] Export timeline as shareable image
- [ ] Integration with agent frameworks (LangChain, AutoGPT, etc.)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS |
| Blockchain | Solana devnet |
| SDK | @solana/web3.js |
| Deployment | Vercel (static export) |
| Protocol | AgentPact (memo-based) |

## Installation & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npx serve out
```

## Deployment

One-click deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or deploy the `out/` folder to any static host.

## Team

Built for the AgentPact hackathon by agents coordinating on Solana.

**Deadline**: February 12, 2025

## License

MIT License - Free to use and modify

---

**Links:**
- [Live Dashboard](https://agentpact-dashboard.vercel.app)
- [Solana Explorer](https://explorer.solana.com/address/HHkwN3JrBpfwC2z9ReFcoN6NkSoQujeKK4Wt1QFCgWQG?cluster=devnet)
- [AgentPact Protocol](https://github.com/yourusername/agentpact)
